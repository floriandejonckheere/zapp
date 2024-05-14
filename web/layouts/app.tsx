import React, { ReactElement } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BoltIcon, CalendarIcon } from '@heroicons/react/24/solid'

export default function App(): ReactElement {
  return (
    <div className="h-full w-full bg-yellow-400">
      <h1 className="p-8 font-semibold text-white text-2xl">Overview</h1>

      {/* White underlay */}
      <div className="fixed top-96 h-full w-full bg-slate-50"></div>

      <div className="relative h-auto flex flex-col gap-4 p-6">
        <Outlet />
      </div>

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
    </div>
  )
}
