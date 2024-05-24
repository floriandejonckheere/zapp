import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { DateType, Home } from '@/types'
import { dateTypeToAPIString } from '@/utils'

import { getPrediction } from '@/api/schedule'
import PredictionChart from '@/components/charts/prediction'

export default function PredictionCard(props: { home: Home; date: DateType }) {
  const { home, date } = props

  const { isSuccess, data } = useQuery({
    queryKey: ['prediction', home.id, date],
    queryFn: () => getPrediction(home.id, dateTypeToAPIString(date)),
    enabled: !!home
  })

  if (!isSuccess) return null

  return (
    <div className="w-full py-4 bg-white rounded-2xl shadow-md flex flex-col">
      <div className="px-6 text-sm font-medium">
        Predicted production and consumption
      </div>
      <PredictionChart
        categories={new Array(24)
          .fill('')
          .map((_, i) => `${i}:00`.padStart(5, '0'))}
        series={[
          {
            name: 'Production',
            type: 'line',
            data: data[0].production
          },
          {
            name: 'Consumption',
            type: 'line',
            data: data[0].consumption
          },
          {
            name: 'Price',
            type: 'bar',
            data: data[0].cost
          }
        ]}
      />
    </div>
  )
}
