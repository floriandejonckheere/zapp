import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { BoltIcon, CalendarIcon, HomeIcon } from '@heroicons/react/24/solid'

export default function Footer(): ReactElement {
  return (
    <div className="fixed bottom-0 md:relative w-full bg-slate-50">
      <nav className="text-white font-bold flex flex-row justify-center">
        <NavLink
          to="/overview"
          className={({ isActive }) =>
            `w-1/3 flex flex-col items-center gap-2 p-4 text-sm ${
              isActive ? 'bg-sky-700 text-white' : 'bg-transparent text-sky-700'
            }`
          }
        >
          <BoltIcon className="h-4 w-4" />
          Overview
        </NavLink>
        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            `w-1/3 flex flex-col items-center gap-2 p-4 text-sm ${
              isActive ? 'bg-sky-700 text-white' : 'bg-transparent text-sky-700'
            }`
          }
        >
          <CalendarIcon className="h-4 w-4" />
          Schedule
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `w-1/3 flex flex-col items-center gap-2 p-4 text-sm ${
              isActive ? 'bg-sky-700 text-white' : 'bg-transparent text-sky-700'
            }`
          }
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </NavLink>
      </nav>
    </div>
  )
}
