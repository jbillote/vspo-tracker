import { t } from 'elysia'

enum Status {
    Completed = 'completed',
    Live = 'live',
    Upcoming = 'upcoming'
} 

const youtubeVideo = t.Object({
    title: t.String(),
    published: t.String(),
    id: t.String(),
    status: t.Enum(Status)
})

type YouTubeVideo = typeof youtubeVideo.static

export { YouTubeVideo, youtubeVideo, Status }
