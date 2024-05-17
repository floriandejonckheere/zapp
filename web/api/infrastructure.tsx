import { client } from '@/client'

import { Home } from '@/types'

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
