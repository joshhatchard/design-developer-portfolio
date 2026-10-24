# Josh Hatchard — Portfolio

The source for [joshhatchard.com](https://joshhatchard.com): a design and development portfolio built around case studies, creative experiments, and tactile, scroll-driven interactions.

## Highlights

- Responsive portfolio, case-study, and creative-work routes
- Scroll-driven 3D hero dive, WebGL artwork warp, and motion that respects reduced-motion preferences
- Interactive projects including Interactive Boxes and a digital zine reader
- Local, self-hosted fonts and responsive imagery for reliable production builds
- PostHog analytics support, with no tracking configured until a public project token is supplied

## Built with

- [Next.js](https://nextjs.org/) 16 and React 19
- TypeScript and Tailwind CSS
- Three.js, React Three Fiber, and OGL for WebGL scenes
- GSAP and Lenis for scroll choreography
- Playwright for browser-level checks

## Run locally

Requirements: Node.js 20.9 or later and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` to configure the optional public values below. Do not commit `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL used for metadata, sitemap, and Open Graph links. |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Optional public PostHog project token. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional PostHog ingestion host. |

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Run the visual and WebGL checks when making a substantial interaction change:

```bash
npx playwright install chromium
npm run test:e2e
```

## Project structure

```text
app/                 Next.js routes, components, and interaction systems
app/work/            Case-study routes, content, and reusable layouts
app/components/      Homepage, navigation, WebGL, and animation components
public/              Portfolio imagery, audio, 3D models, and creative assets
tests/               Playwright visual and behaviour checks
```

## Deployment

The project is deployed on Vercel. Pushes and pull requests to `main` are verified in GitHub Actions with linting and a production build. Set the environment variables above in the Vercel project for production analytics and canonical metadata.

## Credits

The hero model is based on [Free Pack – Stick Man (Rigged)](https://sketchfab.com/3d-models/free-pack-stick-man-rigged-29e53f85cf1641c7a602af7fc02356b2) by PolyOne Studio, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). It has been posed and recoloured for this site.

## Contact

[joshualhatchard@gmail.com](mailto:joshualhatchard@gmail.com) · [LinkedIn](https://www.linkedin.com/in/joshhatchard) · [GitHub](https://github.com/joshhatchard)
