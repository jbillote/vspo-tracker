import { treaty } from "@elysiajs/eden"
import type { App } from 'backend'

const API_URL = process.env.API_URL || 'http://localhost:3000'

export const API = treaty<App>(API_URL)

