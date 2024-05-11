import { client } from '@/client'

import { User } from '@/types'

export function me() {
  return client
    .get(`/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response): User => {
      return response.data
    })
}

export function updateUser(id: number, firstName: string, lastName: string) {
  return client
    .patch(
      `/api/users/${id}`,
      {
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
    .then((response): User => {
      return response.data
    })
}

export function updatePassword(id: number, password: string) {
  return client
    .patch(
      `/api/users/${id}`,
      {
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    .then((response): User => {
      return response.data
    })
}

export function deleteUser(id: number) {
  return client
    .delete(`/api/users/${id}`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.data
    })
}
