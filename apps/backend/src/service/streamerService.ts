import { Streamer } from '../models/streamer'
import { Logger } from 'pino'

class StreamerService {
    private logger: Logger

    public constructor(logger: Logger) {
        this.logger = logger.child({ component: 'streamerService' })
    }

    public async getStreamerNames(): Promise<string[]> {
        this.logger.info('Fetching streamers from JSON configuration')
        const streamerConfig = await Bun.file('./channels.json').json()
        let names: string[] = []
        
        streamerConfig['streamers'].forEach((streamer: any) => {
            names.push(streamer['name'])
        })

        return names
    }
}

export { StreamerService }
