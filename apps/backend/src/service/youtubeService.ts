import { env } from "bun"
import { YouTubeVideo } from "../models/youtubeVideo"
import { YouTube } from "../network/youtube"

class YouTubeService {
    static async getYouTubeID(streamer: string): Promise<string> {
        const streamersList = await this.streamers()
        return streamersList['streamers'].find((member: any) => member['name'].toLowerCase() === streamer)['youtube'].toString()
    }

    static async getVideos(streamer: string): Promise<YouTubeVideo[]> {
        const client: YouTube = new YouTube(env.GOOGLE_API_KEY as string)
        const streamersList = await this.streamers()
        const streamerId = streamersList['streamers'].find((member: any) => member['name'].toLowerCase() === streamer)['youtube'].toString()

        return await client.getVideos(streamerId)
    }

    private static async streamers() {
        return await Bun.file('./channels.json').json()
    }
}

export { YouTubeService }
