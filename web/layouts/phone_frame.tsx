import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

export default function PhoneFrame(): ReactElement {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-600">
      <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[800px] w-[400px]">
        <div className="absolute h-[18px] w-[148px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2"></div>
        <div className="absolute h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="absolute h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="absolute h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="absolute h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-auto scrollbar-hide w-[372px] h-[772px] bg-white dark:bg-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
