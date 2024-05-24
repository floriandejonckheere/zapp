import React, { ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useHome } from '@/contexts/home'

import Consumer from '@/components/home/consumer'
import Producer from '@/components/home/producer'
import Storage from '@/components/home/storage'
import Grid from '@/components/home/grid'

import { getDevices, updateDevice } from '@/api/infrastructure'

export default function Home(): ReactElement {
  const { home } = useHome()

  const { isSuccess, data } = useQuery({
    queryKey: ['devices', home?.id],
    // @ts-expect-error error
    queryFn: () => getDevices(home.id),
    enabled: !!home
  })

  if (!home) return <div>Loading...</div>

  return (
    <>
      {isSuccess &&
        data.map((device) => (
          <div
            key={device.id}
            className="w-full p-6 bg-white rounded-2xl shadow-md flex flex-col gap-3"
          >
            {device.deviceType === 'CO' && (
              <Consumer
                device={device}
                onUpdate={(data) => updateDevice(home.id, device.id, data)}
              />
            )}
            {device.deviceType === 'PR' && (
              <Producer
                device={device}
                onUpdate={(data) => updateDevice(home.id, device.id, data)}
              />
            )}
            {device.deviceType === 'ST' && (
              <Storage
                device={device}
                onUpdate={(data) => updateDevice(home.id, device.id, data)}
              />
            )}
            {device.deviceType === 'GR' && (
              <Grid
                device={device}
                onUpdate={(data) => updateDevice(home.id, device.id, data)}
              />
            )}
          </div>
        ))}
    </>
  )
}
