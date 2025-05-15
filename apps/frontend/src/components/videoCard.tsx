'use server'

import { DateTime } from 'luxon'
import Link from 'next/link'

type videoCardProps = {
    id: string,
    title: string,
    type: string,
    membersOnly: boolean,
    publishedAt: string,
    availableAt: string,
    scheduledStart?: string,
    duration: number,
    status: string,
    thumbnail: string,
    streamer?: {
        id: string,
        name: string,
    },
}

export default async function VideoCard({ video }: { video: videoCardProps }) {
    const scheduledStart = video.scheduledStart ? DateTime.fromISO(video.scheduledStart) : null

    return (
        <div className="m-1 bg-accent hover:bg-neutral-700 rounded-md inline-block relative">
            <div
                style={{
                    // @ts-expect-error: TailwindCSS property, not built-in to React definitions
                    '--image-url': `url(${video.thumbnail})`
                }}
                className="w-68 h-36 rounded-md bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
            >
                {video.status === 'live' && (
                    <div className="bg-red-500 w-fit p-1 text-xs font-bold">LIVE!</div>
                )}
                {video.membersOnly && (
                    <div className="bg-black w-fit p-1 text-xs">Members Only</div>
                )}
            </div>
            <div className="my-2 mx-2">
                <span className="inline-block max-w-64 font-bold text-sm line-clamp-2 truncate">
                    {video.title}
                </span>
                {video.streamer && (
                    <div className="text-sm hover:text-sky-300 w-fit">
                        <Link href={`https://youtube.com/channel/${video.streamer.id}`} className="relative z-10 w-fit">
                            {video.streamer.name}
                        </Link>
                    </div>
                )}
                <div className="max-w-64 text-sm">
                    {(video.status === 'live' ? 'Started ' : '') + scheduledStart?.toRelative()}
                </div>
            </div>
            <Link href={`https://youtube.com/watch?v=${video.id}`} className="absolute inset-0" />
        </div>
    )
}
