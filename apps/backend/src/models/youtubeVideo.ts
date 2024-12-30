import { t } from 'elysia'

const youtubeVideo = t.Object({
    title: t.String(),
    published: t.String(),
    id: t.String()
})

type YouTubeVideo = typeof youtubeVideo.static

export { YouTubeVideo, youtubeVideo }
