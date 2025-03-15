import { DurationValue } from '@/components/picker/types'

export const formatDuration = (duration: DurationValue): string => {
  const hourText = duration.hours === 1 ? 'heure' : 'heures'
  const minuteText = duration.minutes === 1 ? 'minute' : 'minutes'

  if (duration.hours === 0) {
    return `${duration.minutes} ${minuteText}`
  } else if (duration.minutes === 0) {
    return `${duration.hours} ${hourText}`
  } else {
    return `${duration.hours} ${hourText} ${duration.minutes} ${minuteText}`
  }
}
