import { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'

import { me } from '../api/users'

export default function Settings(): ReactElement {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300 mb-8">Settings</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Role and permissions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Update your account role and permissions
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="block text-sm mb-2 dark:text-white">
              Administrator
            </span>
            <div className="hs-tooltip hs-tooltip-toggle">
              <input
                type="checkbox"
                id="hs-basic-usage"
                className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-sky-700 checked:border-sky-700 focus:checked:border-sky-700 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-sky-900 dark:checked:border-sky-900 dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-sky-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-sky-200"
                disabled={!data?.is_superuser}
                checked={data?.is_superuser}
              />

              {data?.is_superuser || (
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-white text-sm"
                  role="tooltip"
                >
                  Role can only be changed if you're an administrator
                </span>
              )}
            </div>

            <label htmlFor="hs-basic-usage" className="sr-only">
              switch
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
