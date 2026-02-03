import { Elysia, InternalServerError, t } from 'elysia'
import { Logger } from '@vspo-tracker/middleware'
import { video } from '../models/video'
import { HolodexService } from '../service/holodexService'

const VideoController = new Elysia({ prefix: '/api/v1/videos' })
  .use(Logger)
  .derive({ as: 'scoped' }, ({ log }) => {
    return {
      holodexService: new HolodexService(log),
      log: log.child({ component: 'videoController' }),
    }
  })
  .onError(({ log, requestID, error }) => {
    log?.error(error)
    return new InternalServerError(requestID?.toString())
  })
  .get(
    '/:channelID',
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
      response: t.Object({
        live: t.Array(video),
        upcoming: t.Array(video),
        past: t.Array(video),
      }),
      detail: {
        tags: ['Video'],
      },
    },
  )
  .get(
    '/live',
    async ({ query: { offset, limit }, log, holodexService }) => {
      log.info(`Fetching live and upcoming videos, offset=${offset}, limit=${limit}`)
      return await holodexService.getLive()
    },
    {
      query: t.Object({
        offset: t.Optional(t.Number({ default: 0 })),
        limit: t.Optional(t.Number({ default: 20 })),
      }),
      response: t.Object({
        live: t.Array(video),
        upcoming: t.Array(video),
      }),
      detail: {
        tags: ['Video'],
      },
    },
  )

export { VideoController }
