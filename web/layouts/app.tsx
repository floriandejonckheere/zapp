import React, { ReactElement } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  BoltIcon,
  CalendarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid'

export default function App(): ReactElement {
  return (
    <div className="h-full w-full bg-yellow-400 overflow-hidden">
      <nav className="px-4 py-8 text-white font-bold flex flex-row gap-4 overflow-y-scroll">
        <NavLink
          to="/app/overview"
          className={({ isActive }) =>
            `flex items-center gap-x-2 py-2 px-3 text-sm rounded-full border-white ${
              isActive
                ? 'bg-white text-yellow-500 border-0'
                : 'bg-yellow-400 text-white border-2'
            }`
          }
        >
          <BoltIcon className="inline-block h-4 w-4" /> Overview
        </NavLink>
        <NavLink
          to="/app/schedule"
          className={({ isActive }) =>
            `flex items-center gap-x-2 py-2 px-3 text-sm rounded-full border-white ${
              isActive
                ? 'bg-white text-yellow-500 border-0'
                : 'bg-yellow-400 text-white border-2'
            }`
          }
        >
          <CalendarIcon className="inline-block h-4 w-4" /> Schedule
        </NavLink>
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            `flex items-center gap-x-2 py-2 px-3 text-sm rounded-full border-white ${
              isActive
                ? 'bg-white text-yellow-500 border-0'
                : 'bg-yellow-400 text-white border-2'
            }`
          }
        >
          <Cog6ToothIcon className="inline-block h-4 w-4" /> Settings
        </NavLink>
      </nav>

      <div className="h-full w-full p-8 bg-white rounded-t-3xl shadow-lg">
        <Outlet />
      </div>
    </div>
  )
}
