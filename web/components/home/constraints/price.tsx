import React from 'react'
import { CurrencyEuroIcon } from '@heroicons/react/24/solid'

export function Price(props: { start: number | null; stop: number | null }) {
  const { start, stop } = props

  return (
    <div className="text-xs flex">
      <CurrencyEuroIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Price limit
      <div className="flex-1" />
      <div className="text-gray-500">
        {start == null && stop == null && 'No limit'}
        {start != null && `from ${start} c€/kWh `}
        {stop != null && `until ${stop} c€/kWh`}
      </div>
    </div>
  )
}
