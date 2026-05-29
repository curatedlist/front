# front

![Build and Deploy to Cloud Run](https://github.com/curatedlist/front/workflows/Build%20and%20Deploy%20to%20Cloud%20Run/badge.svg)

Frontend for [curatedli.st](https://curatedli.st) — a React SPA for browsing and creating collaborative curated lists. Built with Create React App, Redux, React Router, and reactstrap (Argon design system), with [Magic](https://magic.link) passwordless login. Deployed to Google Cloud Run (static build served by nginx).

## Requirements

- Node 14

## Run locally

As part of the full stack (from the parent directory):

```bash
docker-compose up --build      # frontend on :3000, talks to backend on :8080
```

Standalone dev server:

```bash
npm install
npm start                      # http://localhost:3000
```

## Scripts

```bash
npm start            # CRA dev server
npm run build        # production build into build/
npm test             # Jest / react-scripts test runner
```

Imports are absolute from `src/` (see `jsconfig.json`), e.g. `import App from 'App'`.

## Configuration

CRA inlines `REACT_APP_*` vars at build time. See `.env.development` / `.env.production`:

| Variable                  | Purpose                                          |
|---------------------------|--------------------------------------------------|
| `REACT_APP_API_URL`       | Backend base URL (`http://localhost:8080/` in dev) |
| `REACT_APP_MAGIC_API_KEY` | Magic publishable key (test in dev, live in prod) |

## Structure

- `src/index.js` — entry point: Redux `Provider`, toast provider, and all routes.
- `src/App.js` — shared page chrome (navbar + hero cover + footer); pages render as its children.
- `src/_services/` — backend calls (`fetch` wrapped with `_helpers/handleErrors`); authenticated requests send `Authorization: Bearer <Magic idToken>`.
- `src/redux/` — single `user` reducer holding the logged-in user (incl. Magic `idToken`).
- `src/components/` — grouped by domain; `_`-prefixed files are presentational, PascalCase files are routed pages.

Login flow: `magic.auth.loginWithMagicLink` → `userService.getOrCreate` → store user + `idToken` in Redux. A user with an empty `username` is redirected to `/create` to finish onboarding.

## Deploy

Pushing to `master` triggers `.github/workflows/blank.yml`: `gcloud builds submit` + `gcloud run deploy front` to Cloud Run (project from `GOOGLE_CLOUD_RUN_PROJECT`, region `europe-west1`). The production image (`Dockerfile`) builds the static bundle and serves it with nginx (`nginx/nginx.conf`, SPA fallback to `index.html` on port 8080). `Dockerfile.dev` is the hot-reload image used by docker-compose.
