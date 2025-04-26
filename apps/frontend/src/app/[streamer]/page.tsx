import ChannelHeader from './components/header'
import VideoList from '@/components/videoList'
import { API } from 'libs'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ streamer: string }> }) {
    const { streamer } = await params

    const { data: channel, error: channelError } = await API.api.v1.channel({ member: streamer }).get()
    if (channelError) {
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
            {videos.live.length > 0 && (
                <>
                    <h1 className="text-4xl font-bold mt-2 text-center">Live</h1>
                    <VideoList videos={videos!.live} />
                </>
            )}
            {videos.upcoming.length > 0 && (
                <>
                    <h1 className="text-4xl font-bold mt-2 text-center">Upcoming</h1>
                    <VideoList videos={videos!.upcoming} />
                </>
            )}
            {videos.past.length > 0 && (
                <>
                    <h1 className="text-4xl font-bold mt-2 text-center">Past</h1>
                    <VideoList videos={videos!.past} />
                </>
            )}
            {videos.live.length <= 0 && videos.upcoming.length <= 0 && videos.past.length <= 0 && (
                <div className="flex flex-col min-h-screen justify-center items-center">
                    <h1 className="text-4xl">No videos or streams (yet)!</h1>
                </div>
            )}
        </div>
    )
}
