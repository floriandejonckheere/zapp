import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const client = axios.create()

if (window.localStorage.getItem('accessToken')) {
  // @ts-ignore
  const accessToken = JSON.parse(window.localStorage.getItem('accessToken'))
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

export const setTokens = (accessToken: string, refreshToken: string) => {
  window.localStorage.setItem('accessToken', JSON.stringify(accessToken))
  window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken))

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  // Trigger event for components using useLocalStorage
  window.dispatchEvent(new Event('storage'))
}

export const clearTokens = () => {
  window.localStorage.removeItem('accessToken')
  window.localStorage.removeItem('refreshToken')

  client.defaults.headers.common.Authorization = null

  // Trigger event for components using useLocalStorage
  window.dispatchEvent(new Event('storage'))
}

// @ts-expect-error type
const refreshAuth = async (failedRequest) => {
  // Refresh access token
  const [accessToken, refreshToken] = await client
    .post('/api/token/refresh/', {
      // @ts-expect-error refresh token should always exist
      refresh: JSON.parse(window.localStorage.getItem('refreshToken'))
    })
    .then((res) => [res.data.access, res.data.refresh])
    .catch(() => {
      // Clear tokens
      clearTokens()

      return Promise.reject()
    })
  // Set the new tokens
  setTokens(accessToken, refreshToken)

  // Set the new token in the failed request
  failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`

  return Promise.resolve()
}

createAuthRefreshInterceptor(client, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true
})
