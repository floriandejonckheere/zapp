import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import DarkModeToggle from '../components/dark_mode_toggle'

export default function Auth(): ReactElement {
  return (
    <div className="flex flex-col w-full h-full bg-gray-50 dark:bg-slate-800 transition-all duration-500">
      <div className="w-full p-6 text-center lg:text-right">
        <DarkModeToggle />
      </div>

      <div className="w-full h-full max-w-md mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
