import { DateType, TODAY, TOMORROW } from '@/types'

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
