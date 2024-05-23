import React from 'react'
import { BoltIcon } from '@heroicons/react/24/solid'

export function Source(props: { source: string | null }) {
  const { source } = props

  return (
    <div className="text-sm">
      <BoltIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      {source}
    </div>
  )
}
