import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { dateTypeToAPIString } from '@/utils'
import { DateType, Home } from '@/types'

import { getSchedules } from '@/api/schedule'
import { deviceTypeToIcon } from '@/components/home/_shared'

export default function LoadCard(props: { home: Home; date: DateType }) {
  const { home, date } = props

  const { isSuccess, data } = useQuery({
    queryKey: ['schedules', home.id, date],
    queryFn: () => getSchedules(home.id, dateTypeToAPIString(date)),
    enabled: !!home
  })

  if (!isSuccess)
    return (
      <div className="text-white text-center font-bold">An error occurred.</div>
    )
  if (data.length === 0) return null

  const currentHour = new Date().getHours()

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col">
      <div className="mb-6 text-sm font-medium">Current energy usage</div>

      <div className="flex flex-col gap-4">
        {data[0].elements
          .filter(
            (element) =>
              element.device.deviceType === 'CO' ||
              element.device.deviceType === 'PR'
          )
          .map((element) => {
            const checked = element.power[currentHour] != 0

            return (
              <div className="flex flex-row items-center" key={element.id}>
                {deviceTypeToIcon(element.device.deviceType)}
                <div className="flex flex-col">
                  {element.device.name}
                  <div className="text-xs text-gray-400">
                    {element.device.power &&
                      `${(element.device.power / 1000).toFixed(1)} kW`}
                  </div>
                </div>
                <div className="flex-1" />
                <input
                  type="checkbox"
                  defaultChecked={checked}
                  className="relative w-11 h-6 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-sky-700 checked:border-sky-700 focus:checked:border-sky-700 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
