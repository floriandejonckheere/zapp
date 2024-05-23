import React, { useState } from 'react'
import { BoltIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

export function Power(props: { power: number | null }) {
  const { power } = props
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(power)

  return (
    <div className="text-xs flex">
      <BoltIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Power limit
      <div className="flex-1" />
      <div className="text-gray-500">
        {!editing && (
          <>
            <a
              className="w-24 flex border-b-[1px] border-transparent"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setEditing(!editing)
              }}
            >
              {power == null ? 'No limit' : `${power} kW`}
              <span className="flex-1" />
              <ChevronDownIcon className="w-4 h-4" />
            </a>
          </>
        )}
        {editing && (
          <>
            <input
              className="w-16 p-0 pr-2 border-0 border-b-[1px] border-gray-500 focus:ring-0 text-xs text-right"
              type="number"
              value={value ?? ''}
              onChange={(e) => {
                const value = e.target.value

                value === '' ? setValue(null) : setValue(parseInt(value))
              }}
              onBlur={() => {
                setEditing(false)
              }}
              autoFocus
            />
            kW
          </>
        )}
      </div>
    </div>
  )
}
