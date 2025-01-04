import { DateTime } from 'luxon'
import { google } from "googleapis"

class YouTube {
    private apiKey: string

    public constructor(apiKey: string) {
        this.apiKey = apiKey
    }
    
    public async getVideos(streamerId: string, date: DateTime): Promise<{[x:string]: any}[]> {
        const resp = await google.youtube('v3').search.list({
            key: this.apiKey,
            part: 'snippet',
            channelId: streamerId,
            type: 'video',
            order: 'date',
            maxResults: 50,
            publishedAfter: date.toISO(),
            publishedBefore: date.plus({ day: 1 }).toISO()
        })

        return resp['data']['items']
    }
}

export { YouTube }
