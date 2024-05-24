import React, { useState } from 'react'
import { ChevronDownIcon, FireIcon } from '@heroicons/react/24/solid'

export function Source(props: {
  source: string | null
  onUpdate: (source: string | null) => void
}) {
  const { source, onUpdate } = props
  const [value, setValue] = useState(source)

  return (
    <div className="text-xs flex">
      <FireIcon className="inline-block mr-2 w-4 h-4 text-red-400" />
      Power source
      <div className="flex-1" />
      <select
        value={value || ''}
        className="w-28 border-0 p-0 text-xs text-gray-500 bg-none focus:ring-0"
        onChange={(e) => {
          const value = e.target.value === '' ? null : e.target.value

          setValue(value)

          onUpdate(value)
        }}
      >
        <option value="">Any</option>
        <option value="SO">Solar panel</option>
        <option value="BA">Battery</option>
        <option value="GR">Grid</option>
      </select>
      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
    </div>
  )
}
