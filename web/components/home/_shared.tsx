import {
  Battery100Icon,
  BoltIcon,
  CpuChipIcon,
  SunIcon
} from '@heroicons/react/24/solid'
import React from 'react'

export const deviceTypeToName = (deviceType: string) => {
  if (deviceType === 'CO') {
    return 'Consumer'
  } else if (deviceType === 'PR') {
    return 'Producer'
  } else if (deviceType === 'ST') {
    return 'Storage'
  } else if (deviceType === 'GR') {
    return 'Grid'
  } else return 'Other'
}

export const deviceTypeToIcon = (deviceType: string) => {
  if (deviceType === 'CO') {
    // Consumer
    return <CpuChipIcon className="inline-block mr-2 w-4 h-4 text-gray-700" />
  } else if (deviceType === 'PR') {
    // Producer
    return <SunIcon className="inline-block mr-2 w-4 h-4 text-yellow-400" />
  } else if (deviceType === 'ST') {
    // Storage
    return (
      <Battery100Icon className="inline-block mr-2 w-4 h-4 text-green-400" />
    )
  } else {
    return <BoltIcon className="inline-block mr-2 w-4 h-4 text-yellow-400" />
  }
}
