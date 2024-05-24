import React, { ReactElement, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { getHomes } from '@/api/infrastructure'

import { useHome } from '@/contexts/home'

export default function HomeSelector(): ReactElement {
  const { home, setHome } = useHome()

  const { isSuccess, data } = useQuery({
    queryKey: ['homes'],
    queryFn: getHomes
  })

  useEffect(() => {
    if (isSuccess && data.length == 1) setHome(data[0])
  }, [data, isSuccess])

  return (
    <div className="w-full hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-home"
        type="button"
        className="w-full hs-dropdown-toggle p-4 inline-flex items-center gap-x-2 text-sm font-medium text-white"
      >
        {home ? home.name : 'Select a home'}
        <span className="flex-1" />
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
        aria-labelledby="hs-dropdown-home"
      >
        {isSuccess
          ? data.map((home) => (
              <a
                key={home.id}
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setHome(home)
                }}
              >
                <span className="font-bold">{home.name}</span>
                <span className="text-xs text-gray-700">{home.address}</span>
              </a>
            ))
          : 'Loading...'}
      </div>
    </div>
  )
}
