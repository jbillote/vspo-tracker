'use client'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-4xl">something went wrong</h1>
      <h1 className="text-lg">request id: {error.message}</h1>
    </div>
  )
}
