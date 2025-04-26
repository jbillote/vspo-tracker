import { env } from 'bun'
import { NotFoundError } from 'elysia'
import { DateTime } from 'luxon'
import { type Logger } from 'pino'
import { type Channel } from '../models/channel'
import { type Video } from '../models/video'

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

  public async getVideos(channelId: string): Promise<{
    live: Video[],
    upcoming: Video[],
    past: Video[],
  }> {
    const url = `https://holodex.net/api/v2/channels/${channelId}/videos?include=live_info`
    this.logger.info(`Fetching videos for member with ID ${channelId}`)
    const resp: Response = await fetch(url, {
      headers: {
        'x-apikey': this.apiKey,
      },
    })
    const respJson = await resp.json()

    const live: Video[] = []
    const upcoming: Video[] = []
    const past: Video[] = []

    respJson.forEach((video: any) => {
      if (video.topic_id !== 'FreeChat') {
        const v: Video = {
          id: video.id,
          title: video.title,
          type: video.type,
          membersOnly: video.topic_id === 'membersonly',
          publishedAt: video.published_at,
          availableAt: video.available_at,
          scheduledStart: video.start_scheduled,
          duration: video.duration,
          status: video.status,
          thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
        }

        if (video.status === 'live') {
          live.push(v)
        } else if (video.status === 'upcoming') {
          upcoming.push(v)
        } else if (video.status === 'past') {
          past.push(v)
        }
      }
    })

    return {
      live: live.sort((a: Video, b: Video) => {
        return DateTime.fromISO(a.availableAt).toMillis() - DateTime.fromISO(b.availableAt).toMillis()
      }),
      upcoming: upcoming.sort((a: Video, b: Video) => {
        return DateTime.fromISO(a.availableAt).toMillis() - DateTime.fromISO(b.availableAt).toMillis()
      }),
      past: past.sort((a: Video, b: Video) => {
        return DateTime.fromISO(b.availableAt).toMillis() - DateTime.fromISO(a.availableAt).toMillis()
      }),
    }
  }

  public async getLive(): Promise<{
    live: Video[],
    upcoming: Video[],
  }> {
    this.logger.info('Fetching channel IDs from config')
    const ids = await this.getYouTubeIDs()

    const url = `https://holodex.net/api/v2/users/live?channels=${ids.join(',')}`
    this.logger.info('Fetching live and upcoming streams')
    const resp: Response = await fetch(url, {
      headers: {
        'x-apikey': this.apiKey,
      },
    })
    const respJson = await resp.json()

    const live: Video[] = []
    const upcoming: Video[] = []

    respJson.forEach((video: any) => {
      if (video.topic_id !== 'FreeChat' && ids.includes(video.channel.id)) {
        const v: Video = {
          id: video.id,
          title: video.title,
          type: video.type,
          membersOnly: video.topic_id === 'membersonly',
          publishedAt: video.published_at,
          availableAt: video.available_at,
          scheduledStart: video.start_scheduled,
          duration: video.duration,
          status: video.status,
          thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
          streamer: {
            id: video.channel.id,
            name: video.channel.english_name,
          },
        }

        if (video.status === 'live') {
          live.push(v)
        } else {
          upcoming.push(v)
        }
      }
    })

    return {
      live: live.sort((a: Video, b: Video) => {
        return DateTime.fromISO(a.availableAt).toMillis() - DateTime.fromISO(b.availableAt).toMillis()
      }),
      upcoming: upcoming.sort((a: Video, b: Video) => {
        return DateTime.fromISO(a.availableAt).toMillis() - DateTime.fromISO(b.availableAt).toMillis()
      }),
    }
  }

  private async getYouTubeID(name: string): Promise<string> {
    const streamers = await Bun.file('./channels.json').json()

    for (let streamerNdx = 0; streamerNdx < streamers.length; streamerNdx++) {
      for (let branchNdx = 0; branchNdx < streamers[streamerNdx].branches.length; branchNdx++) {
        const member = streamers[streamerNdx].branches[branchNdx].members.find(
          (member: any) => member.name.toLowerCase() === decodeURIComponent(name.toLowerCase()),
        )

        if (member) {
          return member.youtube
        }
      }
    }

    throw new NotFoundError(
      `Could not find YouTubeID for member ${decodeURIComponent(name.toLowerCase())}`,
    )
  }

  private async getYouTubeIDs(): Promise<string[]> {
    const streamers = await Bun.file('./channels.json').json()

    const ids: string[] = []
    streamers.forEach((org: any) => {
      org.branches.forEach((branch: any) => {
        branch.members.forEach((member: any) => {
          ids.push(member.youtube)
        })
      })
    })

    return ids
  }
}

export { HolodexService }
