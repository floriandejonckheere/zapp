import { ReactElement, useEffect, useState } from 'react'
import Spinner from '../components/spinner'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from '@uidotdev/usehooks'

import { updateUser, updatePassword, deleteUser, me } from '@/api/users'

export default function Settings(): ReactElement {
  const [id, setId] = useState<number>(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const [, setAccessToken] = useLocalStorage('accessToken', null)
  const [, setRefreshToken] = useLocalStorage('refreshToken', null)

  const { isPending, isError, data } = useQuery({
    queryKey: ['me'],
    queryFn: me
  })

  useEffect(() => {
    if (data) {
      setId(data.id)
      setFirstName(data.firstName)
      setLastName(data.lastName)
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return updateUser(id, firstName, lastName)
    },
    onSuccess: () => {
      window.location.href = '/overview'
    }
  })

  const updatePasswordMutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return updatePassword(id, password)
    },
    onSuccess: () => {
      window.location.href = '/overview'
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: (event: Event) => {
      event.preventDefault()
      return deleteUser(id)
    },
    onSuccess: () => {
      setAccessToken(null)
      setRefreshToken(null)
    }
  })

  return (
    <>
      <h2 className="text-xl font-bold dark:text-slate-300 mb-8">Settings</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Account
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Update your account details
            </p>
          </div>

          {/* @ts-expect-error - mutation is not a real form handler */}
          <form onSubmit={updateUserMutation.mutate}>
            <div className="grid gap-y-4">
              {updateUserMutation.isError && (
                <p className="text-sm text-red-600 font-bold">
                  Error:{' '}
                  {axios.isAxiosError(updateUserMutation.error)
                    ? updateUserMutation.error.response?.data.detail
                    : updateUserMutation.error.message}
                </p>
              )}

              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm mb-2 dark:text-white"
                >
                  First name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  required
                  defaultValue={data?.firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  defaultValue={data?.lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? (
                  <Spinner color="text-white" />
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Password
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Update your account password
            </p>
          </div>

          {/* @ts-expect-error - mutation is not a real form handler */}
          <form onSubmit={updatePasswordMutation.mutate}>
            <div className="grid gap-y-4">
              {updatePasswordMutation.isError && (
                <p className="text-sm text-red-600 font-bold">
                  Error:{' '}
                  {axios.isAxiosError(updatePasswordMutation.error)
                    ? updatePasswordMutation.error.response?.data.detail
                    : updatePasswordMutation.error.message}
                </p>
              )}

              <div>
                <label
                  htmlFor="new_password"
                  className="block text-sm mb-2 dark:text-white"
                >
                  New password
                </label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-700 text-white hover:bg-sky-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending ? (
                  <Spinner color="text-white" />
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Delete
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Delete your account
            </p>
            <p className="font-bold text-sm text-red-600 dark:text-red-400">
              WARNING: This action will irreversibly delete your account and all
              associated data!
            </p>
          </div>

          {/* @ts-expect-error - mutation is not a real form handler */}
          <form onSubmit={deleteUserMutation.mutate}>
            <div className="grid gap-y-4">
              {deleteUserMutation.isError && (
                <p className="text-sm text-red-600 font-bold">
                  Error:{' '}
                  {axios.isAxiosError(deleteUserMutation.error)
                    ? deleteUserMutation.error.response?.data.detail
                    : deleteUserMutation.error.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-700 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-red-800 dark:text-white hover:dark:bg-red-900  "
                disabled={deleteUserMutation.isPending || isPending || isError}
              >
                {deleteUserMutation.isPending || isPending || isError ? (
                  <Spinner color="text-white" />
                ) : (
                  'Delete account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
