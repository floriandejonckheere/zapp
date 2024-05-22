import { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

export default function Auth(): ReactElement {
  return (
    <div className="flex flex-col gap-16 p-8 pt-16 bg-white dark:bg-slate-700 transition-all duration-500">
      <Outlet />
    </div>
  )
}
