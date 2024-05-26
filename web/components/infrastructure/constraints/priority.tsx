import React, { useEffect, useState } from 'react'
import { ChevronDownIcon, FlagIcon } from '@heroicons/react/24/solid'

export function Priority(props: {
  priority: number | null
  onUpdate: (priority: number | null) => void
}) {
  const { priority, onUpdate } = props
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(priority)

  useEffect(() => {
    if (!editing && priority != value) onUpdate(value)
  }, [editing])

  return (
    <div className="text-xs flex">
      <FlagIcon className="inline-block mr-2 w-4 h-4 text-red-400" />
      Priority
      <div className="flex-1" />
      <div className="text-gray-500">
        {!editing && (
          <>
            <a
              className="w-32 flex border-b-[1px] border-transparent"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setEditing(!editing)
              }}
            >
              {value === null ? 'None' : value}
              <span className="flex-1" />
              <ChevronDownIcon className="w-4 h-4" />
            </a>
          </>
        )}
        {editing && (
          <>
            <input
              className="w-8 p-0 pr-2 border-0 border-b-[1px] border-gray-500 focus:ring-0 text-xs text-right"
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
          </>
        )}
      </div>
    </div>
  )
}
