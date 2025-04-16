import { Elysia, t } from 'elysia'
import { Logger } from 'middleware'
import { channel } from '../models/channel'
import { HolodexService } from '../service/holodexService'

const ChannelController = new Elysia()
  .use(Logger)
  .derive({ as: 'scoped' }, ({ log }) => {
    return {
      holodexService: new HolodexService(log),
      log: log.child({ component: 'channelController' }),
    }
  })
  .get(
    '/api/channel/:member',
    async ({ params: { member }, log, holodexService }) => {
      log.info(`Fetching channel information for member=${member}`)
      return await holodexService.getChannelInformation(member)
    },
    {
      params: t.Object({
        member: t.String(),
      }),
      response: channel,
    },
  )

export { ChannelController }
