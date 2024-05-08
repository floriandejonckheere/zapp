import axios, { AxiosError } from 'axios'

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
    .then((response) => {
      return response.data
    })
}
