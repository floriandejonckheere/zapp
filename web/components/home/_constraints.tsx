import { useQuery } from '@tanstack/react-query'
import { getConstraints } from '@/api/infrastructure'
import { Constraint } from '@/types'
import {
  BoltIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/solid'
import React from 'react'

export function Constraints(props: { homeId: number; deviceId: number }) {
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
