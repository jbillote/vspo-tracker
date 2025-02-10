# VSPO! Tracker

VSPO! Tracker is a web application designed to track content creators across 
YouTube and Twitch, including video uploads as well as live streams.

VSPO! Tracker was developed for VSPO! content creators, but can be configured 
via JSON configurations for any content creators.

VSPO! Tracker uses the following technologies:

## Backend
- TypeScript
- SQLite
- [ElysiaJS](https://elysiajs.com/)
- [Prisma](https://www.prisma.io/)

## Frontend
- TypeScript
- [Svelte](https://svelte.dev/)
- [ElysiaJS Eden](https://elysiajs.com/eden/overview.html)
- [Tailwind](https://tailwindcss.com/)

To run, VSPO! Tracker uses the [Bun](https://bun.sh) runtime as well as 
[Turbo](https://turbo.build/) to run both backend and frontend apps at the same 
time.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

This will run both backend and frontend apps at the same time. You can also run 
them independently by running the same command from their respective directory.
