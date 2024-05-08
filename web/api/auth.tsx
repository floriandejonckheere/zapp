import axios, { AxiosError } from 'axios'

import { Token, User } from '@/types'

export function signin(username: string, password: string) {
  return axios
    .post(
      `/api/token/`,
      {
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then((response): Token => {
      return response.data
    })
}

export function signout() {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new AxiosError('Unauthorized')
  }

  return axios
    .delete(`/api/token/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      return response.data
    })
}

export function signup(email: string, username: string, password: string) {
  return axios
    .post(
      `/api/users/`,
      {
        email,
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then((response): Token => {
      return response.data
    })
}
