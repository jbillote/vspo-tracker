import { google } from "googleapis"
import { YouTubeVideo } from "../models/youtubeVideo"

class YouTube {
    private apiKey: string

    public constructor(apiKey: string) {
        this.apiKey = apiKey
    }
    
    public async getVideos(streamerId: string): Promise<YouTubeVideo[]> {
        let videos: YouTubeVideo[] = []
        
        let resp = await google.youtube('v3').search.list({
            key: this.apiKey,
            part: 'snippet',
            channelId: streamerId,
            type: 'video',
            eventType: 'completed', 
            order: 'date'
        })

        resp['data']['items'].forEach(video => {
            videos.push({
                title: video['snippet']['title'],
                published: video['snippet']['publishedAt'],
                id: video['id']['videoId']
            })
        })

        return videos
    }
}

export { YouTube }
