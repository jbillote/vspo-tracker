import { Elysia } from 'elysia'
import { StreamerController } from './controllers/streamerController'
import { YouTubeController } from './controllers/youtubeController'

const app = new Elysia()
  .use(YouTubeController)
  .use(StreamerController)
  .listen(3000);

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
