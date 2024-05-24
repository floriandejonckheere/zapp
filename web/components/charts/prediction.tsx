import { ReactElement, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import apexchart, { ApexOptions } from 'apexcharts'

import { useTheme } from '@/contexts/theme'

interface PredictionChartProps {
  categories: string[]
  series: ApexAxisChartSeries
  options?: ApexOptions
}

export default function PredictionChart(
  props: PredictionChartProps
): ReactElement {
  const { darkMode } = useTheme()

  useEffect(() => {
    apexchart.exec('temperature', 'render')
  }, [darkMode])

  const [options] = useState<ApexOptions>({
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    chart: {
      id: 'prediction',
      type: 'line',
      stacked: true,
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
    colors: ['#4ade80', '#fb7185', '#93c5fd'],
    stroke: {
      curve: 'straight',
      width: 1
    },
    markers: {
      size: 3,
      hover: {
        size: 4
      }
    },
    xaxis: {
      categories: props.categories,
      tickAmount: 4
    },
    yaxis: [
      {
        seriesName: 'Consumption',
        labels: {
          formatter: (value) => (value / 1000).toFixed(1)
        },
        title: {
          text: 'kW'
        }
      },
      {
        seriesName: 'Production',
        show: false,
        labels: {
          formatter: (value) => (value / 1000).toFixed(1)
        },
        title: {
          text: 'kW'
        }
      },
      {
        seriesName: 'Price',
        opposite: true,
        labels: {
          formatter: (value) => value.toFixed(1)
        },
        title: {
          text: 'c€/kWh'
        }
      }
    ],
    series: props.series,
    ...props.options
  })

  return <Chart options={options} series={options.series} height="200" />
}
