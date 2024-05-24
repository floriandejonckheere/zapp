import React, { ReactElement } from 'react'
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
      <div className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col">
        <div className="mb-6 text-sm font-medium">My account</div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center">
            <div className="flex flex-col">First name</div>
            <div className="flex-1" />
            <input
              type="checkbox"
              className="relative w-11 h-6 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-sky-700 checked:border-sky-700 focus:checked:border-sky-700 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSignout}
        className="w-full p-4 bg-sky-900 hover:bg-sky-800 transition-all rounded-2xl shadow-md text-center text-white"
      >
        Sign out
      </button>
    </>
  )
}
