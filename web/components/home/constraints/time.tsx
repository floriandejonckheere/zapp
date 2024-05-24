import React, { useEffect, useState } from 'react'
import { ChevronDownIcon, ClockIcon } from '@heroicons/react/24/solid'

export function Time(props: {
  start: number | null
  stop: number | null
  onUpdate: (start: number | null, stop: number | null) => void
}) {
  const { start, stop, onUpdate } = props
  const [editing, setEditing] = useState(false)
  const [startValue, setStartValue] = useState(start)
  const [stopValue, setStopValue] = useState(stop)

  useEffect(() => {
    if (!editing && (start != startValue || stop != stopValue))
      onUpdate(startValue, stopValue)
  }, [editing])

  return (
    <div className="text-xs flex">
      <ClockIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Time limit
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
              {startValue == null && stopValue == null && 'No limit'}
              {[startValue, stopValue]
                .filter((x) => x != null)
                .map((x) => `${x}:00`.padStart(5, '0'))
                .join(' - ')}
              <span className="flex-1" />
              <ChevronDownIcon className="w-4 h-4" />
            </a>
          </>
        )}
        {editing && (
          <>
            <input
              className="w-4 p-0 border-0 border-b-[1px] border-gray-500 focus:ring-0 text-xs text-right"
              type="number"
              min="0"
              max="24"
              value={startValue ?? ''}
              onChange={(e) => {
                const value = e.target.value

                value === ''
                  ? setStartValue(null)
                  : setStartValue(Math.min(24, Math.max(0, parseInt(value))))
              }}
              autoFocus
            />
            :00{' - '}
            <input
              className="w-4 p-0 border-0 border-b-[1px] border-gray-500 focus:ring-0 text-xs text-right"
              type="number"
              min="0"
              max="24"
              value={stopValue ?? ''}
              onChange={(e) => {
                const value = e.target.value

                value === ''
                  ? setStopValue(null)
                  : setStopValue(Math.min(24, Math.max(0, parseInt(value))))
              }}
              onBlur={() => {
                setEditing(false)
              }}
            />
            :00
          </>
        )}
      </div>
    </div>
  )
}
