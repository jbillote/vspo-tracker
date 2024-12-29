import { Elysia } from "elysia"
import { YouTubeController } from "./controllers/youtubeController"

const app = new Elysia()
  .use(YouTubeController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
