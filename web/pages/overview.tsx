import { ReactElement } from 'react'
import { BsFillPlugFill } from 'react-icons/bs'
import { GiBatteryPack } from 'react-icons/gi'
import { ImPower } from 'react-icons/im'
import { LuUtilityPole } from 'react-icons/lu'
import { PiHouseLineFill, PiSolarPanelFill } from 'react-icons/pi'

export default function Overview(): ReactElement {
  return (
    <div className="h-full rounded-md w-full bg-neutral-800 flex items-center justify-center">
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
        <div className="absolute flex flex-col items-center top-1/4 text-center text-yellow-500">
          <div className=" text-gray-300">100 W</div>
          <div className=" text-gray-500">Rest</div>
          <div className="border-2 border-yellow-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <ImPower className="text-gray-300" />
          </div>
        </div>

        {/* Battery */}
        <div className="absolute flex flex-col items-center top-1/4 right-2 text-center text-green-500">
          <div className=" text-gray-300">2.3 kW</div>
          <div className=" text-gray-500">PV</div>
          <div className="border-2 border-green-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <PiSolarPanelFill className="text-gray-300" />
          </div>
        </div>

        {/* House */}
        <div className="absolute flex flex-col items-center bottom-1/4 right-2 text-center text-yellow-500">
          <div className=" text-gray-300">1.2 kW</div>
          <div className=" text-gray-500">Battery</div>
          <div className="border-2 border-yellow-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <GiBatteryPack className="text-gray-300" />
          </div>
        </div>

        {/* Wallbox */}
        <div className="absolute flex flex-col items-center bottom-2 left-1/2 transform -translate-x-1/2 text-center text-gray-300">
          <div className="border-2 border-gray-500 rounded-full h-10 w-10 flex items-center justify-center bg-neutral-800">
            <BsFillPlugFill className="text-gray-300" />
          </div>
          <div className=" text-gray-500">Wallbox</div>
          <div className=" text-gray-300">0 W</div>
        </div>

        {/* Rest */}
        <div className="absolute flex flex-col items-center bottom-1/4  text-center text-yellow-500">
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
            <div className="absolute w-0.5 h-1/2 bg-gray-300 transform rotate-45 origin-bottom-left left-1/2 top-0"></div>
            {/* Top-Right to Center */}
            <div className="absolute w-0.5 h-1/2 bg-gray-300 transform -rotate-45 origin-bottom-right right-1/2 top-0"></div>
            {/* Bottom-Left to Center */}
            <div className="absolute w-0.5 h-1/2 bg-gray-300 transform -rotate-45 origin-top-left left-1/2 bottom-0"></div>
            {/* Bottom-Right to Center */}
            <div className="absolute w-0.5 h-1/2 bg-gray-300 transform rotate-45 origin-top-right right-1/2 bottom-0"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
