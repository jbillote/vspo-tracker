import ChannelHeader from './components/header'
import VideoList from '@/components/videoList'
import { API } from 'libs'

export default async function Page({ params }: { params: Promise<{ streamer: string }> }) {
    const { streamer } = await params
    // TODO: Error checking
    const { data: channel, error: channelError } = await API.api.v1.channel({ member: streamer }).get()
    const { data: videos, error: videosError } = await API.api.v1.videos({ channelID: channel!.id }).get({ query: {} })

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
