import { client } from '@/client'

import { Constraint, Device, Home } from '@/types'

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

export function getDevices(homeId: number) {
  return client
    .get(`/api/homes/${homeId}/devices`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response): Device[] => {
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
    .then((response): Constraint[] => {
      return response.data
    })
}
