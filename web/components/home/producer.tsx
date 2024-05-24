import React from 'react'

import { Device, UpdateDevice } from '@/types'

import { Time } from '@/components/home/constraints/time'

import { deviceTypeToIcon } from './_shared'
import { Price } from '@/components/home/constraints/price'
import { Power } from '@/components/home/constraints/power'

export default function Producer(props: {
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
        start={device.startTimeOut}
        stop={device.stopTimeOut}
        onUpdate={(start, stop) => {
          onUpdate({ startTimeOut: start, stopTimeOut: stop })
        }}
      />
      <Price
        start={device.startPriceOut}
        stop={device.stopPriceOut}
        onUpdate={(start, stop) => {
          onUpdate({ startPriceOut: start, stopPriceOut: stop })
        }}
      />
      <Power
        power={device.powerOut}
        onUpdate={(power) => {
          onUpdate({ powerOut: power })
        }}
      />
    </>
  )
}
