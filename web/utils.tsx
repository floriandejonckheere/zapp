import { DateType, TODAY, TOMORROW } from '@/types'
import { format, startOfToday, startOfTomorrow } from 'date-fns'

export const dateTypeToDateString = (date: DateType): string => {
  switch (date) {
    case TODAY:
      return 'Today'
    case TOMORROW:
      return 'Tomorrow'
    default:
      return date
  }
}

export const dateTypeToAPIString = (date: DateType): string => {
  switch (date) {
    case TODAY:
      return format(startOfToday(), 'yyyy-MM-dd')
    case TOMORROW:
      return format(startOfTomorrow(), 'yyyy-MM-dd')
    default:
      return date
  }
}
