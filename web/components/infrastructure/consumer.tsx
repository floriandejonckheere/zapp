import React from 'react'

import { Time } from '@/components/infrastructure/constraints/time'
import { Price } from '@/components/infrastructure/constraints/price'
import { Source } from '@/components/infrastructure/constraints/source'
import { Power } from '@/components/infrastructure/constraints/power'

import { Device, UpdateDevice } from '@/types'

import { deviceTypeToIcon } from './_shared'

export default function Consumer(props: {
  device: Device
  onUpdate: (data: UpdateDevice) => void
}) {
  const { device, onUpdate } = props

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

      <Time
        start={device.startTimeIn}
        stop={device.stopTimeIn}
        onUpdate={(start, stop) => {
          onUpdate({ startTimeIn: start, stopTimeIn: stop })
        }}
      />
      <Price
        start={device.startPriceIn}
        stop={device.stopPriceIn}
        onUpdate={(start, stop) => {
          onUpdate({ startPriceIn: start, stopPriceIn: stop })
        }}
      />
      <Source
        source={device.sourceIn}
        onUpdate={(source) => {
          onUpdate({ sourceIn: source })
        }}
      />
      <Power
        power={device.powerIn}
        onUpdate={(power) => {
          onUpdate({ powerIn: power })
        }}
      />
    </>
  )
}
