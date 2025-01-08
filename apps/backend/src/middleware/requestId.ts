import { Elysia } from 'elysia'
import { randomUUID } from 'crypto'

const RequestID = new Elysia()
    .onRequest(({ set, request }) => {
        set.headers['X-Request-ID'] = randomUUID()
    })
    .derive({ as: 'global' }, ({ request, set }) => {
        return {
            requestID: set.headers['X-Request-ID']
        }
    })

export { RequestID }
