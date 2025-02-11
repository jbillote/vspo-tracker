import { env } from "bun"
import { DateTime } from "luxon"
import { PrismaClient } from "@prisma/client"
import { YouTubeVideo } from "../models/youtubeVideo"
import { YouTube } from "../network/youtube"
import { Logger } from "@bogeychan/elysia-logger/dist/types"

class YouTubeService {
    private logger: Logger

    public constructor(logger: Logger) {
        this.logger = logger
    }

    public async getVideos(streamerName: string, date: DateTime): Promise<YouTubeVideo[]> {
        const streamerId: string = await this.getStreamerId(streamerName)
        let videos: YouTubeVideo[] = await this.getVideosFromCache(streamerId, date)

        if (videos.length > 0) {
            this.logger.info('cache hit')
            return videos
        }

        const client: YouTube = new YouTube(env.GOOGLE_API_KEY as string)

        const videosResp: {[x:string]: any}[] = await client.getVideos(streamerId, date)

        videosResp.forEach((video: {[x:string]: any}) => {
            videos.push({
                id: video['id']['videoId'],
                member: streamerId,
                title: video['snippet']['title'],
                date: video['snippet']['publishedAt'],
                status: this.getVideoStatus(video['snippet']['liveBroadcastContent']),
                thumbnail: video['snippet']['thumbnails']['high']['url']
            })
        })

        this.cacheVideos(streamerId, videos)

        return videos
    }

    private async getVideosFromCache(member: string, date: DateTime): Promise<YouTubeVideo[]> {
        const prisma = new PrismaClient()
        let videos: YouTubeVideo[] = []

        videos = await prisma.youTubeVideo.findMany({
            where: {
                AND: {
                    member: {
                        equals: member
                    },
                    date: {
                        gte: date.toJSDate(),
                        lte: date.plus({ day: 1 }).toJSDate()
                    }
                }
            }
        })
        
        return videos
    }

    private async cacheVideos(member: string, videos: YouTubeVideo[]) {
        const prisma = new PrismaClient()

        videos.forEach(async (video: YouTubeVideo) => {
            await prisma.youTubeVideo.create({
                data: {
                    id: video.id,
                    member: member,
                    title: video.title,
                    date: video.date,
                    status: video.status,
                    thumbnail: video.thumbnail
                }
            })
        })
    }

    private async getStreamerId(streamerName: string): Promise<string> {
        const streamers = await Bun.file('./channels.json').json()
        return streamers['streamers'].find((member: any) => member['name'].toLowerCase() === streamerName)['youtube'].toString()
    }

    private getVideoStatus(status: string): string {
        switch(status) {
            case 'none':
                return 'completed'
            case 'live':
            case 'upcoming':
                return status
            default:
                return 'unknown'
        }
    }
}

export { YouTubeService }
