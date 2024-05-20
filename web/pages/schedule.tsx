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

  const deviceTypeToIcon = (deviceType: string) => {
    if (deviceType === 'CO') {
      // Consumer
      return <CpuChipIcon className="inline-block mr-2 w-3 h-3 text-sky-700" />
    } else if (deviceType === 'PR') {
      // Producer
      return <SunIcon className="inline-block mr-2 w-3 h-3 text-yellow-400" />
    } else if (deviceType === 'ST') {
      // Storage
      return (
        <Battery100Icon className="inline-block mr-2 w-3 h-3 text-green-400" />
      )
    } else {
      return <BoltIcon className="inline-block mr-2 w-3 h-3 text-sky-700" />
    }
  }

  if (!home) return <div>Loading...</div>

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
      {isSuccess &&
        data[0].elements
          .filter((element) => element.device.deviceType != 'GR')
          .map((element) => (
            <div key={element.id} className="flex flex-col">
              <div className="flex items-baseline">
                {deviceTypeToIcon(element.device.deviceType)}
                <div className="font-medium text-sm">{element.device.name}</div>
              </div>
              <div className="w-full flex">
                {element.power.map((power, index) => (
                  <div
                    key={index}
                    className={`w-[4%] h-5 ${power > 0 ? 'bg-green-400' : power < 0 ? 'bg-red-400' : 'bg-gray-400'}`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
    </div>
  )
}
