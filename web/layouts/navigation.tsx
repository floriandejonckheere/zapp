import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { ReactElement } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { BoltIcon } from '@heroicons/react/24/solid'

import { me } from '@/api/users'
import { signout } from '@/api/auth'

import DarkModeToggle from '@/components/dark_mode_toggle'
import Spinner from '@/components/spinner'

export default function Navigation(): ReactElement {
  const { isSuccess, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  const [, setAccessToken] = useLocalStorage('accessToken', null)
  const [, setRefreshToken] = useLocalStorage('refreshToken', null)

  const mutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return signout()
    },
    onSuccess: () => {
      setAccessToken(null)
      setRefreshToken(null)
    },
    onError: () => {
      setAccessToken(null)
      setRefreshToken(null)
    }
  })

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap bg-white text-sm border-b border-gray-200 dark:bg-slate-900 dark:border-slate-900 transition-all duration-500">
        <nav className="w-full px-16 py-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-x-6 text-3xl font-bold dark:text-slate-200 dark:hover:text-slate-100"
            >
              <BoltIcon className="h-12 w-12 p-2.5 bg-sky-700 text-white rounded-full" />
              Zapp
            </Link>
          </div>
          <div
            id="navbar-image-and-text-1"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-10 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              {isSuccess && (
                <>
                  <Link
                    to="/settings"
                    className="flex items-center justify-between gap-4 font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 font-semibold text-white leading-none dark:bg-slate-200 dark:text-gray-800">
                      {data.firstName.charAt(0).toUpperCase()}
                    </span>
                    <div className="flex flex-col">
                      <span>
                        {data.firstName} {data.lastName}
                      </span>
                      <span className="text-gray-400 dark:text-slate-500">
                        {data.email}
                      </span>
                    </div>
                  </Link>
                </>
              )}
              <DarkModeToggle />

              {/* @ts-expect-error - mutation is not a real form handler */}
              <form onSubmit={mutation.mutate}>
                <button
                  type="submit"
                  className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-sky-700 sm:border-s sm:border-gray-300 sm:my-6 sm:ps-6 dark:border-gray-700 dark:text-slate-300 dark:hover:text-blue-500"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <Spinner color="text-white" />
                  ) : (
                    'Sign out'
                  )}
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}
