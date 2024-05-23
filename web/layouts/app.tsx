import React, { ReactElement } from 'react'

import Header from '@/layouts/header'
import Footer from '@/layouts/footer'

import HomeSelector from '@/components/home_selector'

export default function App(props: {
  title: string
  component: ReactElement
  footer?: boolean
}): ReactElement {
  const { title, component, footer = true } = props

  return (
    <div className="flex flex-col h-full w-full bg-sky-700">
      <div className="pb-16 md:pb-0 flex-grow overflow-auto scrollbar-hide">
        <Header title={title} back={!footer} />

        <HomeSelector />

        <div className="flex flex-col gap-4 p-6">{component}</div>
      </div>

      {footer && <Footer />}
    </div>
  )
}
