import { API } from 'libs'
import VideoCard from '@/components/videoCard'

export default async function Home() {
  // TODO: Error checking
  const { data, error } = await API.api.v1.videos.live.get({ query: {} })

  return (
    <div>
      <h1 className="text-4xl font-bold mt-2 text-center">Live and Upcoming</h1>
      <div className="flex flex-wrap p-2 justify-center">
        {data!.map((video) => (
          <VideoCard video={video} key={video.id} />
        ))}
      </div>
    </div>
  )
}
