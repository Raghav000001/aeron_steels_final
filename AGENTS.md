<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Aeron Steels — Agent Instructions

Corporate site for Aeron Steels Private Limited. Next.js 16.2.6 (App Router), Tailwind CSS v4, MongoDB/Mongoose 9, Framer Motion 12, TypeScript 5 strict.

## Commands

```bash
npm run dev          # dev with Turbopack
npm run build        # production build
npm run start        # start production server
npm run lint         # ESLint (core-web-vitals + typescript)
```

No test framework — zero test files.

## Architecture

### Server/Client Split (MANDATORY)

Pages needing interactivity MUST use the server-wrapper pattern:

- `app/<route>/page.tsx` — Server Component. Exports `Metadata`. Zero `"use client"`. Fetch data, render `*Client` wrapper.
- `app/<route>/<Name>Client.tsx` — Marked `"use client"`. All animation/interactivity.

**Implemented for**: `about-us`, `certifications`, `contact-us`, `infrastructure`, `products/[id]`, `services/[id]`.

**Exception**: `products/page.tsx` — fully server-rendered (data fetch + JSX, no animations). No client wrapper.

**Exception 2**: Home page (`page.tsx`) — server component. Section children (Hero, About, Services, QuoteBanner, Testimonials) are individually `"use client"`. Each manages its own Framer Motion animations independently.

**Exception 3**: `error.tsx` — `"use client"` (standard Next.js requirement for error boundaries).

### Products: Dual Routing at `/products/[id]`

The `[id]` segment handles TWO kinds of resources:

1. **MongoDB ObjectId** → fetches product from `Product` model, renders `ProductDetailClient` (client-side fetch from `/api/products/[id]`)
2. **Category slug** → reads from local filesystem via `@/lib/item-data`, renders `CategoryClient` (search/sort/pagination/lightbox) or `SpecCategoryClient` (image showcase + spec table for HR/HRPO categories)

Category slugs (from `item-data.ts`): `center-bearing-Brackets`, `mounting-parts`, `suspension-parts`, `hr-hrpo-crca-slit-coils`, `hr-hrpo-crca-sheets-strips`.

### Products Dropdown Slugs

Header `.tsx` routes and `item-data.ts` slugs are kept in sync. All 5 category dropdown entries map to valid routes:

| Slug (both layers) | Route |
|---|---|
| `center-bearing-Brackets` | `/products/center-bearing-Brackets` |
| `mounting-parts` | `/products/mounting-parts` |
| `suspension-parts` | `/products/suspension-parts` |
| `hr-hrpo-crca-slit-coils` | `/products/hr-hrpo-crca-slit-coils` |
| `hr-hrpo-crca-sheets-strips` | `/products/hr-hrpo-crca-sheets-strips` |

If adding a new category: add to `CATEGORIES` in `item-data.ts` AND to `PRODUCT_MENU_CATEGORIES` in `Header.tsx` — both must use the same slug.

### Item Details Data Layer (`@/lib/item-data.ts`)

Server-only filesystem-based product data. Reads images from `public/Item Details/` directory structure. Categories are defined in `CATEGORIES` array with slug → display name mapping and directory name on disk. Uses `fs` at runtime (not compatible with serverless edge). API at `GET /api/item-details?category=<slug>`.

### API Route Conventions

All routes use `@/lib/api-helpers`:

```typescript
successResponse(data, status, meta?)  // { success: true, data, meta? }
errorResponse(message, status)         // { success: false, error }
```

Write endpoints (POST, PUT, DELETE) authenticate via:

```typescript
import { requireAdmin } from '@/lib/api-helpers';
const authError = requireAdmin(request);
if (authError) return authError;
```

GET routes are public. `requireAdmin` returns 500 if `ADMIN_API_KEY` not set, 401 on bad/missing Bearer token.

### Rate Limiting & Validation

- `POST /api/contact` — in-memory rate limit (5 req/min per IP) + Zod validation (`@/lib/validations.ts`). Uses `next/server` `after()` for background email sending — errors logged but never returned to user.
- Product write routes validate inline (supports `multipart/form-data` and JSON). Zod schemas exist but are NOT used by these routes.
- `isValidObjectId()` from `@/lib/api-helpers` — always validate ObjectId format.

### Services Page Pattern

- `app/services/[id]/` uses local static data (`@/lib/services-data.ts`), NOT MongoDB. 4 services with text + local image paths.
- Exports `generateStaticParams` to pre-render all 4 at build time.
- Images in `/photos/home/*.jpeg` / `.png`.

### Products Page

- `app/products/page.tsx` has `export const dynamic = 'force-dynamic'`.
- Fetches up to 100 products from MongoDB directly (not via API).
- Client-side search, sort, pagination in `product-grid.tsx`.

### HR/HRPO Category Pages (SpecCategoryClient)

Two categories (`hr-hrpo-crca-slit-coils`, `hr-hrpo-crca-sheets-strips`) use a dedicated `SpecCategoryClient` component at `app/products/[id]/SpecCategoryClient.tsx`. These are full product pages (not modals) with:
- Dark hero + breadcrumb
- Image showcase (large main image left + grid of remaining images right on desktop, stacked on mobile)
- Specification comparison table (CRCA vs HR/HRPO) with card-style rows
- "Why Choose Our Materials" section with 4 info cards
- Bottom CTA linking to contact page

Images load dynamically from `public/Item Details/` via the same `getProductsBySlug()` data layer as other category pages. The former `SpecSheetsModal.tsx` has been removed — all spec data lives directly in the page component.

## Key Packages & Conventions

| Concern | Location | Notes |
|---------|----------|-------|
| Framework | Next.js 16.2.6 | App Router, Turbopack. Check `node_modules/next/dist/docs/` for breaking changes. |
| Styling | Tailwind CSS v4 | `@tailwindcss/postcss` plugin. Import `@import "tailwindcss"` in CSS. Brand: `#FF5B22`. **No JS config file** — Tailwind v4 is pure CSS-based. |
| Animation | framer-motion 12 | Scroll via `whileInView`. All animated pages use `*Client.tsx` wrapper. One exception: `vortex.tsx` imports from `"motion/react"` (standalone `motion` package). |
| Icons | Unicode/emoji/text | Not SVG-based. See Header (▸ for dropdowns), Footer (⌂, 📱, ✉, ▸), contact-us page. |
| DB | MongoDB + Mongoose 9 | Cached global singleton in `@/lib/mongodb.ts`. Event handlers registered at import. |
| Env | `@/lib/env.ts` — `ENV` namespace | All required vars fail fast at startup. Never read `process.env` directly. |
| Validation | zod 4 | Schemas in `@/lib/validations.ts`. Only contact form uses them. |
| Email | nodemailer + Mailgen | `@/lib/email.ts`. Two emails: notification + ack. Uses `after()` for background send. |
| Images | Cloudinary | Upload via `@/lib/cloudinary.ts` — 5MB limit, jpeg/png/webp only. Products stored as Cloudinary URLs in MongoDB. |
| Class merging | clsx + tailwind-merge | `cn()` in `@/lib/utils.ts`. |
| Path alias | `@/*` → `./src/*` | Configured in `tsconfig.json`. |
| Design tokens | `design-system/aeron-steels/` | **STALE** — MASTER.md specifies Poppins/Open Sans with `#F97316`, but actual code uses Inter with `#FF5B22`. Reference with caution; implementation is source of truth. `pages/` subdirectory is empty. |

## Routes & Component Map

```
src/
  app/
    layout.tsx              # Root — JSON-LD, OG/Twitter cards, Inter font, template "%s | Aeron Steels"
    page.tsx                # Home (server) → Hero, About, Services, QuoteBanner, Testimonials (each "use client")
    error.tsx               # Global error boundary ("use client")
    not-found.tsx           # 404 (server)
    sitemap.ts              # 8 routes, uses ENV.SITE_URL
    about-us/               # page.tsx (server) → AboutUsClient.tsx
    certifications/         # page.tsx → CertificationsClient.tsx
    contact-us/             # page.tsx → ContactUsClient.tsx
    infrastructure/         # page.tsx → InfrastructureClient.tsx
    products/
      page.tsx              # Server. force-dynamic. Fetches 100 products from MongoDB → ProductGrid (client)
      [id]/
        page.tsx            # Server. Dual routing (MongoDB ObjectId OR category slug)
        ProductDetailClient.tsx  # Client-side fetch from /api/products/[id]
        CategoryClient.tsx       # Client. search/sort/pagination/lightbox for filesystem products
        SpecCategoryClient.tsx   # Client. spec showcase for HR/HRPO categories (image grid + table + why-choose)
    services/[id]/
      page.tsx              # Server. generateStaticParams. Static data from services-data.ts
      ServicesDetailClient.tsx
    api/
      contact/              # POST — Zod validation + rate limit + background email
      products/             # GET (public, paginated), POST (admin-auth, multipart or JSON)
      products/[id]/        # GET (public), PUT/DELETE (admin-auth, validates ObjectId)
      item-details/         # GET — category listing or product items from filesystem
      seed/                 # POST (admin-auth) — reads local images → Cloudinary → MongoDB
  components/
    layout/
      Header.tsx            # "use client" — sticky, mobile menu, Products dropdown
      Footer.tsx            # Server component. Service links route to /contact-us (intentional)
    sections/
      Hero.tsx              # "use client" — bg image, Framer Motion entrance
      About.tsx             # "use client"
      Services.tsx          # "use client"
      QuoteBanner.tsx       # "use client"
      Testimonials.tsx      # "use client" — ACMA Automechanika exhibition photos. Imported as ExhibitionsSection
      Blog.tsx              # "use client" — returns null (placeholder, not rendered)
    ui/
      product-grid.tsx      # Client — search, sort, pagination for MongoDB products
      ProductCard.tsx       # Reusable card with View Details + Request Quote actions
      PageBanner.tsx        # Hero banner for sub-pages (server component, default bgImage)
      SectionHeading.tsx    # Reusable section title component
      vortex.tsx            # Particle canvas animation (imports `motion/react`, not `framer-motion`)
  lib/
    item-data.ts            # Server-only. Reads public/Item Details/ filesystem for category products
    services-data.ts        # Static array of 4 services (not MongoDB)
    api-helpers.ts          # successResponse, errorResponse, requireAdmin, checkRateLimit, isValidObjectId, isValidEmail
    cloudinary.ts           # uploadImage (buffer → Cloudinary URL), deleteImage
    email.ts                # HTML emails via Mailgen + Nodemailer
    env.ts                  # ENV namespace — required + optional vars
    mongodb.ts              # Global cached mongoose singleton
    utils.ts                # cn() — clsx + tailwind-merge
    validations.ts          # Zod schemas: contact, productCreate, productUpdate
  models/
    Product.ts              # Mongoose: title (string, required, trim, max 200), src (string, required), timestamps, indexes on createdAt & title
```

## Known Issues (do NOT fix unless asked)

- `vortex.tsx` — 2 ESLint warnings (`react-hooks/exhaustive-deps`). Noisy but functional.
- `<img>` tags throughout (not `next/image`) — intentional for simplicity with external Cloudinary URLs.
- Footer service links route to `/contact-us` — intentional (all enquiries go to contact form).
- `.env.local` contains real SMTP/MongoDB/Cloudinary credentials. Do NOT commit.
- No CI/CD, no `middleware.ts`, no automated tests.
- `Blog.tsx` returns null — placeholder component, not rendered anywhere.
- `scripts/` directory is empty — seed logic lives at `POST /api/seed`.
- `design-system/aeron-steels/MASTER.md` specifies Poppins/Open Sans + `#F97316`, but actual code uses Inter + `#FF5B22`. Stale design doc — implementation is source of truth.

## SEO & Metadata

- Root metadata in `layout.tsx`: title template `"%s | Aeron Steels"`, OG/Twitter cards, JSON-LD Organization schema.
- Sub-pages export `Metadata` via server wrapper. Product detail pages use `generateMetadata`.
- `sitemap.ts` generates XML for 8 routes using `ENV.SITE_URL`. `robots.txt` references `aeronsteels.com/sitemap.xml`.
- `ENV.SITE_URL` fallback: `https://aeron-steels-final.vercel.app`.

## Build & Deployment

- `serverExternalPackages: ['nodemailer', 'mongoose']` in `next.config.ts` — MUST stay external (not bundled).
- Target: Vercel. Env vars managed in Vercel dashboard.
- Required env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Optional: `ADMIN_API_KEY`, `CONTACT_EMAIL`, `SITE_URL`.
