import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
// @ts-expect-error - including @types/react-dom gives a lot of errors
import { createRoot } from 'react-dom/client'

import 'preline'

import './main.css'

import App from './app'

import { ThemeProvider } from './contexts/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false
    }
  },
  queryCache: new QueryCache({
    // @ts-expect-error - axios error type is not compatible with react-query
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/signin'
      }
    }
  })
})

const Main = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<Main />)
