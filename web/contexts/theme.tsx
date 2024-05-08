// themeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'

type ThemeContextType = {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  const mediaQueryListener = (e: MediaQueryListEvent) => {
    setDarkMode(e.matches)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addListener(mediaQueryListener)

    // Cleanup function to remove the listener
    return () => mediaQuery.removeListener(mediaQueryListener)
  }, [])

  // Apply the 'dark' class to the root element when dark mode is active
  const rootClass = `${darkMode ? 'dark' : ''} h-screen w-screen`

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={rootClass}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
