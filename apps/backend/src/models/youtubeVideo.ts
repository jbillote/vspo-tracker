import { t } from 'elysia'

const youtubeVideo = t.Object({
  id: t.String(),
  member: t.String(),
  title: t.String(),
  date: t.Date(),
  status: t.String(),
  thumbnail: t.String(),
})

type YouTubeVideo = typeof youtubeVideo.static

export { YouTubeVideo, youtubeVideo }
