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
}

export default async function VideoCard({ video }: { video: videoCardProps }) {
    const scheduledStart = video.scheduledStart ? DateTime.fromISO(video.scheduledStart) : null

    return (
        <div className="m-1 bg-accent rounded-md inline-block">
            <Link href={`https://youtube.com/watch?v=${video.id}`}>
                <div
                    style={{
                        // @ts-expect-error: TailwindCSS property, not built-in to React definitions
                        '--image-url': `url(${video.thumbnail})`
                    }}
                    className="w-64 h-36 rounded-md bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
                >
                    {video.membersOnly ?
                        <div className="bg-black w-fit p-1 text-xs">
                            {video.membersOnly ? 'Members Only' : null}
                        </div>
                        : null}
                </div>
            </Link>
            <div className="my-2 mx-2">
                <Link href={`https://youtube.com/watch?v=${video.id}`}>
                    <span className="inline-block max-w-64 font-bold text-sm line-clamp-2 truncate">
                        {video.title}
                    </span>
                    <div className="max-w-64 text-sm">
                        {scheduledStart?.toRelative()}
                    </div>
                </Link>
            </div>
        </div>
    )
}
