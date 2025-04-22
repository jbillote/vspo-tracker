# VSPO! Tracker

<h1 align="center">
    <img src="https://raw.githubusercontent.com/jbillote/vspo-tracker/refs/heads/main/.github/screenshots/home.png" alt="VSPO! Tracker Home">
    <img src="https://raw.githubusercontent.com/jbillote/vspo-tracker/refs/heads/main/.github/screenshots/channel.jpg" alt="VSPO! Tracker Channel">
</h1>

VSPO! Tracker is a web application designed to track content creators across 
YouTube and Twitch, including video uploads and live streams.

VSPO! Tracker uses the following technologies:

## Backend
- TypeScript
- [ElysiaJS](https://elysiajs.com/)

## Frontend
- TypeScript
- [Next.js](https://nextjs.org/)
- [ElysiaJS Eden](https://elysiajs.com/eden/overview.html)
- [Tailwind](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

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

Running the application in this way, due to both `dev` scripts being run, will 
enable hotswapping for both applications; changes made to source files for both 
applications will automatically reload the respective server and any changes will 
be immediately apparent.

## Known Issues and Todos
- Implement unit tests
- Implement caching using sqlite, including Turso for live access
- Responsive design for better experiences on different form factors
- Return more specific errors on backend and handle them appropriately on frontend
- Embed YouTube players to implement multiwatching
