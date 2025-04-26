import ChannelHeader from './components/header'
import VideoList from '@/components/videoList'
import { API } from 'libs'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ streamer: string }> }) {
    const { streamer } = await params

    const { data: channel, error: channelError } = await API.api.v1.channel({ member: streamer }).get()
    if (channelError) {
        console.log(channelError.status)
        if (channelError.status === 404) {
            notFound()
        } else {
            throw new Error(channelError.value.message)
        }
    }

    const { data: videos, error: videosError } = await API.api.v1.videos({ channelID: channel!.id }).get({ query: {} })
    if (videosError) {
        throw new Error(videosError.value.message)
    }

    return (
        <div>
            <div
                style={{
                    // @ts-expect-error: TailwindCSS property, not built-in to React definitions
                    '--image-url': `url(${channel?.banner + '=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'})`
                }}
                className="h-[calc(100vw/6.2-1px)] bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
            >
            </div>
            <ChannelHeader streamer={channel!} />
            <VideoList videos={videos!} />
        </div>
    )
}
