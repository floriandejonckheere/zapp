import React, { ReactElement } from 'react'

import { useDate } from '@/contexts/date'
import { TODAY, TOMORROW } from '@/types'

export default function NewDateSelector(): ReactElement {
  const { date, setDate } = useDate()

  return (
    <div className="w-full flex items-center justify-center">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setDate(TODAY)
        }}
        className={`max-h-8 px-4 py-2 inline-flex items-center gap-x-2 rounded-md text-sm font-medium ${date == TODAY ? 'bg-white text-sky-700 shadow-md' : 'bg-sky-700 text-white'}`}
      >
        Today
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setDate(TOMORROW)
        }}
        className={`max-h-8 px-4 py-2 inline-flex items-center gap-x-2 rounded-md text-sm font-medium ${date == TOMORROW ? 'bg-white text-sky-700 shadow-md' : 'bg-sky-700 text-white'}`}
      >
        Tomorrow
      </a>
    </div>
  )
}
