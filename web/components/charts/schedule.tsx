import { ReactElement, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import apexchart, { ApexOptions } from 'apexcharts'

import { useTheme } from '@/contexts/theme'
import { format } from 'date-fns'

interface ScheduleChartProps {
  categories: string[]
  series: ApexAxisChartSeries
  min: number
  max: number
  options?: ApexOptions
}

export default function ScheduleChart(props: ScheduleChartProps): ReactElement {
  const { darkMode } = useTheme()

  useEffect(() => {
    apexchart.exec('temperature', 'render')
  }, [darkMode])

  const [options] = useState<ApexOptions>({
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    chart: {
      id: 'schedule',
      type: 'rangeBar',
      background: 'transparent',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      animations: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    tooltip: {
      x: {
        formatter: (date) => {
          // FIXME: not sure why this is needed, but it is
          if (typeof date === 'string') return date

          return format(new Date(date), 'HH:mm')
        }
      }
    },
    xaxis: {
      type: 'datetime',
      min: props.min,
      max: props.max
    },
    series: props.series,
    ...props.options
  })

  return (
    <Chart
      type="rangeBar"
      options={options}
      series={options.series}
      height="150"
    />
  )
}
