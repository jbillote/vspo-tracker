import { API } from 'libs'
import { SiTwitch, SiX, SiYoutube } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params }: { params: Promise<{ streamer: string }> }) {
    const { streamer } = await params
    // TODO: Error checking
    const { data, error } = await API.api.channel({ member: streamer }).get()

    return (
        <div>
            <div
                style={{
                    // @ts-expect-error: TailwindCSS property, not built-in to React definitions
                    '--image-url': `url(${data?.banner + '=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'})`
                }}
                className="h-[calc(100vw/6.2-1px)] bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
            >
            </div>
            <div className="p-2 flex items-center">
                <Image
                    src={data?.photo!}
                    width={800}
                    height={800}
                    alt={data?.name!}
                    className="w-16 h-16 rounded-full"
                />
                <div className="mx-2">
                    <div className="font-bold">{data?.name!}</div>
                    <div className="w-fit h-fit flex mt-2">
                        <Link href={`https://twitter.com/${data?.twitter!}`}>
                            <SiX className="w-4 h-4" />
                        </Link>
                        <Link href={`https://youtube.com/channel/${data?.id!}`} className="mx-2">
                            <SiYoutube className="w-4 h-4" />
                        </Link>
                        {data?.twitch ?
                            <Link href={`https://twitch.tv/${data.twitch}`}>
                                <SiTwitch className="w-4 h-4" />
                            </Link>
                        : null }
                    </div>
                </div>
            </div>
        </div>
    )
}
