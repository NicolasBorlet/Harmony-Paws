import { ActivityStatusView } from '@/components/ActivityStatusView'
import { Database } from '@/database.types'
import { user$ } from '@/lib/observables/session-observable'
import { supabase } from '@/lib/supabase'
import { observable } from '@legendapp/state'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { usePathname } from 'expo-router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type ActivityStatus = Database['public']['Enums']['activity_status']
type Activity = Database['public']['Tables']['activities']['Row']
type UserActivity = Database['public']['Tables']['user_activities']['Row']

type ActivityStatusContextType = {
  isActivityActive: boolean
  activityStatus: ActivityStatus | null
  currentActivityId: number | null
}

const activityStatusContext$ = observable<ActivityStatusContextType>({
  isActivityActive: false,
  activityStatus: null,
  currentActivityId: null,
})

export const ActivityStatusContext = createContext(activityStatusContext$)

export const useActivityStatus = () => {
  const context = useContext(ActivityStatusContext)
  if (!context) {
    throw new Error(
      'useActivityStatus must be used within an ActivityStatusProvider',
    )
  }
  return context
}

const TOP_LEVEL_PAGES = ['/account', '/formation', '/', '/medical']

const checkShouldShowView = (pathname: string) => {
  const isTopLevelPage = TOP_LEVEL_PAGES.includes(pathname)
  const isActivityActive = activityStatusContext$.get().isActivityActive

  return isTopLevelPage && isActivityActive
}

export const ActivityStatusProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const userId = user$.get()?.id
  const [showActivityView, setShowActivityView] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const pathname = usePathname()

  // Effet pour gérer les changements de pathname
  useEffect(() => {
    const shouldShow = checkShouldShowView(pathname)

    if (shouldShow) {
      setShowActivityView(true)
      setIsAnimatingOut(false)
    } else if (showActivityView && !isAnimatingOut) {
      setIsAnimatingOut(true)
      // Attendre que l'animation soit terminée avant de masquer la vue
      setTimeout(() => {
        setShowActivityView(false)
        setIsAnimatingOut(false)
      }, 300) // Durée de l'animation de sortie
    }
  }, [pathname, showActivityView, isAnimatingOut])

  // Effet pour vérifier l'état initial au montage
  useEffect(() => {
    const shouldShow = checkShouldShowView(pathname)
    setShowActivityView(shouldShow)
  }, [])

  useEffect(() => {
    if (!userId) return

    // Fonction pour récupérer l'activité en cours
    const fetchInProgressActivity = async () => {
      console.log('🔍 fetchInProgressActivity - Début de la recherche')
      console.log('👤 User ID:', userId)

      const { data: userActivities, error: userActivitiesError } =
        await supabase
          .from('user_activities')
          .select('activity_id')
          .eq('user_id', userId)

      console.log('📋 Résultat user_activities:', {
        data: userActivities,
        error: userActivitiesError,
      })

      if (userActivitiesError || !userActivities?.length) {
        console.log("❌ Pas d'activités trouvées pour l'utilisateur")
        // Déclencher l'animation de sortie
        setIsAnimatingOut(true)
        setTimeout(() => {
          setShowActivityView(false)
          setIsAnimatingOut(false)
        }, 300)
        activityStatusContext$.set({
          isActivityActive: false,
          activityStatus: null,
          currentActivityId: null,
        })
        return
      }

      const activityIds = userActivities.map(ua => ua.activity_id)
      console.log('🎯 IDs des activités à vérifier:', activityIds)

      const { data: activities, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .in('id', activityIds as number[])
        .eq('status', 'in progress')
        .single()

      console.log('📊 Résultat activities:', {
        data: activities,
        error: activitiesError,
      })

      if (activitiesError || !activities) {
        // Déclencher l'animation de sortie
        setIsAnimatingOut(true)
        setTimeout(() => {
          setShowActivityView(false)
          setIsAnimatingOut(false)
        }, 300)
        activityStatusContext$.set({
          isActivityActive: false,
          activityStatus: null,
          currentActivityId: null,
        })
        return
      }

      console.log('✅ Activité en cours trouvée:', activities)
      setShowActivityView(true)
      setIsAnimatingOut(false)
      activityStatusContext$.set({
        isActivityActive: true,
        activityStatus: activities.status,
        currentActivityId: activities.id,
      })
    }

    // Récupérer l'activité en cours initiale
    console.log('🔄 Initialisation du contexte')
    fetchInProgressActivity().then(() => {
      console.log('📱 État final du contexte:', activityStatusContext$.get())
    })

    // S'abonner aux changements des activités
    const activitiesSubscription = supabase
      .channel('activities_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activities',
        },
        async (payload: RealtimePostgresChangesPayload<Activity>) => {
          console.log("📡 Changement d'activité détecté:", payload)

          if (!payload.new || typeof payload.new !== 'object') {
            console.log('❌ Payload invalide')
            return
          }

          const newActivity = payload.new as Activity
          console.log('🔄 Nouvelle activité:', newActivity)

          // Vérifier si l'activité modifiée concerne l'utilisateur
          const { data: userActivity } = await supabase
            .from('user_activities')
            .select('activity_id')
            .eq('user_id', userId)
            .eq('activity_id', newActivity.id)
            .single()

          console.log('👤 Vérification user_activity:', userActivity)

          if (userActivity) {
            // Si l'activité est en cours, mettre à jour le contexte
            if (newActivity.status === 'in progress') {
              console.log('✅ Mise à jour du contexte - Activité en cours')
              setShowActivityView(true)
              setIsAnimatingOut(false)
              activityStatusContext$.set({
                isActivityActive: true,
                activityStatus: newActivity.status,
                currentActivityId: newActivity.id,
              })
            } else {
              console.log(
                "🔄 Activité terminée, recherche d'autres activités en cours",
              )
              // Déclencher l'animation de sortie
              setIsAnimatingOut(true)
              setTimeout(() => {
                setShowActivityView(false)
                setIsAnimatingOut(false)
              }, 300)
              fetchInProgressActivity()
            }
          } else {
            console.log("❌ L'activité ne concerne pas l'utilisateur")
          }
        },
      )
      .subscribe()

    // S'abonner aux changements des user_activities
    const userActivitiesSubscription = supabase
      .channel('user_activities_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_activities',
          filter: `user_id=eq.${userId}`,
        },
        async (payload: RealtimePostgresChangesPayload<UserActivity>) => {
          // Si une nouvelle activité est ajoutée, vérifier son statut
          if (payload.eventType === 'INSERT' && payload.new?.activity_id) {
            const { data: activity } = await supabase
              .from('activities')
              .select('*')
              .eq('id', payload.new.activity_id)
              .eq('status', 'in progress')
              .single()

            if (activity) {
              setShowActivityView(true)
              setIsAnimatingOut(false)
              activityStatusContext$.set({
                isActivityActive: true,
                activityStatus: activity.status,
                currentActivityId: activity.id,
              })
            }
          }
          // Si une activité est supprimée, vérifier s'il reste des activités en cours
          else if (payload.eventType === 'DELETE') {
            // Déclencher l'animation de sortie
            setIsAnimatingOut(true)
            setTimeout(() => {
              setShowActivityView(false)
              setIsAnimatingOut(false)
            }, 300)
            fetchInProgressActivity()
          }
        },
      )
      .subscribe()

    return () => {
      activitiesSubscription.unsubscribe()
      userActivitiesSubscription.unsubscribe()
    }
  }, [userId])

  return (
    <ActivityStatusContext.Provider value={activityStatusContext$}>
      {(showActivityView || isAnimatingOut) && (
        <ActivityStatusView isAnimatingOut={isAnimatingOut} />
      )}
      {children}
    </ActivityStatusContext.Provider>
  )
}
