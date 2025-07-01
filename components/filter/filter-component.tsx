import { i18n } from '@/lib/i18n'
import { dogFilters, rideFilters } from '@/lib/observables/filter-observable'
import { tabState } from '@/lib/observables/tab-observable'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { observer } from '@legendapp/state/react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StandardCheckbox } from '../checkbox/standardCheckbox'
import { StandardButton } from '../ui/button'
import { Body, Small } from '../ui/text'

const FilterComponent = observer(
  ({
    bottomSheetModalRef,
    handleSheetChanges,
  }: {
    bottomSheetModalRef: React.RefObject<BottomSheetModal>
    handleSheetChanges?: (index: number) => void
  }) => {
    const insets = useSafeAreaInsets()

    const snapPoints = useMemo(() => ['50%'], [])
    const currentTab = tabState.get()
    const queryClient = useQueryClient()

    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
      [],
    )

    const handleOpen = useCallback(() => {
      if (currentTab === 'dog') {
        const filters = dogFilters.get()
        dogFilters.temp.set({
          sex: filters.sex,
          age: filters.age,
          dominance: filters.dominance,
        })
      } else {
        const filters = rideFilters.get()
        rideFilters.temp.set({
          type: filters.type,
          date: filters.date,
          duration: filters.duration,
        })
      }
    }, [currentTab])

    const handleConfirm = useCallback(() => {
      if (currentTab === 'dog') {
        const tempFilters = dogFilters.temp.get()
        dogFilters.sex.set(tempFilters.sex)
        dogFilters.age.set(tempFilters.age)
        dogFilters.dominance.set(tempFilters.dominance)
        queryClient.invalidateQueries({ queryKey: ['dogs', 'infinite'] })
      } else {
        const tempFilters = rideFilters.temp.get()
        rideFilters.type.set(tempFilters.type)
        rideFilters.date.set(tempFilters.date)
        rideFilters.duration.set(tempFilters.duration)
        queryClient.invalidateQueries({ queryKey: ['activities', 'infinite'] })
      }
      bottomSheetModalRef.current?.dismiss()
    }, [currentTab, queryClient])

    const renderDogFilters = () => (
      <View style={styles.filterContainer}>
        <View style={styles.filterSection}>
          <Small style={styles.filterTitle}>{i18n.t('filter.sex')}</Small>
          <View style={styles.filterOptions}>
            {['male', 'female'].map(sex => (
              <StandardCheckbox
                key={sex}
                label={i18n.t(`filter.${sex}`)}
                checked={dogFilters.temp.sex.get() === sex}
                onPress={() =>
                  dogFilters.temp.sex.set(sex as 'male' | 'female')
                }
                opacity={1}
              />
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Small style={styles.filterTitle}>{i18n.t('filter.dominance')}</Small>
          <View style={styles.filterOptions}>
            {['neutral', 'dominant', 'dominated'].map(dominance => (
              <StandardCheckbox
                key={dominance}
                label={i18n.t(`filter.${dominance}`)}
                checked={dogFilters.temp.dominance.get() === dominance}
                onPress={() =>
                  dogFilters.temp.dominance.set(
                    dominance as 'neutral' | 'dominant' | 'dominated',
                  )
                }
                opacity={1}
              />
            ))}
          </View>
        </View>
      </View>
    )

    const renderRideFilters = () => (
      <View style={styles.filterContainer}>
        <View style={styles.filterSection}>
          <Small style={styles.filterTitle}>
            {i18n.t('filter.activityType')}
          </Small>
          <View style={styles.filterOptions}>
            {['forest', 'city', 'plage'].map(type => (
              <StandardCheckbox
                key={type}
                label={i18n.t(`filter.${type === 'plage' ? 'beach' : type}`)}
                checked={rideFilters.temp.type.get() === type}
                onPress={() =>
                  rideFilters.temp.type.set(type as 'forest' | 'city' | 'plage')
                }
                opacity={1}
              />
            ))}
          </View>
        </View>
      </View>
    )

    const clearFilters = () => {
      if (currentTab === 'dog') {
        dogFilters.temp.set({
          sex: null,
          age: null,
          dominance: null,
        })
      } else {
        rideFilters.temp.set({
          type: null,
          date: null,
          duration: null,
        })
      }
    }

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        onAnimate={handleOpen}
        index={0}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        snapPoints={snapPoints}
      >
        <BottomSheetView
          style={[
            styles.container,
            { paddingBottom: Platform.OS === 'ios' ? insets.bottom : 32 },
          ]}
        >
          <View style={styles.header}>
            <Body style={styles.title}>{i18n.t('filter.title')}</Body>
            <Pressable onPress={clearFilters}>
              <Small style={styles.clearButton}>{i18n.t('filter.clear')}</Small>
            </Pressable>
          </View>
          {currentTab === 'dog' ? renderDogFilters() : renderRideFilters()}
          <StandardButton style={styles.confirmButton} onPress={handleConfirm}>
            <Body style={styles.confirmButtonText}>
              {i18n.t('filter.confirm')}
            </Body>
          </StandardButton>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    color: '#007AFF',
  },
  filterContainer: {
    width: '100%',
    flex: 1,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    marginBottom: 8,
    color: '#666',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
})

export default FilterComponent
