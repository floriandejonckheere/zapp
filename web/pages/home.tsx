import React, { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Battery100Icon,
  BoltIcon,
  ClockIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  SunIcon
} from '@heroicons/react/24/solid'

import { Constraint } from '@/types'

import { useHome } from '@/contexts/home'

import { getConstraints, getDevices } from '@/api/infrastructure'

function Constraints(props: { homeId: number; deviceId: number }) {
  const { homeId, deviceId } = props

  const { isSuccess, data } = useQuery({
    queryKey: ['constraints', homeId, deviceId],
    queryFn: () => getConstraints(homeId, deviceId),
    enabled: !!homeId && !!deviceId
  })

  if (!isSuccess) {
    return <div>Loading...</div>
  }

  return data.map((constraint: Constraint) => {
    if (constraint.constraintType === 'TI') {
      // Time
      return (
        <div key={constraint.id} className="text-sm">
          <ClockIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
          {constraint.start != null && `From ${constraint.start}:00 `}
          {constraint.stop != null && `Until ${constraint.stop}:00`}
        </div>
      )
    } else if (constraint.constraintType === 'CO') {
      // Cost
      return (
        <div key={constraint.id} className="text-sm">
          <CurrencyDollarIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
          {constraint.start != null && `From ${constraint.start} c€/kWh `}
          {constraint.stop != null && `Until ${constraint.stop} c€/kWh`}
        </div>
      )
    } else if (constraint.constraintType === 'SO') {
      // Source
      return (
        <div key={constraint.id} className="text-sm">
          <BoltIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
          {constraint.sourceId}
        </div>
      )
    } else if (constraint.constraintType === 'PO') {
      // Power
      return (
        <div key={constraint.id} className="text-sm">
          <BoltIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
          {/* @ts-expect-error error */}
          Maximum {constraint.stop / 1000} kW
        </div>
      )
    }
  })
}

export default function Home(): ReactElement {
  const { home } = useHome()

  const { isSuccess, data } = useQuery({
    queryKey: ['devices', home?.id],
    // @ts-expect-error error
    queryFn: () => getDevices(home.id),
    enabled: !!home
  })

  const deviceTypeToName = (deviceType: string) => {
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

  const deviceTypeToIcon = (deviceType: string) => {
    if (deviceType === 'CO') {
      // Consumer
      return <CpuChipIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
    } else if (deviceType === 'PR') {
      // Producer
      return <SunIcon className="inline-block mr-2 w-4 h-4 text-yellow-400" />
    } else if (deviceType === 'ST') {
      // Storage
      return (
        <Battery100Icon className="inline-block mr-2 w-4 h-4 text-green-400" />
      )
    } else {
      return <BoltIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
    }
  }

  if (!home) return <div>Loading...</div>

  return (
    <>
      {isSuccess &&
        data
          .filter((device) => device.deviceType != 'GR')
          .map((device) => (
            <div
              key={device.id}
              className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col gap-3"
            >
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
            </div>
          ))}
    </>
  )
}
