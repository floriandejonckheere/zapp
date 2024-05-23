import React, { createContext, useContext, useState } from 'react'

import { DateType, TODAY } from '@/types'

type DateContextType = {
  date: DateType
  setDate(date: DateType): void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

type DateProviderProps = {
  children: React.ReactNode
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [date, setDate] = useState<DateType>(TODAY)

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  )
}

export const useDate = () => {
  const context = useContext(DateContext)
  if (!context) {
    throw new Error('useDate must be used within a DateProvider')
  }
  return context
}
