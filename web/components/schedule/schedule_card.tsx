import React, { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'

import { dateTypeToAPIString } from '@/utils'
import { DateType, Home, ScheduleElement } from '@/types'

import { getSchedules } from '@/api/schedule'
import ScheduleChart from '@/components/charts/schedule'

function getPowerRanges(
  arr: number[],
  targetValue: number
): Array<[number, number]> {
  const ranges: Array<[number, number]> = []
  let start: number | null = null

  arr.forEach((val, i) => {
    if (val === targetValue) {
      if (start === null) {
        start = i
      }
      if (i === arr.length - 1 || arr[i + 1] !== targetValue) {
        ranges.push([start, i + 1])
        start = null
      }
    }
  })

  return ranges
}

function extractPowerRanges(
  date: DateType,
  element: ScheduleElement,
  targetValue: number
) {
  return getPowerRanges(element.power, targetValue).map(([start, end]) => {
    return {
      x: element.device.name,
      y: [
        new Date(
          `${dateTypeToAPIString(date)}T${start.toString().padStart(2, '0')}:00`
        ).getTime() +
          3 * 3600 * 1000, // TODO: fix timezones
        new Date(
          `${dateTypeToAPIString(date)}T${end.toString().padStart(2, '0')}:00`
        ).getTime() +
          3 * 3600 * 1000 // TODO: fix timezones
      ]
    }
  })
}

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

  if (!isSuccess)
    return (
      <div className="text-white text-center font-bold">An error occurred.</div>
    )
  if (data.length === 0)
    return (
      <div className="text-white text-center text-sm">
        No schedule found for {date}.
      </div>
    )

  const scheduleDataByPower = [
    {
      name: 'Consuming energy',
      color: '#fb7185',
      data: [
        data[0].elements
          .filter((element) => element.device.deviceType === 'CO')
          .map((element) => extractPowerRanges(date, element, 1))
          .flat()
      ].flat()
    },
    {
      name: 'Producing energy',
      color: '#fbbf24',
      data: [
        data[0].elements
          .filter((element) => element.device.deviceType === 'PR')
          .map((element) => extractPowerRanges(date, element, -1))
          .flat()
      ].flat()
    },
    {
      name: 'Charging',
      color: '#fb7185',
      data: [
        data[0].elements
          .filter((element) => element.device.deviceType === 'ST')
          .map((element) => extractPowerRanges(date, element, 1))
          .flat()
      ].flat()
    },
    {
      name: 'Discharging',
      color: '#4ade80',
      data: [
        data[0].elements
          .filter((element) => element.device.deviceType === 'ST')
          .map((element) => extractPowerRanges(date, element, -1))
          .flat()
      ].flat()
    },
    {
      name: 'Exporting energy',
      color: '#4f46e5',
      data: [
        data[0].elements
          .filter((element) => element.device.deviceType === 'GR')
          .map((element) => extractPowerRanges(date, element, 1))
          .flat()
      ].flat()
    },
    {
      name: 'Importing energy',
      color: '#818cf8',
      data: [
        data[0].elements
          .filter((element) => element.device.deviceType === 'GR')
          .map((element) => extractPowerRanges(date, element, -1))
          .flat()
      ].flat()
    }
  ]

  return (
    <div className="w-full py-6 bg-white rounded-2xl shadow-md flex flex-col">
      <div className="px-6 text-sm font-medium">Smart energy schedule</div>
      <ScheduleChart
        categories={new Array(24)
          .fill('')
          .map((_, i) => `${i}:00`.padStart(5, '0'))}
        series={scheduleDataByPower}
        annotations={{
          xaxis: [
            {
              x: new Date().getTime() + 3 * 3600 * 1000, // TODO: fix timezones
              borderColor: '#fb7185'
            }
          ]
        }}
        min={
          new Date(`${dateTypeToAPIString(date)}T00:00:00`).getTime() +
          3 * 3600 * 1000
        } // TODO: fix timezones
        max={
          new Date(`${dateTypeToAPIString(date)}T23:59:59`).getTime() +
          3 * 3600 * 1000
        } // TODO: fix timezones
      />
    </div>
  )
}
