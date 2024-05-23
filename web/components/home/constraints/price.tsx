import React from 'react'
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

export function Price(props: { start: number | null; stop: number | null }) {
  const { start, stop } = props

  return (
    <div className="text-sm">
      <CurrencyDollarIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      {start != null && `From ${start} c€/kWh `}
      {stop != null && `Until ${stop} c€/kWh`}
    </div>
  )
}
