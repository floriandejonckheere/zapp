import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { me } from '@/api/users'

export default function Header(props: { title: string }): ReactElement {
  const { title } = props

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
    <div className="p-8 flex justify-between items-center">
      <div className="inline-block flex flex-col gap-2 text-white">
        <div className="text-sm">
          Good {moment}
          {isSuccess && ', ' + data.firstName}!
        </div>
        <h1 className="inline-block font-semibold text-white text-2xl">
          {title}
        </h1>
      </div>
      {isSuccess && (
        <div className="float-right">
          <NavLink to="/settings" className="">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-600 font-semibold text-white">
              {data.firstName.charAt(0).toUpperCase()}
            </span>
          </NavLink>
        </div>
      )}
    </div>
  )
}
