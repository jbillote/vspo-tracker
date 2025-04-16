import { t } from 'elysia'

const channel = t.Object({
  id: t.String(),
  name: t.String(),
  photo: t.String(),
  banner: t.String(),
  twitter: t.String(),
})

type Channel = typeof channel.static

export { Channel, channel }
