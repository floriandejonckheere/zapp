import React from 'react'
import { ChevronDownIcon, FireIcon } from '@heroicons/react/24/solid'

function sourceTypeToName(source: string) {
  switch (source) {
    case 'SO':
      return 'Solar'
    case 'BA':
      return 'Battery'
    case 'GR':
      return 'Grid'
    default:
      return 'Unknown'
  }
}

export function Source(props: { id: number; source: string | null }) {
  const { id, source } = props

  return (
    <div className="text-xs flex">
      <FireIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Power source
      <div className="flex-1" />
      <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
        <button
          id={`hs-dropdown-source-${id}`}
          type="button"
          className="w-24 hs-dropdown-toggle inline-flex items-center text-gray-500"
        >
          {source == null ? 'No limit' : sourceTypeToName(source)}
          <span className="flex-1" />
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
          aria-labelledby={`hs-dropdown-source-${id}`}
        >
          <a
            key="NO"
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="#"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            No limit
          </a>
          <a
            key="SO"
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="#"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            Solar panel
          </a>
          <a
            key="BA"
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="#"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            Battery
          </a>
          <a
            key="GR"
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="#"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            Grid
          </a>
        </div>
      </div>
    </div>
  )
}
