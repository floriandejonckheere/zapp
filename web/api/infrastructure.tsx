import { client } from '@/client'

import { Device, Home, UpdateDevice } from '@/types'

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

export function updateDevice(
  homeId: number,
  deviceId: number,
  data: UpdateDevice
) {
  return client
    .patch(`/api/homes/${homeId}/devices/${deviceId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then((response): Device => {
      return response.data
    })
}
