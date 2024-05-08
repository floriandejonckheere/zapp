import { ReactElement } from 'react'

import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'

interface AuthenticationProps {
  render: boolean
  path: string
}

export default function Authentication(
  props: AuthenticationProps
): ReactElement {
  const { render, path = '/signin' } = props

  if (render) {
    return <Outlet />
  }

  return <Navigate to={path} replace />
}
