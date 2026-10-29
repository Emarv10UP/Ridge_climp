# RidgeClimb Adventures

Full-stack website for RidgeClimb Adventures — Kyrgyzstan's premier mountaineering and climbing
expedition company. React + Vite frontend, Express + Prisma + PostgreSQL backend.

```
ridgeclimb/
├── frontend/         React 18 + Vite + Tailwind CSS
├── backend/          Node 20 + Express + Prisma + PostgreSQL
├── brand-assets/      Full-resolution logo source files (not served by the app)
└── docker-compose.yml
```

---

## Quick start (Docker — recommended)

This brings up Postgres, runs migrations, seeds the database, and starts both servers.

```bash
cp backend/.env.example backend/.env     # edit if you want real SMTP creds
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api
- Postgres: localhost:5432 (user/pass/db: `ridgeclimb`)

To stop: `docker compose down` (add `-v` to also wipe the Postgres volume).

---

## Manual setup (without Docker)

### 1. Database

Install PostgreSQL locally, or run just the Postgres container:

```bash
docker run --name ridgeclimb-pg -e POSTGRES_USER=ridgeclimb \
  -e POSTGRES_PASSWORD=ridgeclimb -e POSTGRES_DB=ridgeclimb \
  -p 5432:5432 -d postgres:16-alpine
```

### 2. Backend

```bash
cd backend
cp .env.example .env          # defaults already point at the command above
npm install
npm run prisma:generate
npm run prisma:migrate        # creates tables
npm run prisma:seed           # seeds the 6 expeditions
npm run dev                   # http://localhost:4000
```

Email sending is optional in development. If `SMTP_HOST` is left blank in `.env`, the
email service logs to the console instead of sending — bookings and inquiries still work.

### 3. Frontend

```bash
cd frontend
cp .env.example .env          # VITE_API_URL=http://localhost:4000/api
npm install
npm run dev                   # http://localhost:5173
```

---

## Deploying online

This app is two separate deployables (a static frontend build + a Node API) plus a
Postgres database. Pick whichever fits your budget and comfort level — the code itself
doesn't lock you into one host.

### Option A — Single VPS with Docker Compose (most control, cheapest at scale)

Works on DigitalOcean, Hetzner, Linode, a home server, etc. Anything that gives you a
Linux box with Docker.

1. Point a domain's A record at your server's IP.
2. SSH in, install Docker + Docker Compose.
3. Copy the project to the server (`git clone` or `scp`), `cd` into it.
4. Copy `backend/.env.example` to `backend/.env` and fill in real values — at minimum
   change `JWT_ACCESS_SECRET`/`JWT_REFRESH_SECRET`, and set real SMTP credentials if you
   want emails to actually send.
5. Set `CORS_ORIGIN` to your real domain (e.g. `https://ridgeclimb.kg`) and
   `VITE_API_URL` to your API's public URL (e.g. `https://api.ridgeclimb.kg/api`) —
   export these as env vars before running compose, or add them to a `.env` file in the
   project root (docker compose reads it automatically).
6. `docker compose up --build -d`
7. Put a reverse proxy in front for HTTPS — either:
   - **Caddy** (simplest, auto-HTTPS): point it at `localhost:5173` for the frontend and
     `localhost:4000` for `/api` on a subdomain.
   - **nginx + certbot**: more manual, more common in tutorials if you want to follow one.
8. Re-run `docker compose up --build` whenever you change `VITE_API_URL` or other build
   args — the frontend bakes them in at build time, not runtime (see the comment at the
   top of `docker-compose.yml`).

### Option B — Managed platforms (less setup, usually pricier at scale)

- **Frontend**: Vercel, Netlify, or Cloudflare Pages. Point them at the `frontend/`
  directory, build command `npm run build`, output directory `dist`. Set `VITE_API_URL`
  as an environment variable in their dashboard pointing at wherever you host the backend.
- **Backend + database**: Railway or Render both support a Node service + a managed
  Postgres add-on with minimal config — push the `backend/` directory, set the same env
  vars as in `.env.example`, and point `DATABASE_URL` at the managed Postgres instance
  they give you. Run `npx prisma migrate deploy && npx prisma db seed` once via their
  shell/console after the first deploy.
- Either way, after both are live, update the frontend's `VITE_API_URL` to the backend's
  real public URL and redeploy the frontend.

### Things to do before going live regardless of host

- [ ] Replace placeholder images in `frontend/public/images/` with real photography
      (see table below)
- [ ] Set real `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` (random 32+ character strings)
- [ ] Set real SMTP credentials so booking/inquiry emails actually send
- [ ] Update `CORS_ORIGIN` to your real frontend domain
- [ ] Confirm `frontend/.env` and `backend/.env` are in `.gitignore` (they already are)
      and never commit real secrets
- [ ] Decide on real social media URLs in `frontend/src/constants/brand.js`

---

## Design system

The visual identity is built from the RidgeClimb mark (navy triangle + glacier-blue
mountain face). Tokens live in `frontend/tailwind.config.js`:

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0B2545` | Primary dark — header/footer backgrounds, headline text |
| `ridge` | `#1A5C9E` | Secondary blue — links, mid-tone accents |
| `glacier` | `#7FB8C9` | Signature accent — eyebrow labels, secondary buttons |
| `stone` | `#E8E2D6` / `#F5F2EA` | Warm neutral section backgrounds |
| `rust` | `#C9472B` | Single warm accent — EXPERT badge, rare emphasis only |

**Type**: Big Shoulders Display (condensed, uppercase for headings) paired with Source
Sans 3 (body) and JetBrains Mono (small labels/eyebrows — coordinates, tags, badges).

**Signature shape**: a single clipped top-right corner, applied consistently to buttons,
cards, and images (see `clipPath` usage in `Button.jsx` and `Card.jsx`). Echoes the
angularity of the logo mark without repeating it literally.

**Topographic contour motif**: a faint elevation-line SVG (`public/images/contour-pattern.svg`)
used as a low-opacity background texture on dark sections (hero, footer, CTA banners).
Note: the color is baked directly into the SVG file (`stroke="#7FB8C9"`) rather than
using CSS `currentColor` — browsers don't let an externally-referenced background image
inherit color from the page that includes it, so if you ever want a different shade,
edit the SVG itself or duplicate it as a second file.

---

## Replacing placeholder images

`frontend/public/images/` ships with generated placeholder JPGs (solid brand-color
gradients with a label) so every page renders fully without any external image hosting.
They are **not** final assets. Replace each file with real photography of the same name
to match:

| File | Used for |
|---|---|
| `hero-mountains.jpg` | Homepage hero background |
| `about-1.jpg`, `about-2.jpg` | About section stacked images |
| `safety-hero.jpg` | Safety page hero background |
| `training-basic.jpg`, `training-advanced.jpg`, `training-survival.jpg` | Training program cards |
| `everest-base-camp.jpg`, `kilimanjaro-trek.jpg`, `island-peak-climb.jpg`, `mont-blanc-summit.jpg`, `aconcagua-expedition.jpg`, `elbrus-challenge.jpg` | Expedition cards — also set as `imageUrl` in `backend/src/prisma/seed.js`, update both places |
| `avatar-alex.jpg`, `avatar-emma.jpg`, `avatar-sofia.jpg`, `avatar-michael.jpg` | Testimonial avatars |
| `logo-icon-only.png`, `logo-icon-white.png` | Navbar/footer logo mark (navy and white variants) |
| `favicon.png` | Browser tab icon |

The original full-resolution logo upload lives in `brand-assets/logo-full.png` if you
need to regenerate any of the cropped variants. The placeholder photo generator is at
`frontend/scripts/generate_placeholders.py` (requires Pillow) if you want to regenerate
or tweak colors/labels.

---

## API reference

Base URL: `/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/expeditions?difficulty=BEGINNER` | List expeditions, optional difficulty filter |
| GET | `/expeditions/featured` | List `featured: true` expeditions (homepage) |
| GET | `/expeditions/:slug` | Single expedition by slug |
| POST | `/bookings` | Create a booking — sends confirmation + admin email |
| GET | `/bookings/:id` | Get booking status by ID |
| POST | `/inquiries` | Submit contact form — sends admin notification + auto-reply |

All POST endpoints validate the request body with Zod and return:

```json
{ "success": false, "error": "Validation failed", "details": [{ "field": "email", "message": "Invalid email address" }] }
```

on a 400, or `{ "success": true, "data": { ... } }` on success.

Public write endpoints (`/bookings`, `/inquiries`) are rate-limited to 10 requests per
15 minutes per IP; all `/api` routes are limited to 100 requests per 15 minutes.

---

## Database schema

See `backend/src/prisma/schema.prisma`. Three models: `Expedition`, `Booking`, `Inquiry`.
Run `npm run prisma:studio` from `backend/` to browse data in a GUI.

---

## Project structure

```
backend/src/
├── routes/             Express route definitions
├── controllers/        Request handlers (business logic)
├── middleware/         validate.js (Zod), rateLimiter.js, errorHandler.js
├── services/           emailService.js (Nodemailer + HTML templates)
└── prisma/             schema.prisma, seed.js

frontend/src/
├── components/
│   ├── layout/         Navbar, Footer, Layout
│   ├── ui/              Button, Card, Badge, Modal, Accordion, Toast
│   └── sections/        Hero, AboutSection, FeaturedExpeditions, ExpeditionGrid,
│                       PricingTable, Testimonials, TrainingPrograms, FAQAccordion,
│                       ContactForm, BookingModal, CTABanner
├── pages/               HomePage, ExpeditionsPage, ExpeditionDetailPage, SafetyPage, ContactPage
├── hooks/               useScrollNavbar, useIntersectionAnimation, useCountUp
├── constants/brand.js   Single source of truth for name, contact info, social links
├── services/api.js      Axios instance + all API calls
├── store/bookingStore.js  Zustand store (booking modal state)
└── utils/validators.js  Shared Zod schemas (mirrors backend)
```

---

## What's implemented

- All 4 pages (`/`, `/expeditions`, `/safety`, `/contact`) plus the bonus
  `/expeditions/:slug` detail page
- Sticky navbar: transparent-on-hero on the homepage, solid elsewhere, mobile drawer
- Booking flow: pricing card → modal → POST `/api/bookings` → success screen with booking ID
- Contact form → POST `/api/inquiries` → toast notification, inline Zod validation errors
- FAQ accordion (single-open, animated, keyboard accessible)
- 6 expedition cards with color-coded difficulty badges, testimonials, training programs
- Full REST API with Zod validation, rate limiting, centralized error handling
- Nodemailer email service with branded HTML templates (logs to console if SMTP unset)
- PostgreSQL + Prisma, seeded with all 6 expeditions
- Docker Compose for one-command local setup, with notes for production deployment
- Responsive down to mobile, visible focus states, `prefers-reduced-motion` respected
- Bespoke visual identity built from the real logo (custom palette, type pairing,
  topographic motif, signature clipped-corner shape language)

## Not implemented (noted as "extra features" in the original spec)

- Admin dashboard (`/admin`)
- JWT auth (dependencies are in `package.json`; no routes/middleware wired up yet)
- Cookie consent banner, WhatsApp float button
- Playwright e2e tests (Vitest is wired for unit tests; no test files included yet)

These were left out to keep the delivered code fully functional rather than partially
stubbed — happy to build any of them out next if useful.
