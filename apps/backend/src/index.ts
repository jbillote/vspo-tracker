import { Elysia } from 'elysia'
import { ChannelController } from './controllers/channelController'
import { StreamerController } from './controllers/streamerController'
import { VideoController } from './controllers/videoController'

const app = new Elysia()
  .use(ChannelController)
  .use(VideoController)
  .use(StreamerController)
  .listen(3000)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
