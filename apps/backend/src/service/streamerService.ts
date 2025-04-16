import { type Logger } from 'pino'

class StreamerService {
  private logger: Logger

  public constructor(logger: Logger) {
    this.logger = logger.child({ component: 'streamerService' })
  }

  public async getStreamerNames(): Promise<{
    'VSPO!': {
      JP: string[]
      EN: string[]
    }
  }> {
    this.logger.info('Fetching streamers from JSON configuration')
    const streamerConfig = await Bun.file('./channels.json').json()

    const jp: string[] = []
    const en: string[] = []

    streamerConfig.streamers.forEach((streamer: any) => {
      if (streamer.branch === 'JP') {
        jp.push(streamer.name)
      } else if (streamer.branch === 'EN') {
        en.push(streamer.name)
      }
    })

    return {
      'VSPO!': {
        JP: jp,
        EN: en,
      },
    }
  }
}

export { StreamerService }
