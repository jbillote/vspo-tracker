import { Elysia, InternalServerError, t } from 'elysia'
import { Logger } from '@vspo-tracker/middleware'
import { channel } from '../models/channel'
import { HolodexService } from '../service/holodexService'

const ChannelController = new Elysia({ prefix: '/api/v1/channel' })
  .use(Logger)
  .derive({ as: 'scoped' }, ({ log }) => {
    return {
      holodexService: new HolodexService(log),
      log: log.child({ component: 'channelController' }),
    }
  })
  .onError(({ code, error, requestID }) => {
    if (code === 404) {
      return error
    } else {
      return new InternalServerError(requestID?.toString())
    }
  })
  .get(
    '/:member',
    async ({ params: { member }, log, holodexService }) => {
      log.info(`Fetching channel information for member=${member}`)
      return await holodexService.getChannelInformation(member)
    },
    {
      params: t.Object({
        member: t.String(),
      }),
      response: channel,
      detail: {
        tags: ['Channel'],
      },
    },
  )

export { ChannelController }
