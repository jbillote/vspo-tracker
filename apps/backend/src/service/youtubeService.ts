import { env } from "bun"
import { DateTime } from "luxon"
import { YouTubeVideo, Status } from "../models/youtubeVideo"
import { YouTube } from "../network/youtube"

class YouTubeService {
    static async getVideos(streamerName: string, date: DateTime): Promise<YouTubeVideo[]> {
        const client: YouTube = new YouTube(env.GOOGLE_API_KEY as string)
        const streamerId: string = await this.getStreamerId(streamerName)

        const videosResp: {[x:string]: any}[] = await client.getVideos(streamerId, date)

        let videos: YouTubeVideo[] = []

        videosResp.forEach((video: {[x:string]: any}) => {
            videos.push({
                title: video['snippet']['title'],
                published: video['snippet']['publishedAt'],
                id: video['id']['videoId'],
                status: this.getVideoStatus(video['snippet']['liveBroadcastContent'])
            })
        })

        return videos
    }

    private static async getStreamerId(streamerName: string): Promise<string> {
        const streamers = await Bun.file('./channels.json').json()
        return streamers['streamers'].find((member: any) => member['name'].toLowerCase() === streamerName)['youtube'].toString()
    }

    private static getVideoStatus(status: string): Status {
        switch(status) {
            case 'none':
                return Status.Completed
            case 'live':
                return Status.Live
            case 'upcoming':
                return Status.Upcoming
            default:
                return Status.Unknown
        }
    }
}

export { YouTubeService }
