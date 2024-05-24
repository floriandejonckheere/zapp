import { client } from '@/client'

import { Schedule } from '@/types'

export function getSchedules(homeId: number, date: string) {
  return client
    .get(`/api/homes/${homeId}/schedules/${date}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response): Schedule[] => {
      return response.data
    })
}

export function getPrediction(homeId: number, date: string) {
  return client
    .get(`/api/homes/${homeId}/predictions/${date}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.data
    })
}
