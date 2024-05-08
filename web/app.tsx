import { ReactElement, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function App(): ReactElement {
  const [token] = useLocalStorage('token', null)
  const location = useLocation()

  useEffect(() => {
    import('preline/preline')
  }, [])

  useEffect(() => {
    // @ts-expect-error - copied from preline's framework guide
    HSStaticMethods.autoInit()
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<div>Hello, world!</div>} />
    </Routes>
  )
}
