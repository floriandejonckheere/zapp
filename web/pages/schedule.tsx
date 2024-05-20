import React, { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Battery100Icon,
  BoltIcon,
  CpuChipIcon,
  SunIcon
} from '@heroicons/react/24/solid'

import { useHome } from '@/contexts/home'

import { getSchedules } from '@/api/schedule'

export default function Schedule(): ReactElement {
  const { home } = useHome()

  // Tomorrow's date
  const date = new Date()
  date.setDate(date.getDate() + 1)

  const tomorrow = date.toISOString().substring(0, 10)

  const { isSuccess, data } = useQuery({
    queryKey: ['schedules', home?.id, tomorrow],
    // @ts-expect-error error
    queryFn: () => getSchedules(home.id, tomorrow),
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
        data[0].elements
          .filter((element) => element.device.deviceType != 'GR')
          .map((element) => (
            <div
              key={element.id}
              className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col gap-3"
            >
              <div className="flex items-baseline">
                {deviceTypeToIcon(element.device.deviceType)}
                <div>
                  <div className="font-medium text-lg">
                    {element.device.name}
                  </div>
                </div>

                <div className="flex-1" />
                <div className="text-gray-500 text-xs">
                  {deviceTypeToName(element.device.deviceType)}
                </div>
              </div>
            </div>
          ))}
    </>
  )
}
