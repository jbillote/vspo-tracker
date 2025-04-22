'use server'

import VideoCard from '@/components/videoCard'
import { API } from 'libs'
import { DateTime } from 'luxon'

export default async function VideoList({ channelID }: { channelID: string }) {
    // TODO: Error checking
    const { data, error } = await API.api.v1.videos({ channelID: channelID }).get({ query: {} })

    return (
        <div className="flex flex-wrap p-2 justify-center">
            {data!.map((video) => (
                video.scheduledStart && DateTime.fromISO(video.scheduledStart).diffNow('days').days < 2 &&
                <VideoCard video={video} key={video.id} />
            ))}
        </div>
    )
}
