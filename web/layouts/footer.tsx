import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { BoltIcon, CalendarIcon } from '@heroicons/react/24/solid'

export default function Footer(): ReactElement {
  return (
    <div className="fixed bottom-0 w-full p-4 bg-slate-50 shadow-md">
      <nav className="text-white font-bold flex flex-row justify-center  gap-4">
        <NavLink
          to="/overview"
          className={({ isActive }) =>
            `flex flex-row items-center gap-2 px-2 py-3 text-sm rounded-md ${
              isActive
                ? 'bg-yellow-400 text-white'
                : 'bg-transparent text-yellow-400'
            }`
          }
        >
          <BoltIcon className="h-4 w-4" />
          Overview
        </NavLink>
        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            `flex flex-row items-center gap-2 px-2 py-3 text-sm rounded-md ${
              isActive
                ? 'bg-yellow-400 text-white'
                : 'bg-transparent text-yellow-400'
            }`
          }
        >
          <CalendarIcon className="h-4 w-4" />
          Schedule
        </NavLink>
      </nav>
    </div>
  )
}
