import React, { ReactElement } from 'react'

import Header from '@/layouts/header'
import Footer from '@/layouts/footer'

export default function App(props: {
  title: string
  component: ReactElement
}): ReactElement {
  const { title, component } = props

  return (
    <div className="h-full w-full bg-yellow-400">
      <Header title={title} />

      {/* White underlay */}
      <div className="fixed top-96 h-full w-full bg-slate-50"></div>

      <div className="relative h-auto flex flex-col gap-4 p-6">{component}</div>

      <Footer />
    </div>
  )
}
