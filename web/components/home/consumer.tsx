import React from 'react'

import { Device, Home } from '@/types'

import { deviceTypeToIcon, deviceTypeToName } from './_shared'
import { Constraints } from './_constraints'

export default function Consumer(props: { home: Home; device: Device }) {
  const { home, device } = props

  return (
    <>
      <div className="flex items-baseline">
        {deviceTypeToIcon(device.deviceType)}
        <div>
          <div className="font-medium text-lg">{device.name}</div>
          <div className="text-gray-500 text-sm">
            {device.power && `${device.power / 1000} kW`}
            {device.power && device.capacity && ', '}
            {device.capacity && `${device.capacity / 1000} kWh`}
          </div>
        </div>

        <div className="flex-1" />
        <div className="text-gray-500 text-xs">
          {deviceTypeToName(device.deviceType)}
        </div>
      </div>

      <Constraints homeId={home.id} deviceId={device.id} />
    </>
  )
}
