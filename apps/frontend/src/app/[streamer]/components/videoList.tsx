'use server'

import VideoCard from '@/components/videoCard'
import { API } from 'libs'

export default async function VideoList({ channelID }: { channelID: string }) {
    // TODO: Error checking
    const { data, error } = await API.api.v1.videos({ channelID: channelID }).get({ query: {} })

    return (
        <div className="flex flex-wrap p-2 justify-center">
            {data!.map((video) => (
                <VideoCard video={video} key={video.id} />
            ))}
        </div>
    )
}
