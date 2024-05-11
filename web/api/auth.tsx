import { client } from '@/client'
import { Token } from '@/types'

export function signin(username: string, password: string) {
  return client
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
  return client
    .delete(`/api/token/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.data
    })
}

export function signup(
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  return client
    .post(
      `/api/users`,
      {
        email,
        username,
        password,
        firstName,
        lastName
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
