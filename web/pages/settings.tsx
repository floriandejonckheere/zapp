import { ReactElement } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function Settings(): ReactElement {
  const [, setAccessToken] = useLocalStorage('accessToken', null)
  const [, setRefreshToken] = useLocalStorage('refreshToken', null)

  const handleSignout = () => {
    setAccessToken(null)
    setRefreshToken(null)
  }

  return (
    <>
      <button
        onClick={handleSignout}
        className="w-full p-4 bg-sky-800 rounded-2xl shadow-md text-center text-white"
      >
        Sign out
      </button>
    </>
  )
}
