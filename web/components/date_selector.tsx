import React, { ReactElement } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { useDate } from '@/contexts/date'

import { TODAY, TOMORROW } from '@/types'
import { dateTypeToDateString } from '@/utils'

export default function DateSelector(): ReactElement {
  const { date, setDate } = useDate()

  return (
    <div className="w-full hs-dropdown relative inline-flex [--placement:bottom-right]">
      <button
        id="hs-dropdown-default"
        type="button"
        className="w-full hs-dropdown-toggle p-4 inline-flex items-center gap-x-2 text-sm font-medium text-white"
      >
        {dateTypeToDateString(date)}
        <span className="flex-1" />
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
        aria-labelledby="hs-dropdown-default"
      >
        <a
          key="today"
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setDate(TODAY)
          }}
        >
          {dateTypeToDateString(TODAY)}
        </a>
        <a
          key="tomorrow"
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setDate(TOMORROW)
          }}
        >
          {dateTypeToDateString(TOMORROW)}
        </a>
      </div>
    </div>
  )
}
