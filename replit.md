# Music Presentation Site

A static music curation site — each album gets a full-screen card with a cover-art-driven dynamic color system.

## Run & Operate

- `pnpm --filter @workspace/music-site run dev` — run the site in dev mode
- `pnpm --filter @workspace/music-site run build` — build for production (outputs to `dist/public/`)
- `pnpm run typecheck` — full typecheck

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite (static, no backend, no database)
- Tailwind CSS
- Color extraction: custom k-means pixel sampler (`src/hooks/useColorExtractor.ts`)

## Where things live

- `artifacts/music-site/src/data/music.ts` — **edit this to add/change music entries**
- `artifacts/music-site/public/covers/` — place your album cover images here
- `artifacts/music-site/src/hooks/useColorExtractor.ts` — dynamic color extraction from cover art
- `artifacts/music-site/src/components/MusicCard.tsx` — single album card layout
- `artifacts/music-site/src/pages/Home.tsx` — page that renders all cards
- `artifacts/music-site/src/index.css` — all styles

## How to add music

1. Drop your cover image into `artifacts/music-site/public/covers/` (e.g. `my-album.jpg`)
2. Open `artifacts/music-site/src/data/music.ts`
3. Add an entry to the array:

```ts
{
  id: "unique-id",
  cover: "/covers/my-album.jpg",
  artist: "Artist Name",
  album: "Album Title",
  track: "Optional Track Name",  // omit if presenting the whole album
  reason: "Why you're presenting this — a few sentences.",
  listenUrl: "https://open.spotify.com/...",
  listenLabel: "Listen on Spotify",  // optional, defaults to "Listen Now"
}
```

## Architecture decisions

- **Fully static** — no server, no database. All content lives in `src/data/music.ts`.
- **Color extraction** runs client-side via a k-means pixel sampler on a 64×64 canvas downsample of the cover image. CORS restrictions may prevent extraction from some external URLs — prefer local images in `public/covers/`.
- **One card per screen** — each entry occupies 100dvh, cover left, info right.
- **Build/deploy workflow** — `pnpm build` produces a static bundle. Commit → build → deploy via Replit Publish.

## User preferences

- Prefers static site, no backend
- Prefers build/deploy workflow (commit → build → deploy), not a dynamic server
- Framework: React + Vite (Astro not available in this environment)

## Gotchas

- External image URLs may block canvas pixel reads (CORS). Use local images in `public/covers/` for reliable color extraction.
- The site title ("Music Worth Hearing") is in `src/pages/Home.tsx` — change it there.
- After adding entries, `pnpm run typecheck` to verify before deploying.

## Pointers

- See the `pnpm-workspace` skill for workspace structure and TypeScript details
