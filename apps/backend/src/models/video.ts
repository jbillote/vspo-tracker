import { t } from 'elysia'

const video = t.Object({
  id: t.String(),
  title: t.String(),
  type: t.String(),
  membersOnly: t.Boolean({ default: false }),
  publishedAt: t.String(),
  availableAt: t.String(),
  scheduledStart: t.Optional(t.String()),
  duration: t.Number(),
  status: t.String(),
  thumbnail: t.String(),
  streamer: t.Object({
    id: t.String(),
    name: t.String(),
  }),
})

type Video = typeof video.static

export { Video, video }
