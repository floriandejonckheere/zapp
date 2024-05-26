import { getDevices } from '@/api/infrastructure'
import { getSchedules } from '@/api/schedule'
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
  const { isSuccess, data } = useQuery({
    queryKey: ['devices', home?.id],
    queryFn: () => getDevices(home!.id),
    enabled: !!home
  })

  if (!home) {
    return (
      <div className="h-full w-full flex justify-center">
        <Spinner color="text-white" />
      </div>
    )
  }

  if (!isSuccess) {
    return (
      <div className="text-white text-center font-bold">An error occurred.</div>
    )
  }

  console.log(data)
  return (
    <div className="h-full rounded-md w-full bg-neutral-800 flex items-center justify-center flex-col">
      <div className="h-20 w-72 flex flex-row justify-evenly pt-4">
        <div className="bg-gray-300 rounded-lg h-12 w-28 flex flex-row items-center justify-evenly">
          <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-800">
            <OutlineBoltIcon className="w-5 text-gray-300" />
          </div>
          <div className="flex flex-col text-sm">
            <div>Price</div>
            <div className="text-gray-500">€/kWh</div>
          </div>
        </div>
        <div className="bg-gray-300 rounded-lg h-12 w-28 flex flex-row items-center justify-evenly">
          <div className=" flex items-center  justify-center ">
            <TiWeatherPartlySunny className=" h-10 w-10 text-gray-300" />
          </div>
          <div className="flex flex-col text-sm">
            <div>Temp</div>
            <div className="text-gray-500">°C</div>
          </div>
        </div>
      </div>
      <div className="relative w-72 h-96">
        {/* Grid */}
        <div className="absolute flex flex-col items-center top-2 left-1/2 transform -translate-x-1/2 text-center text-gray-300 z-10 bg-neutral-800">
          <div className=" text-gray-300">0 W</div>
          <div className=" text-gray-500">Grid</div>
          <div className="border-2 border-gray-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <LuUtilityPole className="text-gray-300" />
          </div>
        </div>

        {/* PV */}
        <div className="absolute flex flex-col items-center top-14 text-center text-yellow-500 z-10">
          <div className=" text-gray-300">100 W</div>
          <div className=" text-gray-500">Rest</div>
          <div className="border-2 border-yellow-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <SolidBoltIcon className="w-5 text-gray-300" />
          </div>
        </div>

        {/* Battery */}
        <div className="absolute flex flex-col items-center top-14 right-2 text-center text-green-500 z-10">
          <div className=" text-gray-300">2.3 kW</div>
          <div className=" text-gray-500">PV</div>
          <div className="border-2 border-green-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <SunIcon className="w-5 text-gray-300" />
          </div>
        </div>

        {/* House */}
        <div className="absolute flex flex-col items-center bottom-1/4 right-2 text-center text-yellow-500 z-10">
          <div className=" text-gray-300">1.2 kW</div>
          <div className=" text-gray-500">Battery</div>
          <div className="border-2 border-yellow-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <Battery100Icon className="w-5 text-gray-300" />
          </div>
        </div>

        {/* Wallbox */}
        <div className="absolute flex flex-col items-center bottom-2 left-1/2 transform -translate-x-1/2 text-center text-gray-300 z-10">
          <div className="border-2 border-gray-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <BsFillPlugFill className="text-gray-300" />
          </div>
          <div className=" text-gray-500">Wallbox</div>
          <div className=" text-gray-300">0 W</div>
        </div>

        {/* Rest */}
        <div className="absolute flex flex-col items-center bottom-1/4  text-center text-yellow-500 z-10">
          <div className=" text-gray-300">100 W</div>
          <div className=" text-gray-500">House</div>
          <div className="border-2 border-yellow-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <PiHouseLineFill className="text-gray-300" />
          </div>
        </div>

        {/* Central Node */}
        <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>

        {/* Connecting Lines */}
        <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {/* Vertical Line */}
          <div className="absolute top-0 left-1/2 w-0.5 h-1/2 mt-20 bg-gray-300"></div>
          <div className="absolute bottom-0 left-1/2 w-0.5 h-1/2 mb-20 bg-gray-300"></div>

          {/* Diagonal Lines */}
          <div className="absolute w-full h-full">
            {/* Top-Left to Center */}
            <div
              className="absolute w-0.5 h-1/3 bg-gray-300 transform"
              style={{
                transform: 'rotate(60deg)',
                transformOrigin: 'bottom left',
                left: '50%',
                top: '16.5%'
              }}
            ></div>
            {/* Top-Right to Center */}
            <div
              className="absolute w-0.5 h-1/3 bg-gray-300 transform "
              style={{
                transform: 'rotate(-60deg)',
                transformOrigin: 'bottom right',
                left: '50%',
                top: '16.5%'
              }}
            ></div>
            {/* Bottom-Left to Center */}
            <div
              className="absolute w-0.5 h-1/3 bg-gray-300 transform"
              style={{
                transform: 'rotate(-60deg)',
                transformOrigin: 'top left',
                left: '50%',
                top: '50%'
              }}
            ></div>
            {/* Bottom-Right to Center */}
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
