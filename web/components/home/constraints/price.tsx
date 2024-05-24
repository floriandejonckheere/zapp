import React, { useEffect, useState } from 'react'
import { ChevronDownIcon, CurrencyEuroIcon } from '@heroicons/react/24/solid'

export function Price(props: {
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
      <CurrencyEuroIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Price limit
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
                .map((x) => `${x} c€`.padStart(4, '0'))
                .join(' - ')}
              <span className="flex-1" />
              <ChevronDownIcon className="w-4 h-4" />
            </a>
          </>
        )}
        {editing && (
          <>
            <input
              className="w-8 p-0 pr-1 border-0 border-b-[1px] border-gray-500 focus:ring-0 text-xs text-right"
              type="number"
              value={startValue ?? ''}
              onChange={(e) => {
                const value = e.target.value

                value === ''
                  ? setStartValue(null)
                  : setStartValue(parseInt(value))
              }}
              autoFocus
            />
            c€{' - '}
            <input
              className="w-8 p-0 pr-1 border-0 border-b-[1px] border-gray-500 focus:ring-0 text-xs text-right"
              type="number"
              value={stopValue ?? ''}
              onChange={(e) => {
                const value = e.target.value

                value === ''
                  ? setStopValue(null)
                  : setStopValue(parseInt(value))
              }}
              onBlur={() => {
                setEditing(false)
              }}
            />
            c€
          </>
        )}
      </div>
    </div>
  )
}
