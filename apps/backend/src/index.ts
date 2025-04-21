import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { ChannelController } from './controllers/channelController'
import { StreamerController } from './controllers/streamerController'
import { VideoController } from './controllers/videoController'

const app = new Elysia()
  .use(swagger({
    path: '/swagger',
    documentation: {
      info: {
        title: 'VSPO! Tracker Documentation',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'Channel',
          description: 'Streamer channels',
        },
        {
          name: 'Streamer',
          description: 'Streamer list',
        },
        {
          name: 'Video',
          description: 'Video lists',
        }
      ],
    }
  }))
  .use(ChannelController)
  .use(VideoController)
  .use(StreamerController)
  .listen(3000)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
