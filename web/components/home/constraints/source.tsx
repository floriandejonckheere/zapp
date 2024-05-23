import React, { useState } from 'react'
import { ChevronDownIcon, FireIcon } from '@heroicons/react/24/solid'

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
  const [value, setValue] = useState(source)

  return (
    <div className="text-xs flex">
      <FireIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
      Power source
      <div className="flex-1" />
      <select
        value={value || ''}
        className="w-20 border-0 p-0 text-xs text-gray-500 bg-none focus:ring-0"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      >
        <option value="">No limit</option>
        <option value="SO">Solar</option>
        <option value="BA">Battery</option>
        <option value="GR">Grid</option>
      </select>
      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
    </div>
  )
}
