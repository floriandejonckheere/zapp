import React from 'react'
import { FireIcon } from '@heroicons/react/24/solid'

function sourceTypeToName(source: string) {
  switch (source) {
    case 'SO':
      return 'Solar'
    case 'BA':
      return 'Battery'
    case 'GR':
      return 'Grid'
    default:
      return 'Unknown'
  }
}

export function Source(props: { source: string | null }) {
  const { source } = props

  return (
    <div className="text-xs flex">
      <FireIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Power source
      <div className="flex-1" />
      <div className="text-gray-500">
        {source == null ? 'No limit' : sourceTypeToName(source)}
      </div>
    </div>
  )
}
