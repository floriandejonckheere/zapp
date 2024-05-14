import React, { ReactElement } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BoltIcon, CalendarIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'

import { me } from '@/api/users'

export default function App(): ReactElement {
  const { isSuccess, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  const hour = new Date().getHours()

  let moment
  switch (true) {
    case hour < 6:
      moment = 'night'
      break
    case hour < 12:
      moment = 'morning'
      break
    case hour < 18:
      moment = 'afternoon'
      break
    case hour < 24:
      moment = 'evening'
  }

  return (
    <div className="h-full w-full bg-yellow-400">
      <div className="p-8 flex justify-between items-center">
        <div className="inline-block flex flex-col gap-2 text-white">
          <div className="text-sm">
            Good {moment}
            {isSuccess && ', ' + data.firstName}!
          </div>
          <h1 className="inline-block font-semibold text-white text-2xl">
            Overview
          </h1>
        </div>
        {isSuccess && (
          <div className="float-right">
            <NavLink to="/settings" className="">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-600 font-semibold text-white">
                {data.firstName.charAt(0).toUpperCase()}
              </span>
            </NavLink>
          </div>
        )}
      </div>

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
