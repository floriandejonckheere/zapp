import React from 'react'

import { Device, Home } from '@/types'

import { Time } from '@/components/home/constraints/time'

import { deviceTypeToIcon } from './_shared'
import { Price } from '@/components/home/constraints/price'

export default function Storage(props: { home: Home; device: Device }) {
  const { home, device } = props

  return (
    <>
      <div className="flex items-baseline">
        {deviceTypeToIcon(device.deviceType)}
        <div className="mr-2">
          <div className="font-medium text-lg">{device.name}</div>
        </div>

        <div className="text-gray-500 text-xs">
          {(device.power || device.capacity) && '('}
          {device.power && `${device.power / 1000} kW`}
          {device.power && device.capacity && ', '}
          {device.capacity && `${device.capacity / 1000} kWh`}
          {(device.power || device.capacity) && ')'}
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700">Charging</div>
      <Time start={device.startTimeIn} stop={device.stopTimeIn} />
      <Price start={device.startPriceIn} stop={device.stopPriceIn} />

      <div className="mt-3 text-sm text-gray-700">Discharging</div>
      <Time start={device.startTimeOut} stop={device.stopTimeOut} />
      <Price start={device.startPriceOut} stop={device.stopPriceOut} />
    </>
  )
}
