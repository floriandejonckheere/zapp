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
      <div className="w-full p-6 bg-white rounded-2xl shadow-md">
        Hello, world!
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
      </div>

      <div className="w-full p-6 bg-white rounded-2xl shadow-md">
        Hello, world!
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
        <p>This is a paragraph</p>
      </div>

      <button
        onClick={handleSignout}
        className="w-full p-4 bg-sky-700 rounded-2xl shadow-md text-center text-white"
      >
        Sign out
      </button>
    </>
  )
}
