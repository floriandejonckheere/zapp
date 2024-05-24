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

export const deviceTypeToIcon = (deviceType: string, size: number = 4) => {
  if (deviceType === 'CO') {
    // Consumer
    return (
      <CpuChipIcon
        className={`inline-block mr-2 w-${size} h-${size} text-gray-700`}
      />
    )
  } else if (deviceType === 'PR') {
    // Producer
    return (
      <SunIcon
        className={`inline-block mr-2 w-${size} h-${size} text-yellow-400`}
      />
    )
  } else if (deviceType === 'ST') {
    // Storage
    return (
      <Battery100Icon
        className={`inline-block mr-2 w-${size} h-${size} text-green-400`}
      />
    )
  } else {
    return (
      <BoltIcon
        className={`inline-block mr-2 w-${size} h-${size} text-yellow-400`}
      />
    )
  }
}
