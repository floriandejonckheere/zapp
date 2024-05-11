import axios, { AxiosError } from 'axios'

import { Home } from '@/types'

export function getHomes() {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    throw new AxiosError('Unauthorized')
  }

  return axios
    .get(`/api/homes`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response): Home[] => {
      return response.data
    })
}
