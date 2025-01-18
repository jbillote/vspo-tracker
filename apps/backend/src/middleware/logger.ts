import { Elysia } from 'elysia'
import { logger, type InferContext } from '@bogeychan/elysia-logger'
import { RequestID } from './requestId'

type Options = {
    ctx: Elysia
}

const Logger = (opts: Readonly<Options>) => {
    return new Elysia()
        .use(RequestID)
        .use(logger({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            },
            autoLogging: false,
            customProps(ctx: InferContext<typeof opts.ctx>) {
                return { requestID: ctx.requestID }
            }
        }))
}

export { Logger }
