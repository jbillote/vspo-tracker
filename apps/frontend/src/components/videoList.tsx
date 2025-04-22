'use server'

import VideoCard from '@/components/videoCard'
import { DateTime } from 'luxon'

type videoListProps = {
    id: string,
    title: string,
    type: string,
    membersOnly: boolean,
    publishedAt: string,
    availableAt: string,
    scheduledStart?: string,
    duration: number,
    status: string,
    thumbnail: string
}

export default async function VideoList({ videos }: { videos: videoListProps[] }) {
    return (
        <div className="flex flex-wrap p-2 justify-center">
            {videos.map((video) => (
                video.scheduledStart && DateTime.fromISO(video.scheduledStart).diffNow('days').days < 2 &&
                <VideoCard video={video} key={video.id} />
            ))}
        </div>
    )
}
