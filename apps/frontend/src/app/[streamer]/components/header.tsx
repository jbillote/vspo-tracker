'use server'

import { SiTwitch, SiX, SiYoutube } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Link from 'next/link'

type headerProps = {
    name: string,
    id: string,
    photo: string,
    banner: string,
    twitter: string,
    twitch: string | null,
}

export default async function ChannelHeader({ streamer }: { streamer: headerProps }) {
    return (
        <div className="p-2 flex items-center bg-accent">
            <Image
                src={streamer.photo}
                width={800}
                height={800}
                alt={streamer.name}
                className="w-16 h-16 rounded-full"
            />
            <div className="mx-2">
                <div className="font-bold">{streamer.name}</div>
                <div className="w-fit h-fit flex mt-2">
                    <Link href={`https://twitter.com/${streamer.twitter}`}>
                        <SiX className="w-4 h-4" />
                    </Link>
                    <Link href={`https://youtube.com/channel/${streamer.id}`} className="mx-2">
                        <SiYoutube className="w-4 h-4" />
                    </Link>
                    {streamer.twitch ?
                        <Link href={`https://twitch.tv/${streamer.twitch}`}>
                            <SiTwitch className="w-4 h-4" />
                        </Link>
                    : null }
                </div>
            </div>
        </div>
    )
}
