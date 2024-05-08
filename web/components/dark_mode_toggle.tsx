import { ReactElement } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { useTheme } from '../contexts/theme'

export default function DarkModeToggle(): ReactElement {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        id="hs-large-switch-soft-with-icons"
        className="peer relative shrink-0 w-[4.25rem] h-9 p-px bg-gray-100 border border-gray-200 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-0 ring-transparent disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-sky-700 checked:border-sky-500 focus:ring-offset-0 focus:ring-transparent dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-800/30 dark:checked:border-blue-800 before:inline-block before:w-8 before:h-8 before:bg-white checked:before:bg-blue-600 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-sky-700"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor="hs-large-switch-soft-with-icons" className="sr-only">
        switch
      </label>
      <span className="peer-checked:text-sky-700 text-gray-500 w-8 h-8 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
        <SunIcon className="h-4 w-4" />
      </span>
      <span className="peer-checked:text-white w-8 h-8 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
        <MoonIcon className="h-4 w-4" />
      </span>
    </div>
  )
}
