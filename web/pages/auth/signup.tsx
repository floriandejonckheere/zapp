import { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { BoltIcon } from '@heroicons/react/24/solid'

import Spinner from '../../components/spinner'

import { signup } from '../../api/auth'

export default function Signup(): ReactElement {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return signup(email, username, password)
    },
    onSuccess: () => {
      window.location.href = '/signin'
    }
  })

  return (
    <div className="mt-7 bg-white rounded-lg shadow p-4 sm:p-7 dark:bg-slate-700">
      <div className="text-center">
        <div className="inline-flex items-center gap-x-4 text-2xl font-bold dark:text-white">
          <BoltIcon className="h-10 w-10 p-2.5 bg-sky-700 text-white rounded-full" />
          Wattson
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link
            to="/signin"
            className="ml-1 text-sky-700 decoration-2 hover:underline font-medium dark:text-sky-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-5">
        {/* @ts-expect-error - mutation is not a real form handler */}
        <form onSubmit={mutation.mutate}>
          <div className="grid gap-y-4">
            {mutation.isError && (
              <p className="text-sm text-red-600 font-bold">
                Error:{' '}
                {axios.isAxiosError(mutation.error)
                  ? mutation.error.response?.data.detail
                  : mutation.error.message}
              </p>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm mb-2 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-2 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Spinner color="text-white" /> : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
