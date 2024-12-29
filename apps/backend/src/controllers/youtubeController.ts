import { Elysia, t } from 'elysia'
import channels from '../../channels.json'

const YouTubeController = new Elysia()
    .guard({
        params: t.Object({
            memberName: t.String()
        })
    })
    .resolve(async ({ params }) => {
        return {
            member: decodeURI(params.memberName.toLowerCase()),
        }
    })
    .get('/api/youtube/:memberName', ({ member }) => {
        return channels.streamers.find((streamer: any) => streamer.name.toLowerCase() === member).youtube
    })

export { YouTubeController }
