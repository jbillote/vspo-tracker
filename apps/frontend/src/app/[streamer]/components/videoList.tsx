'use server'

import { API } from 'libs'
import Image from 'next/image'
import Link from 'next/link'

export default async function VideoList({ channelID }: { channelID: string }) {
    // TODO: Error checking
    const { data, error } = await API.api.v1.videos({ channelID: channelID }).get({query: {}})

    return (
        <div className="flex flex-wrap p-2 justify-center">
            {data!.map((video) => (
                <div className="p-2 m-1 bg-accent" key={video.id}>
                    <Link href={`https://youtube.com/watch?v=${video.id}`} >
                        <Image
                            src={video.thumbnail}
                            width={1280}
                            height={720}
                            alt={video.title}
                            className="w-64"
                        />
                    </Link>
                    <Link href={`https://youtube.com/watch?v=${video.id}`} >
                        <span className="inline-block max-w-64 text-sm line-clamp-2">
                            {video.title}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    )
}
