import { t } from 'elysia'

const video = t.Object({
  id: t.String(),
  title: t.String(),
  type: t.String(),
  publishedAt: t.Date(),
  availableAt: t.Date(),
  scheduledStart: t.Date(),
  duration: t.Number(),
  status: t.String(),
  thumbnail: t.String(),
})

type Video = typeof video.static

export { Video, video }
