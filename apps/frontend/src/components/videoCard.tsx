import Image from 'next/image'
import Link from 'next/link'

type videoCardProps = {
    id: string,
    title: string,
    type: string,
    membersOnly: boolean,
    publishedAt: Date,
    availableAt: Date,
    scheduledStart?: Date,
    duration: number,
    status: string,
    thumbnail: string,
}

export default function VideoCard({ video }: { video: videoCardProps }) {
    return (
        <div className="p-2 m-1 bg-accent rounded-md">
            <Link href={`https://youtube.com/watch?v=${video.id}`}>
                <Image
                    src={video.thumbnail}
                    width={1280}
                    height={720}
                    alt={video.title}
                    className="w-64"
                />
            </Link>
            <Link href={`https://youtube.com/watch?v=${video.id}`}>
                <div className="inline-block max-w-64 text-sm line-clamp-1">
                    {video.title}
                </div>
            </Link>
        </div>
    )
}
