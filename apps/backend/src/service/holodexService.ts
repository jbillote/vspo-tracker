import { env } from 'bun'
import { type Logger } from 'pino'
import { type Channel } from '../models/channel'

class HolodexService {
  private logger: Logger
  private apiKey: string

  public constructor(logger: Logger) {
    this.logger = logger
    this.apiKey = env.HOLODEX_API_KEY!
  }

  public async getChannelInformation(name: string): Promise<Channel> {
    const youtubeID = await this.getYouTubeID(name)

    const url = `https://holodex.net/api/v2/channels/${youtubeID}`
    this.logger.info(`Fetching channel information for member ${name}`)
    const resp: Response = await fetch(url, {
      headers: {
        'x-apikey': this.apiKey,
      },
    })
    const respJson = await resp.json()

    return {
      id: respJson.id,
      name: respJson.name,
      photo: respJson.photo,
      banner: respJson.banner,
      twitter: respJson.twitter,
      twitch: respJson.twitch,
    }
  }

  private async getYouTubeID(name: string): Promise<string> {
    const streamers = await Bun.file('./channels.json').json()
    return streamers.streamers
      .find((member: any) => member.name.toLowerCase() === decodeURIComponent(name.toLowerCase()))
      .youtube.toString()
  }
}

export { HolodexService }
