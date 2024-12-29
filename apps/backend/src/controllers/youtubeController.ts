import { Elysia, t } from 'elysia'
import { YouTubeService } from '../service/youtubeService'

const YouTubeController = new Elysia()
    .guard({
        params: t.Object({
            memberName: t.String()
        })
    })
    .resolve(({ params }) => {
        return {
            member: decodeURI(params.memberName.toLowerCase()),
        }
    })
    .get('/api/youtube/:memberName', ({ member }) => {
        return YouTubeService.getYouTubeID(member)
    })

export { YouTubeController }
