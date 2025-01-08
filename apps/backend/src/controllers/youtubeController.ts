import { Elysia, t } from 'elysia'
import { logger, type InferContext } from '@bogeychan/elysia-logger'
import { DateTime } from 'luxon'
import { RequestID } from '../middleware/requestId'
import { youtubeVideo } from '../models/youtubeVideo'
import { YouTubeService } from '../service/youtubeService'

const YouTubeController = new Elysia()

YouTubeController
    .use(RequestID)
    .use(logger({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        },
        autoLogging: false,
        customProps(ctx: InferContext<typeof YouTubeController>) {
            return { requestID: ctx.requestID }
        }
    }))
    .guard({
        params: t.Object({
            member: t.String()
        }),
        query: t.Object({
            date: t.Optional(t.Number())
        })
    })
    .resolve(({ params, query }) => {
        const date: DateTime = query.date ? DateTime.fromMillis(query.date * 1000) : DateTime.now()

        return {
            member: decodeURI(params.member.toLowerCase()),
            date: date.startOf('day')
        }
    })
    .get('/api/youtube/:member', async ({ log, member, date }) => {
        return await new YouTubeService(log).getVideos(member, date)
    }, {
        response: t.Array(youtubeVideo)
    })

export { YouTubeController }
