import React from 'react'
import { ClockIcon } from '@heroicons/react/24/solid'

export function Time(props: { start: number | null; stop: number | null }) {
  const { start, stop } = props

  return (
    <div className="text-xs flex">
      <ClockIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Time limit
      <div className="flex-1" />
      <div className="text-gray-500">
        {start == null && stop == null && 'No limit'}
        {start != null && `From ${start}:00 `}
        {stop != null && `Until ${stop}:00`}
      </div>
    </div>
  )
}
