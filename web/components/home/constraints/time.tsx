import React from 'react'
import { ClockIcon } from '@heroicons/react/24/solid'

export function Time(props: { start: number | null; stop: number | null }) {
  const { start, stop } = props

  return (
    <div className="text-sm">
      <ClockIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      {start != null && `From ${start}:00 `}
      {stop != null && `Until ${stop}:00`}
    </div>
  )
}
