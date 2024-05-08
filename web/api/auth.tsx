import axios from 'axios'

export function signin(username: string, password: string) {
  return axios
    .post(
      `/api/users/token`,
      new URLSearchParams({
        username,
        password,
        grant_type: '',
        scope: '',
        client_id: '',
        client_secret: ''
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        }
      }
    )
    .then((response) => {
      return response.data
    })
}

export function signup(email: string, username: string, password: string) {
  return axios
    .post(
      `/api/users/register`,
      new URLSearchParams({
        email,
        username,
        password
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        }
      }
    )
    .then((response) => {
      return response.data
    })
}
