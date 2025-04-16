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
    streamerConfig['VSPO!'].JP.forEach((streamer: any) => {
      jp.push(streamer.name)
    })

    const en: string[] = []
    streamerConfig['VSPO!'].EN.forEach((streamer: any) => {
      en.push(streamer.name)
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
