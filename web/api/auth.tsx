import axios from 'axios'

export function signin(username: string, password: string) {
  return axios
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
    .then((response) => {
      return response.data
    })
}

export function signup(email: string, username: string, password: string) {
  return axios
    .post(
      `/api/users/`,
      {
        email,
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
    .then((response) => {
      return response.data
    })
}
