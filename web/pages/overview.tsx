import { getPrediction, getSchedules } from '@/api/schedule'
import Spinner from '@/components/spinner'
import { useDate } from '@/contexts/date'
import { useHome } from '@/contexts/home'
import { dateTypeToAPIString } from '@/utils'
import { BoltIcon as OutlineBoltIcon } from '@heroicons/react/24/outline'
import {
  Battery100Icon,
  BoltIcon as SolidBoltIcon,
  SunIcon
} from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { BsFillPlugFill } from 'react-icons/bs'
import { LuUtilityPole } from 'react-icons/lu'
import { PiHouseLineFill } from 'react-icons/pi'
import { TiWeatherPartlySunny } from 'react-icons/ti'

export default function Overview(): ReactElement {
  const { home } = useHome()
  const { date } = useDate()
  const currentHour = new Date().getHours()
  const {
    isSuccess: isPredictionSuccess,
    data: predictionData,
    isLoading: isPredictionLoading,
    isError: isPredictionError
  } = useQuery({
    queryKey: ['prediction', home?.id, date],
    queryFn: () => getPrediction(home!.id, dateTypeToAPIString(date)),
    enabled: !!home
  })

  const {
    isSuccess: isScheduleSuccess,
    data: scheduleData,
    isLoading: isScheduleLoading,
    isError: isScheduleError
  } = useQuery({
    queryKey: ['schedules', home?.id, date],
    queryFn: () => getSchedules(home.id, dateTypeToAPIString(date)),
    enabled: !!home
  })

  const getColorClass = (powerValue: -1 | 0 | 1) => {
    switch (powerValue) {
      case -1:
        return '#166534'
      case 0:
        return '#d1d5db'
      case 1:
        return '#991b1b'
      default:
        return '#d1d5db'
    }
  }

  const getColorClassGrid = (powerValue: -1 | 0 | 1) => {
    switch (powerValue) {
      case -1:
        return '#991b1b'
      case 0:
        return '#d1d5db'
      case 1:
        return '#166534'
      default:
        return '#d1d5db'
    }
  }

  if (isPredictionLoading || isScheduleLoading) {
    return (
      <div className="h-full w-full flex justify-center">
        <Spinner color="text-white" />
      </div>
    )
  }

  if (
    (isPredictionError && !isPredictionSuccess) ||
    (isScheduleError && !isScheduleSuccess)
  ) {
    return (
      <div className="text-white text-center font-bold">An error occurred.</div>
    )
  }

  if (
    !isPredictionSuccess ||
    !predictionData ||
    !predictionData[0] ||
    !scheduleData
  ) {
    return (
      <div className="text-white text-center font-bold">No data available.</div>
    )
  }

  const extractColorClass = (deviceType: string) => {
    const deviceElement = scheduleData[0].elements.filter(
      (element) => element.device.deviceType === deviceType
    )[0]

    const powerValue = (deviceElement?.power?.[currentHour - 1] ?? 0) as
      | -1
      | 0
      | 1
    return getColorClass(powerValue)
  }

  const extractColorClassGrid = (deviceType: string) => {
    const deviceElement = scheduleData[0].elements.filter(
      (element) => element.device.deviceType === deviceType
    )[0]

    const powerValue = (deviceElement?.power?.[currentHour - 1] ?? 0) as
      | -1
      | 0
      | 1
    return getColorClassGrid(powerValue)
  }

  const gridColorClass = extractColorClassGrid('GR')
  console.log(`Grid color class: ${gridColorClass}`)
  const pvColorClass = extractColorClass('PR')
  const batteryColorClass = extractColorClass('ST')
  const wallboxColorClass = extractColorClass('EV')

  console.log(scheduleData)

  const currentPrice = predictionData[0]?.price?.[currentHour - 1] ?? 'N/A'
  const currentProduction =
    (predictionData[0]?.production?.[currentHour - 1] ?? 0) / 1000
  return (
    <div className="h-full rounded-md w-full bg-neutral-800 flex items-center justify-center flex-col">
      <div className="flex flex-row justify-evenly w-72 text-sm pt-2">
        <div>Spot price</div>
        <div>Temperature</div>
      </div>
      <div className="h-20 w-72 flex flex-row justify-evenly pt-2">
        <div className="bg-gray-300 rounded-lg h-12 w-28 flex flex-row items-center justify-evenly">
          <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-800">
            <OutlineBoltIcon className="w-5 text-gray-300" />
          </div>
          <div className="flex flex-col text-sm">
            <div>{currentPrice}</div>
            <div className="text-gray-500">c€/kWh</div>
          </div>
        </div>
        <div className="bg-gray-300 rounded-lg h-12 w-28 flex flex-row items-center justify-evenly">
          <div className=" flex items-center  justify-center ">
            <TiWeatherPartlySunny className=" h-10 w-10 text-gray-300" />
          </div>
          <div className="flex flex-col text-sm">
            <div>23</div>
            <div className="text-gray-500">°C</div>
          </div>
        </div>
      </div>
      <div className="relative w-72 h-96">
        {/* Grid */}
        <div className="absolute flex flex-col items-center top-2 left-1/2 transform -translate-x-1/2 text-center text-gray-300 z-10 bg-neutral-800">
          <div className=" text-gray-300">150 W</div>
          <div className=" text-gray-500">Grid</div>
          <div
            style={{ borderColor: gridColorClass }}
            className={`border-2 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800`}
          >
            <LuUtilityPole className="text-gray-300" />
          </div>
        </div>

        {/* Rest */}
        <div className="absolute flex flex-col items-center top-14 text-center text-yellow-500 z-10">
          <div className=" text-gray-300">100 W</div>
          <div className=" text-gray-500">Rest</div>
          <div className="border-2 border-yellow-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <SolidBoltIcon className="w-5 text-gray-300" />
          </div>
        </div>

        {/* PV */}
        <div className="absolute flex flex-col items-center top-14 right-2 text-center text-green-500 z-10">
          <div className=" text-gray-300">{currentProduction} kW</div>
          <div className=" text-gray-500">PV</div>
          <div
            style={{ borderColor: pvColorClass }}
            className={`border-2 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800`}
          >
            <SunIcon className="w-5 text-gray-300" />
          </div>
        </div>

        {/* Battery */}
        <div className="absolute flex flex-col items-center bottom-12 right-2 text-center text-yellow-500 z-10">
          <div
            className={`border-2 border${batteryColorClass} rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800`}
            style={{ borderColor: batteryColorClass }}
          >
            <Battery100Icon className="w-5 text-gray-300" />
          </div>
          <div className=" text-gray-500">Battery</div>
          <div className=" text-gray-300">1.2 kW</div>
        </div>

        {/* Wallbox */}
        <div className="absolute flex flex-col items-center bottom-2 left-1/2 transform -translate-x-1/2 text-center text-gray-300 z-10">
          <div
            style={{ borderColor: wallboxColorClass }}
            className={`border-2 border${wallboxColorClass} rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800`}
          >
            <BsFillPlugFill className="text-gray-300" />
          </div>
          <div className=" text-gray-500">Wallbox</div>
          <div className=" text-gray-300">0 W</div>
        </div>

        {/* House */}
        <div className="absolute flex flex-col items-center bottom-12  text-center text-yellow-500 z-10">
          <div className="border-2 border-yellow-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <PiHouseLineFill className="text-gray-300" />
          </div>
          <div className=" text-gray-500">House</div>
          <div className=" text-gray-300">100 W</div>
        </div>

        {/* Central Node */}
        <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>

        {/* Connecting Lines */}
        <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {/* Vertical Line */}
          <div
            style={{ backgroundColor: gridColorClass }}
            className={`absolute top-0 left-1/2 w-0.5 h-28 mt-20 bg-gray-300 `}
          ></div>
          <div
            style={{ backgroundColor: wallboxColorClass }}
            className="absolute bottom-0 left-1/2 w-0.5 h-28 mb-20 bg-gray-300"
          ></div>

          {/* Diagonal Lines */}
          <div className="absolute w-full h-full">
            {/* Top-Right to Center */}
            <div
              className="absolute w-0.5 h-1/3 bg-gray-300 transform"
              style={{
                transform: 'rotate(60deg)',
                transformOrigin: 'bottom left',
                left: '50%',
                top: '16.5%',
                backgroundColor: pvColorClass
              }}
            ></div>
            {/* Top-Left to Center */}
            <div
              className="absolute w-0.5 h-1/3 bg-yellow-300 transform "
              style={{
                transform: 'rotate(-60deg)',
                transformOrigin: 'bottom right',
                left: '50%',
                top: '16.5%'
              }}
            ></div>
            {/* Bottom-Right to Center */}
            <div
              className="absolute w-0.5 h-1/3 bg-gray-300 transform"
              style={{
                transform: 'rotate(-60deg)',
                transformOrigin: 'top left',
                left: '50%',
                top: '50%',
                backgroundColor: batteryColorClass
              }}
            ></div>
            {/* Bottom-Left to Center */}
            <div
              className="absolute w-0.5 h-1/3 bg-yellow-300 transform"
              style={{
                transform: 'rotate(60deg)',
                transformOrigin: 'top right',
                left: '50%',
                top: '50%'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
