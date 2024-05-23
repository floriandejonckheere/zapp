import React, { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Battery100Icon,
  BoltIcon,
  CpuChipIcon,
  SunIcon
} from '@heroicons/react/24/solid'

import { dateTypeToAPIString } from '@/utils'
import { DateType, Home } from '@/types'

import { getSchedules } from '@/api/schedule'

export default function ScheduleCard(props: {
  home: Home
  date: DateType
}): ReactElement {
  const { home, date } = props

  const { isSuccess, data } = useQuery({
    queryKey: ['schedules', home.id, date],
    queryFn: () => getSchedules(home.id, dateTypeToAPIString(date)),
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

  if (!isSuccess)
    return (
      <div className="text-white text-center font-bold">An error occurred.</div>
    )
  if (data.length === 0)
    return (
      <div className="text-white text-center font-bold">
        No schedule found for {date}.
      </div>
    )

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
      {data[0].elements
        .filter((element) => element.device.deviceType != 'GR')
        .map((element) => (
          <div key={element.id} className="flex flex-col">
            <div className="flex items-baseline">
              {deviceTypeToIcon(element.device.deviceType)}
              <div className="font-medium text-sm">{element.device.name}</div>
            </div>
            <div className="w-full flex gap-0.5">
              {element.power.map((power, index) => (
                <div
                  key={index}
                  className={`w-[4%] h-5 text-xs  text-center ${power > 0 ? 'bg-green-400' : power < 0 ? 'bg-red-400' : 'bg-gray-400'}`}
                >
                  {/* TODO: remove for final version */}
                  {power}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}