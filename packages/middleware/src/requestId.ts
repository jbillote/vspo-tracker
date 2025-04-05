import { randomUUID } from 'crypto'
import { Elysia } from 'elysia'

const RequestID = new Elysia({ name: 'request-id', seed: 'header' })
  .onRequest(({ set, request: { headers } }) => {
    set.headers['X-Request-ID'] = headers.get('X-Request-ID') || randomUUID()
  })
  .derive({ as: 'global' }, ({ set }) => {
    return {
      requestID: set.headers['X-Request-ID'],
    }
  })

export { RequestID }
