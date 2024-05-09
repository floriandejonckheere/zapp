import axios, { AxiosError } from 'axios'

import { User } from '@/types'

export function me() {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new AxiosError('Unauthorized')
  }

  return axios
    .get(`/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response): User => {
      return response.data
    })
}

export function updateUser(id: number, firstName: string, lastName: string) {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new AxiosError('Unauthorized')
  }

  return axios
    .patch(
      `/api/users/${id}`,
      {
        firstName,
        lastName
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }
    )
    .then((response): User => {
      return response.data
    })
}

export function updatePassword(id: number, password: string) {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new AxiosError('Unauthorized')
  }

  return axios
    .patch(
      `/api/users/${id}`,
      {
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }
    )
    .then((response): User => {
      return response.data
    })
}
