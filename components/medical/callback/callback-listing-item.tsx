import Block from '@/components/grid/Block'
import { Body, BodyBold } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import * as Calendar from 'expo-calendar'
import { Alert, Pressable } from 'react-native'

interface CallbackListingItemProps {
  name: string
  hour: string
  date: string
}

export default function CallbackListingItem({
  name,
  hour,
  date,
}: CallbackListingItemProps) {
  const handleCreateEvent = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Calendar permission is required to add events.',
        )
        return
      }
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      )
      const defaultCalendar =
        calendars.find(cal => cal.allowsModifications) || calendars[0]
      if (!defaultCalendar) {
        Alert.alert('No calendar found', 'No modifiable calendar found.')
        return
      }
      const [hourStr, minuteStr] = hour.split(':')
      const startDate = new Date(date)
      startDate.setHours(Number(hourStr), Number(minuteStr), 0, 0)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
      await Calendar.createEventAsync(defaultCalendar.id, {
        title: name,
        startDate,
        endDate,
        timeZone: undefined,
        notes: name,
      })
      Alert.alert('Event created', 'The event has been added to your calendar.')
    } catch (e) {
      Alert.alert('Error', 'Could not create event: ' + (e as Error).message)
    }
  }

  return (
    <Block
      row
      justify='space-between'
      alignItems='center'
      wrap='nowrap'
      style={{
        padding: 16,
        backgroundColor: Colors.purple[500],
        borderRadius: 12,
      }}
    >
      <Block gap={8}>
        <BodyBold color={Colors.white}>{name}</BodyBold>
        <Block row alignItems='center' gap={8}>
          <AntDesign name='clockcircleo' size={16} color={Colors.white} />
          <Body color={Colors.white}>{hour}</Body>
        </Block>
      </Block>
      <Pressable onPress={handleCreateEvent}>
        <Ionicons name='notifications-outline' size={24} color='white' />
      </Pressable>
    </Block>
  )
}
