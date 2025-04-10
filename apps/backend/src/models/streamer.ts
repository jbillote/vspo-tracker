import { t } from 'elysia'

const streamer = t.Object({
    name: t.String(),
    youTube: t.String()
})

type Streamer = typeof streamer.static

export { Streamer, streamer }
