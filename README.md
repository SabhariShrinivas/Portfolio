# Sabhari Shrinivas, portfolio

Personal portfolio: gameplay videos, playable links and short write-ups of what I built.
Live at https://portfolio-sabhari-shrinivas.vercel.app/ (Vercel deploys from `main`).

## Run locally

```bash
npm install
npm run dev
```

Opens on http://localhost:3000.

## Where things are

- `src/data.ts`: all the words, links and media. Edit this to add or change a project.
- `src/App.tsx`: the page sections.
- `src/ReplayDemo.tsx`: the small snapshot-replay warehouse sim in the Synkrato section.
- `src/index.css`: all styling. Colours and type sizes are the variables at the top.
- `public/media/`: gameplay videos (720p MP4). `public/Sabhari_Shrinivas_Resume.pdf`: the resume the site links to.

## Adding a project

Add an entry to `projects` in `src/data.ts`. `media` can be a video in `public/media`, an image URL, or a YouTube id:

```ts
media: {kind: 'youtube', id: 'dQw4w9WgXcQ'},
```
