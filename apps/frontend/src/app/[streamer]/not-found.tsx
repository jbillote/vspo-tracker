'use client'

export const dynamic = 'force-dynamic'

export default function Error() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-4xl">that streamer does not exist</h1>
      <h1 className="text-lg">or at least isn&apos;t supported by this site</h1>
    </div>
  )
}
