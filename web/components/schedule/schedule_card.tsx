import React, { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'

import { dateTypeToAPIString } from '@/utils'
import { DateType, Home } from '@/types'

import { getSchedules } from '@/api/schedule'
import ScheduleChart from '@/components/charts/schedule'

function getNonZeroRanges(arr: number[]): Array<[number, number]> {
  const ranges: Array<[number, number]> = []
  let start: number | null = null

  arr.forEach((val, i) => {
    if (val !== 0) {
      if (start === null) {
        start = i
      }
      if (i === arr.length - 1 || arr[i + 1] === 0) {
        ranges.push([start, i])
        start = null
      }
    }
  })

  return ranges
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

  const scheduleData = data[0].elements
    .map((element) => {
      return getNonZeroRanges(element.power).map(([start, end]) => ({
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
      }))
    })
    .flat()

  return (
    <div className="w-full py-6 bg-white rounded-2xl shadow-md flex flex-col">
      <div className="px-6 text-sm font-medium">Smart energy schedule</div>
      <ScheduleChart
        categories={new Array(24)
          .fill('')
          .map((_, i) => `${i}:00`.padStart(5, '0'))}
        series={[{ data: scheduleData }]}
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
