import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { me } from '@/api/users'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Header(props: {
  title: string
  back?: boolean
}): ReactElement {
  const { title, back = false } = props

  const { isSuccess, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  const hour = new Date().getHours()

  let moment
  switch (true) {
    case hour < 6:
      moment = 'night'
      break
    case hour < 12:
      moment = 'morning'
      break
    case hour < 18:
      moment = 'afternoon'
      break
    case hour < 24:
      moment = 'evening'
  }

  return (
    <div className="p-8 flex gap-4 text-white items-center">
      {back && (
        <NavLink to="/overview">
          <ArrowLeftIcon className="h-8 w-8" />
        </NavLink>
      )}

      <div className="inline-block flex flex-col gap-2">
        <div className="text-sm">
          Good {moment}
          {isSuccess && ', ' + data.firstName}!
        </div>
        <h1 className="inline-block font-semibold text-2xl">{title}</h1>
      </div>

      <div className="flex-1" />

      {isSuccess && (
        <div className="float-right">
          <NavLink to="/settings" className="">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-sky-900 font-semibold text-white">
              {data.firstName.charAt(0).toUpperCase()}
            </span>
          </NavLink>
        </div>
      )}
    </div>
  )
}
