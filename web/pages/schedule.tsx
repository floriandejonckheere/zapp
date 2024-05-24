import React, { ReactElement } from 'react'

import { useHome } from '@/contexts/home'
import { useDate } from '@/contexts/date'

import Spinner from '@/components/spinner'

import ScheduleCard from '@/components/schedule/schedule_card'
import PredictionCard from '@/components/schedule/prediction_card'
import LoadCard from '@/components/schedule/load_card'

import { TODAY } from '@/types'

export default function Schedule(): ReactElement {
  const { home } = useHome()
  const { date } = useDate()

  if (!home)
    return (
      <div className="h-full w-full flex justify-center">
        <Spinner color="text-white" />
      </div>
    )

  return (
    <>
      <PredictionCard home={home} date={date} />
      <ScheduleCard home={home} date={date} />
      {date === TODAY && <LoadCard home={home} date={date} />}
    </>
  )
}
