import { API } from 'libs'
import Image from 'next/image'

export default async function Page({ params }: { params: Promise<{ streamer: string }> }) {
    const { streamer } = await params
    // TODO: Error checking
    const { data, error } = await API.api.channel({ member: streamer }).get()

    return (
        <div className="h-[calc(100vw/6.2-1px)]">
            <Image
                src={data?.banner! + '=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'}
                width={1707}
                height={282}
                alt={data?.name!}
                className="w-full max-h-fit bg-cover"
            />
        </div>
    )
}
