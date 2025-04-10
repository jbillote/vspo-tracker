import { Elysia, t } from 'elysia'
import { Logger } from 'middleware'
import { streamer } from '../models/streamer'
import { StreamerService } from '../service/streamerService'

const StreamerController = new Elysia()
    .use(Logger)
    .derive({ as: 'scoped' }, ({ log }) => {
        return {
            streamerService: new StreamerService(log),
            log: log.child({ component: 'streamerController' })
        }
    })
    .get('/api/streamers', async ({ streamerService }) => {
        const streamerNames = await streamerService.getStreamerNames()

        return {
            streamers: streamerNames
        }
    }, {
        response: t.Object({
            streamers: t.Array(t.String())
        })
    })

export { StreamerController }
