import { Elysia } from 'elysia'
import { logger, type InferContext } from '@bogeychan/elysia-logger'
import { RequestID } from './requestId'

const Logger = new Elysia()

Logger
    .use(RequestID)
    .use(logger({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        },
        autoLogging: false,
        customProps(ctx: InferContext<typeof Logger>) {
            return {
                requestID: ctx.requestID
            }
        }
    }))

export { Logger }
