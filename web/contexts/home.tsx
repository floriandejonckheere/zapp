// homeContext.tsx
import React, { createContext, useContext, useState } from 'react'

import { Home } from '@/types'

type HomeContextType = {
  home: Home | null
  setHome(home: Home | null): void
}

const HomeContext = createContext<HomeContextType | undefined>(undefined)

type HomeProviderProps = {
  children: React.ReactNode
}

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const [home, setHome] = useState<Home | null>(null)

  return (
    <HomeContext.Provider value={{ home, setHome }}>
      {children}
    </HomeContext.Provider>
  )
}

export const useHome = () => {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error('useHome must be used within a HomeProvider')
  }
  return context
}
