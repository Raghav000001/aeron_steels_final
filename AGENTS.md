<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Aeron Steels — Agent Instructions

A corporate website for Aeron Steels Private Limited built with Next.js 16.2.6 (App Router), Tailwind CSS v4, MongoDB/Mongoose 9, Framer Motion 12, and TypeScript 5 strict mode.

## Quick Start

```bash
npm run dev          # Next.js dev with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint (core-web-vitals + typescript configs)
```

No test framework is configured — zero test files exist.

## Architecture Rules

### Server/Client Component Split (MANDATORY)

Every page that needs client interactivity (Framer Motion, `useState`, event handlers) MUST follow the server-wrapper pattern:

- `app/<route>/page.tsx` — Server Component. Exports `Metadata` object. Zero `"use client"`. Fetches data, renders the `*Client` wrapper.
- `app/<route>/<Name>Client.tsx` — Client Component. Marked `"use client"`. Contains all animation/interactivity code.

**Already implemented for**: `about-us`, `certifications`, `contact-us`, `infrastructure`, `products/[id]`, `services/[id]`.

**Exception**: `products/page.tsx` is a fully server-rendered page (data fetching + JSX, no animations) — does NOT need a client wrapper.

**Exception 2**: Home page (`app/page.tsx`) is a server component but its section children (Hero, About, Services, etc.) are individually `"use client"` — not wrapped in a single Client wrapper. This is intentional; each section manages its own Framer Motion animations independently.

### API Route Conventions

All API routes use standardized response helpers from `@/lib/api-helpers`:

```typescript
// Success: { success: true, data: T, meta?: { page, totalPages, total } }
successResponse(data, status, meta?)

// Error: { success: false, error: string }
errorResponse(message, status)
```

Write endpoints (POST, PUT, DELETE) MUST authenticate via:

```typescript
import { requireAdmin } from '@/lib/api-helpers';
const authError = requireAdmin(request);
if (authError) return authError;
```

Read-only endpoints (GET) are public.

### Rate Limiting & Validation

- Contact form (`POST /api/contact`) uses in-memory rate limiting (5 req/min per IP) + Zod schema validation (`@/lib/validations`).
- Product creation/update uses manual validation inline (supports both `multipart/form-data` and JSON payloads). Zod schemas exist in `@/lib/validations.ts` but the API routes do NOT use them — only contact form uses Zod.
- ObjectId format MUST be validated via `isValidObjectId()` from `@/lib/api-helpers`.

### Products Page

- `app/products/page.tsx` is server-rendered with `export const dynamic = 'force-dynamic'` — always fetches fresh data from MongoDB.
- Uses skip/limit pagination internally but the client component (`product-grid.tsx`) does front-end pagination after fetching all products (forced by server component architecture).
- Products limit: the product API GET cap is 200; the products page fetches 100 via direct DB call.

### Services Page Pattern

- `app/services/[id]/` uses **local static data** (`@/lib/services-data.ts`), not MongoDB. This is an array of 4 services with text + image paths.
- Exports `generateStaticParams` to pre-render all 4 service pages at build time.
- Service detail pages use dynamic metadata via `generateMetadata`.
- Service images are local (`/photos/home/*.jpeg` / `.png`), not from Cloudinary.

## Key Packages & Patterns

| Concern | Package/Location | Notes |
|---------|-----------------|-------|
| Framework | Next.js 16.2.6 | App Router, Turbopack. Check `node_modules/next/dist/docs/` before writing code — breaking changes exist. |
| Styling | Tailwind CSS v4 | PostCSS plugin `@tailwindcss/postcss`. Import via `@import "tailwindcss"` in CSS. Brand color: `#FF5B22`. |
| Animation | framer-motion 12 | Scroll-triggered via `whileInView`. All animated pages use the `*Client.tsx` wrapper pattern. |
| Icons | Unicode/emoji | Not SVG-based. File issue before converting. See Header.tsx, Footer.tsx, contact-us page. |
| DB | MongoDB + Mongoose 9 | Cached singleton connection in `@/lib/mongodb.ts` (global variable pattern for serverless). Event handlers registered at import time. |
| Env validation | `@/lib/env.ts` | `ENV` namespace — all required vars fail fast at startup. Always import from here, never read `process.env` directly. |
| Validation | zod 4 | Schemas in `@/lib/validations.ts` (contact form, product create/update). |
| Email | nodemailer + Mailgen | `@/lib/email.ts`. Two emails on contact: notification + ack. Uses `next/server` `after()` for background sending — runs post-response, so errors are logged but NOT returned to the user. |
| Images | Cloudinary | Upload via `@/lib/cloudinary.ts` — has MIME + size validation (5MB limit). Products stored as Cloudinary URLs in MongoDB. |
| Class merging | clsx + tailwind-merge | `cn()` utility in `@/lib/utils.ts`. |
| Path alias | `@/*` → `./src/*` | Configured in `tsconfig.json`. |

## Filesystem Layout

```
src/
  app/                    # App Router pages + API routes
    layout.tsx            # Root layout — JSON-LD structured data, metadata, OG/Twitter cards
    page.tsx              # Home page (server component)
    error.tsx             # Global error boundary (client)
    not-found.tsx         # 404 page
    sitemap.ts            # Dynamic sitemap.xml
    about-us/             # Server wrapper + Client component
    certifications/
    contact-us/
    infrastructure/
    products/             # Server-rendered listing + [id]/ with wrapper
    services/[id]/        # Static generation via generateStaticParams
    api/contact/          # POST with Zod + rate limit
    api/products/         # GET public, POST admin-auth
    api/products/[id]/    # GET public, PUT/DELETE admin-auth
    api/seed/             # POST admin-auth — seeds DB from local images
  components/
    layout/               # Header.tsx (client), Footer.tsx (server)
    sections/             # Hero, About, Services, QuoteBanner, Testimonials, Blog
    ui/                   # focus-cards, PageBanner, product-grid, SectionHeading, vortex
  lib/                    # Utilities (see table above)
    services-data.ts      # Static data for service pages (not MongoDB)
  models/                 # Product.ts (Mongoose schema with timestamps + indexes)
scripts/                  # Empty — seed logic migrated to POST /api/seed
```

## Known Issues & Technical Debt

Do NOT fix unless asked — these are documented here so an agent can recognize them:

- `src/components/ui/vortex.tsx` — 33+ ESLint errors (`prefer-const`, `no-explicit-any`, unused vars). Works correctly but noisy.
- `src/components/ui/focus-cards.tsx` — `card: any` prop, no typed interface.
- `<img>` tags used throughout (not `next/image`). Intentional choice for simplicity with external Cloudinary URLs.
- Footer service links point to `/contact-us` (intentional — all service enquiries route to contact form).
- `.env.local` on disk contains real credentials (SMTP, MongoDB, Cloudinary) — do NOT commit, do NOT expose.
- No CI/CD pipeline. No `middleware.ts`. No automated tests.

## SEO & Metadata

- Root metadata in `layout.tsx` — template `"%s | Aeron Steels"`, OG/Twitter cards, JSON-LD (Organization schema).
- Each sub-page exports its own `Metadata` via the server wrapper pattern.
- `sitemap.ts` generates XML for 6 routes. `robots.txt` references `aeronsteels.com/sitemap.xml`.
- Product detail pages use `generateMetadata` for dynamic titles.

## Build & Deployment

- `serverExternalPackages: ['nodemailer', 'mongoose']` in `next.config.ts` — these MUST stay as external packages (not bundled).
- Target: Vercel. Environment variables managed in Vercel dashboard.
- `SITE_URL` env var used by sitemap, email templates, and JSON-LD. Falls back to `https://aeron-steels-final.vercel.app`.
- `ADMIN_API_KEY` optional — if empty, admin-protected endpoints return 500 with "Server misconfiguration".
- Required env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Optional: `ADMIN_API_KEY`, `CONTACT_EMAIL`, `SITE_URL`.
