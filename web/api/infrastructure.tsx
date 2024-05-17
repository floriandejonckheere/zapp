import { client } from '@/client'

import { Device, Home } from '@/types'

export function getHomes() {
  return client
    .get(`/api/homes`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response): Home[] => {
      return response.data
    })
}

export function getDevices(homeId: number): Device[] {
  return client
    .get(`/api/homes/${homeId}/devices`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.data
    })
}

export function getConstraints(homeId: number, deviceId: number) {
  return client
    .get(`/api/homes/${homeId}/devices/${deviceId}/constraints`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.data
    })
}
