import { ReactElement, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import { HSStaticMethods } from 'preline'

import Authentication from '@/authentication'
import Auth from '@/layouts/auth'
import Layout from '@/layouts/app'
import PhoneFrame from '@/layouts/phone_frame'

import Signin from '@/pages/auth/signin'
import Signup from '@/pages/auth/signup'

import Overview from '@/pages/overview'
import Schedule from '@/pages/schedule'
import Infrastructure from '@/pages/infrastructure'
import Settings from '@/pages/settings'

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
      <Route element={<PhoneFrame />}>
        <Route path="/" element={<Navigate to="/overview" />} />

        <Route
          element={<Authentication render={!accessToken} path="/overview" />}
        >
          <Route element={<Auth />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>

        <Route
          element={<Authentication render={!!accessToken} path="/signin" />}
        >
          <Route
            path="/overview"
            element={<Layout title="Overview" component={<Overview />} />}
          />
          <Route
            path="/schedule"
            element={<Layout title="Schedule" component={<Schedule />} />}
          />
          <Route
            path="/infrastructure"
            element={
              <Layout title="Infrastructure" component={<Infrastructure />} />
            }
          />
          <Route
            path="/settings"
            element={
              <Layout title="Settings" component={<Settings />} footer={true} />
            }
          />
        </Route>
      </Route>
    </Routes>
  )
}
