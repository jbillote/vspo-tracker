import { API } from 'libs'
import VideoList from '@/components/videoList'

export default async function Home() {
  const { data, error } = await API.api.v1.videos.live.get({ query: {} })
  if (error) {
    throw new Error(error.value.message)
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mt-2 text-center">Live</h1>
      <div className="flex flex-wrap p-2 justify-center">
        <VideoList videos={data!.live} />
      </div>
      <h1 className="text-4xl font-bold mt-2 text-center">Upcoming</h1>
      <div className="flex flex-wrap p-2 justify-center">
        <VideoList videos={data!.upcoming} />
      </div>
    </div>
  )
}
