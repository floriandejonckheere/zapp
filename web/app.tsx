import { ReactElement, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import { HSStaticMethods } from 'preline'

import Authentication from './authentication'

import AppLayout from './layouts/app'
import Auth from './layouts/auth'
import Dashboard from './layouts/dashboard'
import Navigation from './layouts/navigation'

import Overview from './pages/overview'
import Settings from './pages/settings'

import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'

import AppOverview from './pages/app/overview'
import AppSchedule from './pages/app/schedule'
import AppSettings from './pages/app/settings'

export default function App(): ReactElement {
  const [accessToken] = useLocalStorage('accessToken', null)
  const location = useLocation()

  useEffect(() => {
    import('preline/preline')
  }, [])

  useEffect(() => {
    HSStaticMethods.autoInit()
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overview" />} />

      <Route
        element={<Authentication render={!accessToken} path="/overview" />}
      >
        <Route element={<Auth />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>

      <Route element={<Authentication render={!!accessToken} path="/signin" />}>
        <Route element={<Navigation />}>
          <Route element={<Dashboard />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/app/overview" element={<AppOverview />} />
          <Route path="/app/schedule" element={<AppSchedule />} />
          <Route path="/app/settings" element={<AppSettings />} />
        </Route>
      </Route>
    </Routes>
  )
}
