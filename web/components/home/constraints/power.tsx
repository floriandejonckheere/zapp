import React from 'react'
import { BoltIcon } from '@heroicons/react/24/solid'

export function Power(props: { power: number | null }) {
  const { power } = props

  return (
    <div className="text-sm">
      <BoltIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      {power} kW
    </div>
  )
}
