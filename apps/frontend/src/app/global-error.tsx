'use client'

import { useEffect } from 'react'
import './globals.css'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en" className="dark">
      <body>
        <div className="flex flex-col min-h-screen justify-center items-center">
          <h1 className="text-4xl">oops</h1>
          <h1 className="text-2xl">something went wrong</h1>
        </div>
      </body>
    </html>
  )
}
