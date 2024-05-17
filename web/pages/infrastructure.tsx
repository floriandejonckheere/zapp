import React, { ReactElement, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Battery100Icon,
  BoltIcon,
  ChevronDownIcon,
  ClockIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  SunIcon
} from '@heroicons/react/24/solid'

import { Constraint, Home } from '@/types'
import { getConstraints, getDevices, getHomes } from '@/api/infrastructure'

function Constraints(props: {
  homeId: number
  deviceId: number
}): ReactElement {
  const { homeId, deviceId } = props

  const { isSuccess: isConstraintsSuccess, data: constraints } = useQuery({
    queryKey: ['constraints', homeId, deviceId],
    queryFn: () => getConstraints(homeId, deviceId),
    enabled: !!homeId && !!deviceId
  })

  if (!isConstraintsSuccess) {
    return <div>Loading...</div>
  }

  return constraints.map((constraint: Constraint) => {
    if (constraint.constraintType === 'TI') {
      // Time
      return (
        <div key={constraint.id} className="text-sm">
          <ClockIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
          {constraint.start && `From ${constraint.start}:00 `}
          {constraint.end && `Until ${constraint.end}:00`}
        </div>
      )
    } else if (constraint.constraintType === 'CO') {
      // Cost
      return (
        <div key={constraint.id} className="text-sm">
          <CurrencyDollarIcon className="inline-block mr-2 w-4 h-4 text-sky-700" />
          {constraint.start && `From ${constraint.start} c€/kWh `}
          {constraint.end && `Until ${constraint.end} c€/kWh`}
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
          Maximum {constraint.end / 1000} kW
        </div>
      )
    }
  })
}

export default function Infrastructure(): ReactElement {
  // @ts-expect-error error
  const [activeHome, setActiveHome] = useState<Home>(null)

  const { isSuccess: isHomesSuccess, data: homes } = useQuery({
    queryKey: ['homes'],
    queryFn: getHomes
  })

  const { isSuccess: isDevicesSuccess, data: devices } = useQuery({
    queryKey: ['devices', activeHome?.id],
    queryFn: () => getDevices(activeHome?.id),
    enabled: !!activeHome
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

  return (
    <>
      <div className="hs-dropdown relative inline-flex mb-4">
        <button
          id="hs-dropdown-default"
          type="button"
          className="w-full hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium bg-white shadow-md rounded-lg"
        >
          {activeHome ? activeHome.name : 'Select a home'}
          <span className="flex-1" />
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
          aria-labelledby="hs-dropdown-default"
        >
          {isHomesSuccess &&
            homes.map((home) => (
              <a
                key={home.id}
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveHome(home)
                }}
              >
                {home.name}
              </a>
            ))}
        </div>
      </div>

      {isDevicesSuccess &&
        devices
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
              <Constraints homeId={activeHome.id} deviceId={device.id} />
            </div>
          ))}
    </>
  )
}
