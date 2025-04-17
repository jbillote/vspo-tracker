import { Elysia, t } from 'elysia'
import { Logger } from 'middleware'
import { video } from '../models/video'
import { HolodexService } from '../service/holodexService'

const VideoController = new Elysia()
  .use(Logger)
  .derive({ as: 'scoped' }, ({ log }) => {
    return {
      holodexService: new HolodexService(log),
      log: log.child({ component: 'videoController' }),
    }
  })
  .get(
    '/api/videos/:channelID',
    async ({ params: { channelID }, query: { offset, limit }, log, holodexService }) => {
      log.info(`Fetching videos for channelID=${channelID}, offset=${offset}, limit=${limit}`)
      return await holodexService.getVideos(channelID)
    },
    {
      params: t.Object({
        channelID: t.String(),
      }),
      query: t.Object({
        offset: t.Optional(t.Number({ default: 0 })),
        limit: t.Optional(t.Number({ default: 20 })),
      }),
      response: t.Array(video),
    },
  )

export { VideoController }
