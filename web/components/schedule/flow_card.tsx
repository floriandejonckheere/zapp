import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { dateTypeToAPIString } from '@/utils'
import { DateType, Home } from '@/types'

import { getSchedules } from '@/api/schedule'
import { deviceTypeToIcon } from '@/components/infrastructure/_shared'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function FlowCard(props: { home: Home; date: DateType }) {
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

  const grids = data[0].elements.filter(
    (element) => element.device.deviceType === 'GR'
  )
  const storages = data[0].elements.filter(
    (element) => element.device.deviceType === 'ST'
  )

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col">
      <div className="mb-6 text-sm font-medium">Energy flow</div>

      <div className="flex flex-col gap-4">
        {grids.map((element) => {
          const checked = element.power[currentHour] === 1

          return (
            <div className="flex flex-row items-center" key={element.id}>
              {deviceTypeToIcon(element.device.deviceType)}
              <div className="flex flex-col">
                {element.device.name}
                <div className="text-xs text-gray-400">
                  {element.device.deviceType === 'GR' && 'Export to grid'}
                  {element.device.deviceType === 'ST' && 'Charge battery'}
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
        {storages.map((element) => {
          return (
            <div className="flex flex-row items-center" key={element.id}>
              {deviceTypeToIcon(element.device.deviceType)}
              <div className="flex flex-col">
                {element.device.name}
                <div className="text-xs text-gray-400">
                  {element.device.deviceType === 'GR' && 'Export to grid'}
                  {element.device.deviceType === 'ST' && 'Charge battery'}
                </div>
              </div>
              <div className="flex-1" />

              <select
                defaultValue={element.power[currentHour].toString()}
                className="w-20 border-0 p-0 text-xs text-gray-500 bg-none focus:ring-0"
              >
                <option value="0">Off</option>
                <option value="1">Charge</option>
                <option value="-1">Discharge</option>
              </select>
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
