import React from 'react'

import { Device, UpdateDevice } from '@/types'

import { deviceTypeToIcon } from './_shared'
import { Price } from '@/components/infrastructure/constraints/price'

export default function Grid(props: {
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

      <div className="mt-3 text-sm text-gray-700">Export</div>
      <Price
        start={device.startPriceIn}
        stop={device.stopPriceIn}
        onUpdate={(start, stop) => {
          onUpdate({ startPriceIn: start, stopPriceIn: stop })
        }}
      />

      <div className="mt-3 text-sm text-gray-700">Import</div>
      <Price
        start={device.startPriceOut}
        stop={device.stopPriceOut}
        onUpdate={(start, stop) => {
          onUpdate({ startPriceOut: start, stopPriceOut: stop })
        }}
      />
    </>
  )
}
