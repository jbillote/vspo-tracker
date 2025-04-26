'use client'

import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-4xl">that streamer does not exist</h1>
      <h1 className="text-lg">or at least isn't supported by this site</h1>
    </div>
  )
}
