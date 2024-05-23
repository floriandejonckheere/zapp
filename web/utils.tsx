import { format, startOfToday, startOfTomorrow } from 'date-fns'

import { DateType, TODAY, TOMORROW } from '@/types'

export const dateTypeToDateString = (date: DateType): string => {
  switch (date) {
    case TODAY:
      return format(startOfToday(), "'Today, 'E dd MMM")
    case TOMORROW:
      return format(startOfTomorrow(), "'Tomorrow, 'E dd MMM")
    default:
      return date
  }
}
