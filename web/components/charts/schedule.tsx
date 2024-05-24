import { ReactElement, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import apexchart, { ApexOptions } from 'apexcharts'

import { useTheme } from '@/contexts/theme'
import { format } from 'date-fns'

interface ScheduleChartProps {
  categories: string[]
  series: ApexAxisChartSeries
  annotations: ApexAnnotations
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
        horizontal: true,
        barHeight: '80%',
        rangeBarGroupRows: true
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      x: {
        formatter: (date) => {
          // If it's a string, it's formatting the series name
          if (typeof date === 'string') return date

          return format(new Date(date - 3 * 3600 * 1000), 'HH:mm') // TODO: fix timezones
        }
      }
    },
    xaxis: {
      type: 'datetime',
      min: props.min,
      max: props.max
    },
    series: props.series,
    annotations: props.annotations,
    ...props.options
  })

  return <Chart type="rangeBar" options={options} series={options.series} />
}
