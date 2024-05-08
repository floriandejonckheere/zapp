import { useQuery } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import {
  ChartBarIcon,
  Cog6ToothIcon,
  HomeIcon,
  LightBulbIcon,
  UserIcon
} from '@heroicons/react/24/solid'

import { me } from '../api/users'

export default function Dashboard(): ReactElement {
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
    <div className="flex flex-row w-full h-full overflow-x-hidden bg-gray-50 dark:bg-slate-800 transition-all duration-500">
      <div
        id="application-sidebar-dark"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden top-0 start-0 bottom-0 z-30 w-80 bg-sky-700 pt-4 pb-6 overflow-y-auto dark:bg-sky-800 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <nav
          className="hs-accordion-group p-6 w-full h-full"
          data-hs-accordion-always-open
        >
          <ul className=" flex flex-col gap-4 h-full">
            <li>
              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 ${
                    isActive
                      ? 'bg-sky-900 dark:bg-sky-950'
                      : 'hover:bg-sky-950 hover:text-white-300'
                  }`
                }
              >
                <HomeIcon className="h-5 w-5" />
                Overview
              </NavLink>
            </li>
            {isSuccess && data.is_superuser && (
              <li>
                <NavLink
                  to="/administration"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 ${
                      isActive
                        ? 'bg-sky-900 dark:bg-sky-950'
                        : 'hover:bg-sky-950 hover:text-white-300'
                    }`
                  }
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  Administration
                </NavLink>
              </li>
            )}
            <li className="w-full mt-auto">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 ${
                    isActive
                      ? 'bg-sky-900 dark:bg-sky-950'
                      : 'hover:bg-sky-950 hover:text-white-300'
                  }`
                }
              >
                <UserIcon className="h-5 w-5" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-10 w-full overflow-y-scroll">
        <h1 className="text-3xl font-bold mb-10 dark:text-slate-300">
          Good {moment}
          {isSuccess && ', ' + data.username}!
        </h1>

        <Outlet />
      </div>
    </div>
  )
}
