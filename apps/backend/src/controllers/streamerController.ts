import { Elysia, InternalServerError, t } from 'elysia'
import { Logger } from '@vspo-tracker/middleware'
import { org } from '../models/org'
import { StreamerService } from '../service/streamerService'

const StreamerController = new Elysia({ prefix: '/api/v1' })
  .use(Logger)
  .derive({ as: 'scoped' }, ({ log }) => {
    return {
      streamerService: new StreamerService(log),
      log: log.child({ component: 'streamerController' }),
    }
  })
  .onError(({ log, error, requestID }) => {
    log?.error(error)
    return new InternalServerError(requestID?.toString())
  })
  .get(
    '/streamers',
    async ({ log, streamerService }) => {
      log.info('Fetching streamer names')
      return await streamerService.getStreamerNames()
    },
    {
      response: t.Array(org),
      detail: {
        tags: ['Channel'],
      },
    },
  )

export { StreamerController }
