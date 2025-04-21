import { Elysia, t } from 'elysia'
import { Logger } from 'middleware'
import { streamer } from '../models/streamer'
import { StreamerService } from '../service/streamerService'

const StreamerController = new Elysia({ prefix: '/api/v1' })
  .use(Logger)
  .derive({ as: 'scoped' }, ({ log }) => {
    return {
      streamerService: new StreamerService(log),
      log: log.child({ component: 'streamerController' }),
    }
  })
  .get(
    '/streamers',
    async ({ log, streamerService }) => {
      log.info('Fetching streamer names')
      return await streamerService.getStreamerNames()
    },
    {
      response: t.Object({
        'VSPO!': t.Object({
          JP: t.Array(t.String()),
          EN: t.Array(t.String()),
        }),
      }),
      detail: {
        tags: ['Channel'],
      },
    },
  )

export { StreamerController }
