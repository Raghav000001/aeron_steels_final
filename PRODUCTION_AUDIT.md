# PRODUCTION AUDIT REPORT

## Aeron Steels Private Limited — Next.js Website

**Audit Date**: May 29, 2026
**Application**: Aeron Steels Factory & Industrial Website
**Framework**: Next.js 16.2.6 (App Router) with TypeScript
**Database**: MongoDB via Mongoose 9
**Deployment Target**: Vercel / VPS

---

## Executive Summary

This report presents a comprehensive pre-production audit of the Aeron Steels website. The application is a single-tenant, brochure-style corporate website with a product catalog, contact form, and certification showcase. The codebase compiles successfully with zero TypeScript errors and builds cleanly.

**Overall Verdict: PARTIALLY READY FOR PRODUCTION**

The application has several **critical security issues** (exposed credentials, unprotected write APIs), **gaps in SEO/meta infrastructure**, and **no monitoring or error tracking**. While the core UI is functional and the build passes, these issues must be addressed before a production launch. Deployment will succeed technically, but without the fixes, the site is vulnerable to data tampering, credential theft, and spam abuse.

### By the Numbers

| Category | Score | Status |
|---|---|---|
| Production Readiness | 55/100 | ⚠️ Needs Work |
| Security | 30/100 | 🔴 Critical Issues |
| Performance | 70/100 | 🟡 Moderate |
| SEO | 35/100 | 🔴 Major Gaps |
| Accessibility | 50/100 | 🟡 Needs Improvement |
| Code Quality | 65/100 | 🟡 Fair |
| Maintainability | 60/100 | 🟡 Fair |
| Architecture | 65/100 | 🟡 Adequate |
| Database | 55/100 | ⚠️ Missing Indexes |
| DevOps | 25/100 | 🔴 Not Configured |

---

## PHASE 0 — Architecture Audit

### Overall Architecture

The application follows Next.js 16 App Router conventions with a `src/` directory structure:

```
src/
├── app/
│   ├── about-us/         # About Us page (client component)
│   ├── api/
│   │   ├── contact/      # Contact form email handler
│   │   ├── products/     # Product CRUD + [id]
│   │   └── seed/         # DB seeding endpoint
│   ├── certifications/   # ISO cert showcase (client component)
│   ├── contact-us/       # Contact form + map (client component)
│   ├── infrastructure/   # Facility gallery (client component)
│   ├── products/
│   │   ├── [id]/         # Product detail (client component)
│   │   └── page.tsx      # Product listing (server component)
│   ├── globals.css       # Tailwind v4 imports
│   ├── layout.tsx        # Root layout with Header + Footer
│   └── page.tsx          # Home page with all sections
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, About, Services, QuoteBanner, Testimonials, Blog
│   └── ui/               # focus-cards, PageBanner, product-grid, SectionHeading, vortex
├── lib/
│   ├── cloudinary.ts     # Cloudinary upload/delete
│   ├── email.ts          # Nodemailer + Mailgen email templates
│   ├── mongodb.ts        # Mongoose connection with cached singleton
│   └── utils.ts          # cn() utility
└── models/
    └── Product.ts        # Mongoose Product model
```

### Strengths

1. **Clean separation of concerns**: Components split into `layout/`, `sections/`, `ui/` — logical grouping.
2. **Proper server/client component boundaries**: `/products` page is a server component; interactive pages use `"use client"`.
3. **Singleton MongoDB connection**: Cached connection prevents connection pool exhaustion in serverless.
4. **Framer Motion animations**: Consistent scroll-triggered animations across all sections.
5. **Tailwind CSS v4**: Modern utility-first styling, consistent design system with brand colors (`#FF5B22`).
6. **Server External Packages configuration**: `nodemailer` and `mongoose` properly configured as server packages in Next.js config.

### Weaknesses

1. **No middleware**: No `middleware.ts` for request interception, rate limiting, or route protection.
2. **No global error handling**: No `error.tsx`, no `global-error.tsx`, no `not-found.tsx` pages.
3. **No authentication/authorization layer**: Product write APIs are completely unprotected.
4. **No API response standardization**: API routes return inconsistent response shapes (`{ products, total, page }` vs `{ product }` vs `{ success, message }`).
5. **No service layer**: Business logic lives directly in route handlers (`route.ts`) — no separation between controller and service.
6. **No environment variable validation**: No runtime check that all required env vars are present at startup.
7. **Lack of abstraction for Cloudinary/nodemailer**: Direct SDK usage in route handlers rather than through abstraction layers.

### Refactoring Opportunities

1. Extract API business logic into a `services/` directory
2. Create a middleware for request validation, rate limiting, and CORS
3. Standardize API response format across all endpoints
4. Create environment variable validation module
5. Add error boundaries at layout level
6. Create shared types file for API responses

---

## PHASE 1 — TypeScript Audit

### tsconfig.json Analysis

```json
{
  "strict": true,
  "target": "ES2017",
  "moduleResolution": "bundler",
  "jsx": "react-jsx"
}
```

- ✅ `strict: true` — Full strict mode enabled
- ✅ `moduleResolution: "bundler"` — Correct for Next.js
- ✅ `skipLibCheck: true` — Standard for apps (not libraries)
- ✅ Path alias `@/*` configured

### Type Safety Score: 75/100

### Issues Found

#### Files With `any` Usage

| File | Line | Issue | Severity |
|---|---|---|---|
| `src/components/ui/focus-cards.tsx` | 13 | `card: any` — no type safety on card prop | High |
| `src/components/ui/vortex.tsx` | 8 | `children?: any` — should be `React.ReactNode` | Medium |
| `src/components/ui/vortex.tsx` | 46 | `let center: [number, number] = [0, 0];` — should be `const` with `let` for pair elements | Low |
| `src/components/ui/vortex.tsx` | 86 | Multiple `let` declarations that are never reassigned (`x`, `y`, `vx`, `vy`, etc.) | Low |
| `src/components/ui/vortex.tsx` | 136 | Same pattern in `updateParticle` | Low |

#### Missing Interfaces

| Location | Issue | Severity |
|---|---|---|
| `src/lib/email.ts` | `Mailgen` theme config lacks TypeScript strict types | Low |
| `src/lib/cloudinary.ts` | No typed return for `deleteImage` | Low |
| API responses | No shared response type interfaces | Medium |

#### Unsafe Patterns

1. **`Product.find().lean()` usage**: `.lean()` returns `LeanDocument` type but assigned to `IProduct[]` implicitly — no runtime issues but sacrifices Mongoose document methods.

2. **`catch` without typed error**: Multiple API routes use `catch (error)` without proper error type narrowing.

### Recommended Improvements

1. Fix `any` types in `focus-cards.tsx` and `vortex.tsx`
2. Create shared API response types (`ApiResponse<T>`, `ErrorResponse`)
3. Add error type narrowing in all catch blocks
4. Fix `prefer-const` lint violations (33 errors in vortex.tsx)

---

## PHASE 2 — Security Audit

### Security Score: 30/100 🔴

### CRITICAL: Exposed Credentials in `.env.local`

**File**: `.env.local`

```
SMTP_USER=braghav474@gmail.com
SMTP_PASS=njtgyyhmxqvlkofg
MONGODB_URI=mongodb+srv://leodigitalsdm_db_user:aeronstee123@development.9btor2z.mongodb.net/development
CLOUDINARY_API_KEY=386521989326576
CLOUDINARY_API_SECRET=eYHSBKd1ack8aEovGP35Swd_XCY
```

**Severity**: 🔴 CRITICAL

**Explanation**: All production credentials are hardcoded in plaintext in `.env.local`. While `.gitignore` has `.env*` pattern, the file exists on disk. Any compromise of the development machine, deployment platform environment variable leakage, or insider access exposes:
- MongoDB database with full read/write access
- SMTP email account (can be used to send phishing emails)
- Cloudinary media storage (can be used to upload malicious content)

**Real World Impact**: Full data breach, database compromise, ability to send spam/phishing from the company email, unauthorized media uploads.

**Recommended Fix**:
1. Rotate ALL credentials immediately
2. Use a secrets manager (Vercel Environment Variables, Doppler, 1Password CLI)
3. Add env validation at startup:

```typescript
// src/lib/env.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  SMTP_HOST: requireEnv('SMTP_HOST'),
  SMTP_PORT: parseInt(requireEnv('SMTP_PORT'), 10),
  SMTP_USER: requireEnv('SMTP_USER'),
  SMTP_PASS: requireEnv('SMTP_PASS'),
  CONTACT_EMAIL: requireEnv('CONTACT_EMAIL'),
  MONGODB_URI: requireEnv('MONGODB_URI'),
  CLOUDINARY_CLOUD_NAME: requireEnv('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: requireEnv('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: requireEnv('CLOUDINARY_API_SECRET'),
} as const;
```

### CRITICAL: No Authentication on Write API Endpoints

**Files**:
- `src/app/api/products/route.ts` (POST)
- `src/app/api/products/[id]/route.ts` (PUT, DELETE)
- `src/app/api/seed/route.ts` (POST)

**Severity**: 🔴 CRITICAL

**Explanation**: The product creation, update, deletion, and database seeding endpoints have zero authentication. Anyone who discovers these endpoints can:
- Create arbitrary products with malicious images
- Delete the entire product catalog
- Trigger the seed endpoint to wipe and repopulate the database
- Upload arbitrary files to Cloudinary via the image upload path

**Real World Impact**: Complete data loss of product catalog, unauthorized Cloudinary storage usage (costs), defacement of the products page.

**Recommended Fix**: Add API key authentication or admin-only access:

```typescript
// Middleware for admin API routes
export async function requireAdmin(request: Request): Promise<Response | null> {
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null; // allowed
}

// Usage in route handlers:
const authError = await requireAdmin(request);
if (authError) return authError;
```

### HIGH: No Input Validation Library

**Files**: All API route handlers

**Severity**: HIGH

**Explanation**: The contact form performs basic field validation (`if (!name || !email ...)`) and a regex email check. The product API validates types manually. There is no schema validation library (Zod, Yup, Joi).

Specific issues:
- Email regex `!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)` — basic but doesn't catch all invalid formats
- Product API title validation is minimal
- No sanitization of input strings
- No payload size limits

**Real World Impact**: Potential for malformed data in database, email injection, unexpected API behavior.

**Recommended Fix**: Add Zod validation:

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  subject: z.string().min(3).max(200).trim(),
  message: z.string().min(10).max(5000).trim(),
});

// In route handler:
const parsed = contactSchema.safeParse(body);
if (!parsed.success) {
  return Response.json(
    { error: 'Validation failed', details: parsed.error.flatten() },
    { status: 400 }
  );
}
```

### HIGH: No Rate Limiting

**Files**: `src/app/api/contact/route.ts` (POST), all API routes

**Severity**: HIGH

**Explanation**: The contact form endpoint can be called unlimited times. An attacker could:
- Flood the company email with thousands of spam messages
- Exhaust the SMTP sending quota
- Cause email service suspension (Gmail has daily send limits)
- Trigger MongoDB write amplification

**Real World Impact**: Email service abuse, potential blacklisting of the SMTP server, financial cost from SMTP relay overages.

**Recommended Fix**: Implement rate limiting:

```typescript
// Simple in-memory rate limiter (or use Upstash Redis for serverless)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) return false;
  record.count++;
  return true;
}
```

### HIGH: No CSRF Protection on Contact Form

**File**: `src/app/contact-us/page.tsx`

**Severity**: HIGH

**Explanation**: The contact form uses `fetch('/api/contact', ...)` with `Content-Type: application/json`. While Same-Origin Policy prevents basic CSRF with JSON, no CSRF token is used, and if CORS is misconfigured, this endpoint could be called cross-origin.

**Real World Impact**: Potential for cross-site request forgery if CORS headers are added.

**Recommended Fix**: Add CSRF token to form submissions, ensure CORS is restrictive.

### MEDIUM: NoSQL Injection Vector via MongoDB `findById`

**Files**:
- `src/app/api/products/[id]/route.ts`

**Severity**: MEDIUM

**Explanation**: The `Product.findById(id)` passes the ID parameter directly from the URL. While Mongoose's `findById` casts string IDs to ObjectId (which rejects invalid formats), there's a potential for NoSQL injection if the ID is an object-like string. Mongoose 9 is generally safe against this, but without proper validation, edge cases exist.

**Real World Impact**: Low likelihood with Mongoose 9 but defense-in-depth is recommended.

**Recommended Fix**: Validate ID format before query:

```typescript
import mongoose from 'mongoose';

if (!mongoose.Types.ObjectId.isValid(id)) {
  return Response.json({ error: 'Invalid product ID' }, { status: 400 });
}
```

### MEDIUM: Cloudinary Upload Without Restrictions

**File**: `src/lib/cloudinary.ts`

**Severity**: MEDIUM

**Explanation**: The `uploadImage` function accepts any buffer and uploads it to Cloudinary with no file type validation, size limits, or MIME checking. The product API POST handler accepts File objects and passes the buffer directly.

**Real World Impact**: An attacker could upload malicious files (scripts, oversized images) to Cloudinary, incurring storage costs and potential content policy violations.

**Recommended Fix**:

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function uploadImage(buffer: Buffer, mimeType?: string): Promise<string> {
  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new Error(`Unsupported file type: ${mimeType}`);
  }
  // ... rest of upload
}
```

### MEDIUM: `NEXT_PUBLIC_BASE_URL` Leak Risk

**File**: `src/app/products/page.tsx` (line 13)

```typescript
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
```

**Severity**: MEDIUM

**Explanation**: The `NEXT_PUBLIC_` prefix means this variable is bundled into the client-side JavaScript. While the variable is only used in a server component (where it won't leak), the naming convention is misleading and could confuse future developers into using it client-side.

**Real World Impact**: Minimal currently, but risk of accidental exposure if the variable name or usage changes.

**Recommended Fix**: Rename to `INTERNAL_API_BASE_URL` (without `NEXT_PUBLIC_` prefix). Better yet, use relative URLs instead:

```typescript
const res = await fetch(`${process.env.INTERNAL_API_BASE_URL || 'http://localhost:3000'}/api/products`, {
  cache: 'no-store',
});
```

---

## PHASE 3 — Production Deployment Audit

### Build Status: ✅ PASS

The build completes successfully with Next.js 16.2.6 (Turbopack):
- TypeScript compilation: ✓
- Page generation: ✓ (12 pages in 302ms)
- Route optimization: ✓
- Zero TypeScript errors

### Deployment Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Missing required env vars on deploy | Site crashes at runtime | Add startup validation |
| MongoDB connection timeouts | Pages fail to load | Add connection pooling, retry logic |
| SMTP rate limits (Gmail) | Contact form silent failure | Add email queue, error logging |
| No `error.tsx` | White screen on error | Add error boundary pages |
| No `loading.tsx` | Poor UX during data fetch | Add loading skeletons |
| `NEXT_PUBLIC_BASE_URL` misconfigured | Product page fetch fails | Use relative URLs or SSR |

### Deployment to Vercel: ⚠️ Requires Configuration

**Required Environment Variables**:
- `MONGODB_URI`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `CONTACT_EMAIL`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `ADMIN_API_KEY` (recommended addition)

### Deployment Checklist

- [ ] Rotate all exposed credentials
- [ ] Add environment variable validation
- [ ] Add error boundary pages (`error.tsx`, `not-found.tsx`)
- [ ] Add loading states (`loading.tsx`)
- [ ] Verify MongoDB Atlas IP whitelist includes Vercel IPs
- [ ] Configure custom domain DNS
- [ ] Add rate limiting for API routes
- [ ] Secure write API endpoints with authentication
- [ ] Test contact form email delivery from production

---

## PHASE 4 — Performance Audit

### Performance Score: 70/100 🟡

### Frontend Issues

#### MEDIUM: Unoptimized Images (Next.js Image Component Not Used)

**Files**: ALL components using `<img>` tags instead of `next/image`

**Files affected**:
- `src/components/sections/Hero.tsx` (line 53 — background image via inline style)
- `src/components/sections/About.tsx` (lines 99, 120)
- `src/components/sections/Services.tsx` (line 104)
- `src/components/sections/Testimonials.tsx` (line 68)
- `src/components/sections/Blog.tsx` (line 96)
- `src/components/layout/Header.tsx` (line 27)
- `src/components/ui/focus-cards.tsx` (line 27)
- `src/components/ui/PageBanner.tsx` (line 15 — background image)
- `src/app/certifications/page.tsx` (line 59)
- `src/app/infrastructure/page.tsx` (line 71)
- `src/app/products/[id]/page.tsx` (line 97)

**Impact**: No automatic image optimization, no lazy loading from Next.js, no responsive image generation, WebP/AVIF format negotiation. The images are served as-is from the `/public` directory or Cloudinary URLs.

**Recommended Fix**:

```typescript
import Image from 'next/image';

// Replace <img> with:
<Image
  src={imageSrc}
  alt={altText}
  width={800}
  height={600}
  className="w-full h-full object-cover"
  priority={isAboveFold}
/>
```

For background images, use CSS with the image path directly or use `next/image` with `fill` prop and CSS `object-fit: cover`.

#### MEDIUM: Large Bundles — Framer Motion + All Components on Every Page

**Impact**: Framer Motion (~30KB gzipped) is loaded on every page since all interactive sections use it. The "use client" sections import Framer Motion individually rather than through a shared provider.

**Recommended Fix**: Dynamic import for heavy animation components:

```typescript
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => <div className="h-[600px] bg-gray-200 animate-pulse" />,
});
```

#### LOW: `useEffect` Missing Dependencies

**File**: `src/components/ui/vortex.tsx` (line 249)

```typescript
useEffect(() => {
  setup();
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };
}, []); // ❌ Missing: handleResize, setup
```

**Impact**: If `setup` or `handleResize` functions change due to state updates, the effect won't reflect changes. However, since they reference refs (stable), the actual runtime risk is low.

#### LOW: Hero Section Auto-rotate Timer Never Resets

**File**: `src/components/sections/Hero.tsx` (lines 38-41)

```typescript
useEffect(() => {
  const timer = setInterval(nextSlide, 7000);
  return () => clearInterval(timer);
}, []); // Missing dependency: nextSlide
```

**Impact**: The `nextSlide` function uses `setCurrentIndex` with functional update, so it's stable. Low risk, but ESLint warning.

### Backend Performance

#### MEDIUM: No Database Indexes

**File**: `src/models/Product.ts`

**Issue**: The Product model has no explicit indexes. The only query patterns are:
- `Product.find().sort({ createdAt: -1 })` — no index on `createdAt`
- `Product.findById(id)` — uses default `_id` index (fine)
- `Product.countDocuments()` — no index used

**Impact**: As the product catalog grows (100+ products), the sort and count queries will become slow in production.

**Recommended Fix**:

```typescript
ProductSchema.index({ createdAt: -1 });
```

#### MEDIUM: No Pagination Cursor Support

**File**: `src/app/api/products/route.ts`

**Issue**: Uses `skip/limit` pagination which becomes inefficient on large datasets (skip N documents = MongoDB still scans N documents).

**Impact**: Performance degradation on large product catalogs.

**Recommended Fix**: Consider cursor-based pagination for large datasets, or ensure `skip` stays within reasonable bounds.

---

## PHASE 5 — Database Audit

### Database Score: 55/100 ⚠️

### MongoDB Configuration

**File**: `src/lib/mongodb.ts`

**Strengths**:
- ✅ Singleton pattern prevents connection proliferation in serverless
- ✅ `bufferCommands: false` — prevents buffering when disconnected
- ✅ Connection caching with global variable

**Weaknesses**:

#### HIGH: Missing Connection Event Handlers

**Issue**: No handlers for `connected`, `disconnected`, `error`, `reconnectFailed` events.

**Impact**: In production, connection drops or MongoDB replica set elections will cause silent failures. Requests will hang and eventually timeout with no logging.

**Recommended Fix**:

```typescript
mongoose.connection.on('connected', () => {
  console.log('[MongoDB] Connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] Connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Disconnected');
});
```

#### MEDIUM: No Connection Retry Logic

**Issue**: If the initial connection fails, the promise is set to `null` but no retry mechanism exists:

```typescript
} catch (e) {
  cached.promise = null; // Retry on next call - acceptable but no backoff
  throw e;
}
```

**Impact**: Brief network hiccups could cause request failures even though a retry would succeed.

#### MEDIUM: Missing Product Schema Indexes

**File**: `src/models/Product.ts`

**Issue**: No indexes on `title` or `createdAt`. The `createdAt` field is used for sorting in the API, which requires a full collection scan without an index.

```typescript
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ title: 1 }); // If search/filter by title is added later
```

#### LOW: No Data Validation on `src`

**Issue**: The `src` field is typed as `String` with no URL validation. Invalid or malicious URLs could be stored.

```typescript
src: {
  type: String,
  required: [true, 'Product image URL is required'],
  // No validate function
}
```

### Required Fixes

1. Add `createdAt` index to Product schema
2. Add MongoDB connection event handlers for logging
3. Add URL validation to Product `src` field
4. Consider connection retry with exponential backoff

---

## PHASE 6 — API Audit

### API Routes Summary

| Endpoint | Method | Auth | Validation | Rate Limit | Status |
|---|---|---|---|---|---|
| `/api/contact` | POST | ❌ None | ⚠️ Basic email regex | ❌ None | ⚠️ Needs work |
| `/api/products` | GET | ❌ None (ok) | ❌ None needed | ❌ None | ✅ OK |
| `/api/products` | POST | ❌ **None** | ⚠️ Minimal | ❌ None | 🔴 Critical |
| `/api/products/[id]` | GET | ❌ None (ok) | ⚠️ No ID validation | ❌ None | ⚠️ Needs work |
| `/api/products/[id]` | PUT | ❌ **None** | ⚠️ Minimal | ❌ None | 🔴 Critical |
| `/api/products/[id]` | DELETE | ❌ **None** | ⚠️ No ID validation | ❌ None | 🔴 Critical |
| `/api/seed` | POST | ❌ **None** | ❌ None | ❌ None | 🔴 Critical |

### Detailed Findings Table

| Endpoint | Severity | Problem | Recommended Fix |
|---|---|---|---|
| `POST /api/contact` | 🔴 HIGH | No rate limiting, basic validation only | Add rate limiting, Zod schema validation |
| `POST /api/products` | 🔴 CRITICAL | No authentication, anyone can create | Add API key auth |
| `PUT /api/products/[id]` | 🔴 CRITICAL | No authentication, anyone can update | Add API key auth |
| `DELETE /api/products/[id]` | 🔴 CRITICAL | No authentication, anyone can delete | Add API key auth |
| `POST /api/seed` | 🔴 CRITICAL | No auth, wipes entire DB | Remove or protect with admin auth |
| `GET /api/products/[id]` | 🟡 LOW | No ID format validation | Add ObjectId validation |
| `GET /api/products` | 🟢 OK | Working pagination | Consider cursor-based for scale |

### Response Consistency Issues

- `/api/contact`: Returns `{ success: boolean, error?: string, message?: string }`
- `/api/products` (GET): Returns `{ products: [], total, page, totalPages }`
- `/api/products` (POST): Returns `{ product: {} }`
- `/api/products/[id]` (GET): Returns `{ product: {} }`
- `/api/products/[id]` (DELETE): Returns `{ message: string }`
- `/api/seed`: Returns `{ success: boolean, message: string, products: [] }`

**Fix**: Create a standard `ApiResponse<T>` type:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    totalPages?: number;
    total?: number;
  };
}
```

---

## PHASE 7 — SEO Audit

### SEO Score: 35/100 🔴

### Metadata Analysis

| Page | Title Tag | Meta Description | OG Tags | Canonical |
|---|---|---|---|---|
| `/` (Home) | ✅ "Aeron Steels \| Factory & Industrial" | ✅ "Spec Factory & Industrial Template" (low quality) | ❌ Missing | ❌ Missing |
| `/about-us` | ❌ Default (uses layout title) | ❌ Default | ❌ Missing | ❌ Missing |
| `/certifications` | ❌ Default | ❌ Default | ❌ Missing | ❌ Missing |
| `/contact-us` | ❌ Default | ❌ Default | ❌ Missing | ❌ Missing |
| `/infrastructure` | ❌ Default | ❌ Default | ❌ Missing | ❌ Missing |
| `/products` | ❌ Default | ❌ Default | ❌ Missing | ❌ Missing |
| `/products/[id]` | ❌ Default (client component, can't export metadata) | ❌ Default | ❌ Missing | ❌ Missing |

### Issues

#### CRITICAL: Sub-pages Use Client Components Blocking Metadata Export

**Files**: All sub-pages are `"use client"` components, which means they **cannot export `metadata` objects**. Next.js requires metadata to be exported from Server Components.

Affected pages:
- `src/app/about-us/page.tsx` — "use client"
- `src/app/certifications/page.tsx` — "use client"
- `src/app/contact-us/page.tsx` — "use client"
- `src/app/infrastructure/page.tsx` — "use client"
- `src/app/products/[id]/page.tsx` — "use client"

**Impact**: Every sub-page has the same title "Aeron Steels | Factory & Industrial" and the same description "Spec Factory & Industrial Template". This is catastrophic for SEO — no unique page titles, no unique descriptions, no structured data.

**Recommended Fix**: Restructure pages into a server/client split pattern:

```typescript
// src/app/about-us/page.tsx (Server Component - can export metadata)
import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us | Aeron Steels',
  description: 'Learn about Aeron Steels Private Limited - 10+ years of steel manufacturing excellence in Rohtak, Haryana.',
  openGraph: {
    title: 'About Us | Aeron Steels',
    description: 'Steel manufacturing excellence since...',
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}

// src/app/about-us/AboutUsClient.tsx ("use client" - handles animations)
'use client';
// ... existing code with framer-motion
```

#### HIGH: Missing OpenGraph and Twitter Card Tags

**Impact**: Links shared on social media (Facebook, Twitter/X, LinkedIn) will show generic previews with no image, no description, and no proper title.

**Recommended Fix** (in `layout.tsx`):

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Aeron Steels | Factory & Industrial',
    template: '%s | Aeron Steels',
  },
  description: 'High-quality steel products and custom fabrication by Aeron Steels Private Limited, Rohtak, Haryana.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Aeron Steels',
    images: [{ url: '/images/logo.png', width: 800, height: 600 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

#### HIGH: No Sitemap or Robots.txt

**Files**: Missing `public/robots.txt` and `app/sitemap.ts`

**Impact**: Search engines cannot discover all pages efficiently.

**Recommended Fix**:

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://aeronsteels.com', lastModified: new Date() },
    { url: 'https://aeronsteels.com/about-us', lastModified: new Date() },
    { url: 'https://aeronsteels.com/products', lastModified: new Date() },
    { url: 'https://aeronsteels.com/infrastructure', lastModified: new Date() },
    { url: 'https://aeronsteels.com/certifications', lastModified: new Date() },
    { url: 'https://aeronsteels.com/contact-us', lastModified: new Date() },
  ];
}
```

```txt
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://aeronsteels.com/sitemap.xml
```

#### HIGH: Low-Quality Meta Description

**File**: `src/app/layout.tsx` (line 14)

```typescript
description: "Spec Factory & Industrial Template",
```

**Impact**: This is placeholder text, not an actual description. It tells search engines and users nothing about the company. It should describe the business for search result snippets.

**Recommended Fix**: Replace with:

```typescript
description: "Aeron Steels Private Limited (ASPL) - High-quality steel products, custom fabrication, precision cutting, and ISO 9001:2015 certified manufacturing in Rohtak, Haryana.",
```

#### MEDIUM: Missing Structured Data (JSON-LD)

**Impact**: No schema.org structured data means search engines can't display rich results (Organization schema, Product schema, LocalBusiness schema).

**Recommended Fix**:

```typescript
// In layout.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aeron Steels Private Limited',
  url: 'https://aeronsteels.com',
  logo: 'https://aeronsteels.com/images/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Khewat no 1306, Village Baniyani, Bhiwani Road',
    addressLocality: 'Rohtak',
    addressRegion: 'Haryana',
    postalCode: '124001',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8307028125',
    contactType: 'sales',
  },
};
```

---

## PHASE 8 — Accessibility Audit

### Accessibility Score: 50/100 🟡

### Violations Found

#### MEDIUM: Non-Semantic Icons Using Emoji/Unicode Characters

**Files**: Multiple components use Unicode characters and emoji for icons instead of SVG or proper icon components.

Examples:
- `Header.tsx` (line 53): `<span className="text-2xl">✉</span>` (envelope)
- `Header.tsx` (line 60): `<span className="text-2xl">℡</span>` (telephone)
- `Footer.tsx` (lines 60, 64, 68): Same pattern
- `Contact Us page` (lines 168, 178, 188): Same pattern

**Impact**: Screen readers may not interpret emoji/unicode icons correctly. They may be skipped entirely or read as unexpected text.

**Recommended Fix**: Use SVG icons with proper `aria-hidden` attributes:

```typescript
<svg className="w-5 h-5 text-[#FF5B22]" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
```

#### MEDIUM: Keyboard Navigation Gaps in Hero Section

**File**: `src/components/sections/Hero.tsx`

**Issues**:
- Previous/next buttons are `<button>` elements (good) but have no `aria-label`
- The auto-rotating slides have no `aria-live` region for screen readers
- No pause-on-hover functionality for auto-rotation

**Recommended Fix**:

```typescript
<button
  onClick={prevSlide}
  aria-label="Previous slide"
  className="..."
>
  ...
</button>

// Add to the slide container:
<section
  aria-label="Featured slideshow"
  aria-roledescription="carousel"
  aria-live="polite"
>
```

#### MEDIUM: Focus Indicators Not Explicitly Styled

**Impact**: The default browser focus ring may be clipped or invisible on some interactive elements, particularly on buttons and links with custom styling.

**Recommended Fix**: Add focus-visible styles:

```css
/* In globals.css */
*:focus-visible {
  outline: 2px solid #FF5B22;
  outline-offset: 2px;
}
```

#### LOW: Form Inputs Missing Associated Labels

**File**: `src/app/contact-us/page.tsx`

**Issue**: Input fields use `placeholder` attribute as the only visual label. No `<label>` elements with `htmlFor` are used.

```typescript
<input
  type="text"
  name="name"
  placeholder="Your Name"
  // No <label> element
/>
```

**Impact**: Screen readers may rely on placeholder text for labeling, which disappears on input. This fails WCAG 3.3.2 (Labels or Instructions).

**Recommended Fix**:

```typescript
<div>
  <label htmlFor="name" className="sr-only">Your Name</label>
  <input
    id="name"
    type="text"
    name="name"
    placeholder="Your Name"
    // ...
  />
</div>
```

#### LOW: `alt` Text Audit

Some images have no `alt` text or generic `alt`:
- `src/components/ui/focus-cards.tsx` (line 28): `alt={card.title}` — acceptable
- `src/app/infrastructure/page.tsx` (line 72): `alt={\`Facility ${i + 1}\`}` — not descriptive
- `src/components/sections/About.tsx` (lines 100, 121): OK with descriptive alt text

---

## PHASE 9 — Code Quality Audit

### Code Quality Score: 65/100 🟡

### Issues Found

#### MEDIUM: 33 ESLint Errors in vortex.tsx

**File**: `src/components/ui/vortex.tsx`

**Errors**:
- 33 `prefer-const` violations — variables declared with `let` that are never reassigned
- 1 `no-explicit-any` — `children?: any`
- 2 unused variables: `HALF_PI`, `TO_RAD`
- 1 unused expression
- 1 unused parameter: `ctx` in `resize` function
- 1 missing `useEffect` dependency

**Impact**: These are style/lint issues, not runtime bugs. The code works correctly but creates noise in lint output and could mask real issues.

**Recommended Fix**: Run `npm run lint -- --fix` to auto-fix the `prefer-const` issues, then manually fix the rest. Or regenerate the vortex component from a cleaner template.

#### MEDIUM: Hardcoded Placeholder Text ("Lorem ipsum")

**Files**:
- `src/components/sections/Services.tsx` (lines 82-84)
- `src/components/sections/QuoteBanner.tsx` (lines 46-47)

**Impact**: Lorem ipsum text appears on the live site. This looks unprofessional and incomplete for a production launch.

**Recommended Fix**: Replace with actual company copy or remove the descriptive paragraphs.

#### MEDIUM: Duplicate Image Assets Used Across Sections

Several images are reused across different sections, which undermines the visual diversity:
- `hero_bg_1778760928163.png` used as: Hero slide 1, About section image, Quote banner background, Service card (Efficient Service)
- `service_power_1778761289382.png` used as: Hero slide 3, Service cards (Durable Products, Custom Fabrication), Blog post

**Impact**: Reduced visual impact. Each section should ideally have unique, relevant imagery.

#### LOW: Placeholder Social Media Links

**File**: `src/components/layout/Footer.tsx` (lines 29-35, 44-50)

```typescript
<Link href="#" ...>Privacy Policy</Link>
<Link href="#" ...>Help Center</Link>
```

All footer links point to `#` — these are dead links that should either be removed or point to actual pages.

#### LOW: Services Section "Read More" Links Point to `#`

**File**: `src/components/sections/Services.tsx` (line 128)

```typescript
<a href="#" className="...">Read More &gt;</a>
```

All "Read More" links on services cards point to `#`. These should link to relevant pages or be converted to buttons.

#### LOW: Unused Dependencies Check

The `simplex-noise` package (used by vortex.tsx) and `mailgen` (used by email.ts) are the only non-standard dependencies. No unused dependencies detected.

#### LOW: `_id` Exposed Client-Side

**File**: `src/components/ui/product-grid.tsx`, `src/app/products/[id]/page.tsx`

MongoDB `_id` values are sent to the client. While not a security issue per se for read-only data, for a public-facing app, using numeric or slug-based IDs is preferable to avoid leaking document identifiers.

---

## PHASE 10 — DevOps Audit

### DevOps Score: 25/100 🔴

### Current State

| Aspect | Status |
|---|---|
| CI/CD Pipeline | ❌ None |
| Automated Testing | ❌ None (zero test files) |
| Linting | ✅ ESLint configured (Next.js core-web-vitals + TypeScript) |
| Docker Configuration | ❌ None |
| Deployment Process | ❌ Not defined |
| Environment Management | ⚠️ `.env*` in `.gitignore`, but `.env.local` present |

### Issues

#### CRITICAL: No Automated Tests

**Issue**: There are zero test files or test configuration in the project. No unit tests, integration tests, or E2E tests.

**Impact**: Any change to the codebase carries risk of regression. The contact form, email sending, database operations, and API endpoints have no automated verification.

**Recommended Fix**: Set up Vitest or Jest with Testing Library:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

At minimum, add tests for:
1. Contact form submission flow
2. Product API CRUD operations
3. Email rendering/sending
4. MongoDB connection

#### CRITICAL: No CI/CD Pipeline

**Issue**: No GitHub Actions, no pre-commit hooks, no automated deployment.

**Impact**: Manual deployment process is error-prone. No guardrails against pushing broken code.

**Recommended Fix**: 

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

#### MEDIUM: No Docker Configuration

**Issue**: No `Dockerfile` for containerized deployment.

**Impact**: Limits deployment options. VPS/Railway/Render deployments are harder without containerization.

**Recommended Fix**:

```Dockerfile
FROM node:20-alpine AS base
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

---

## PHASE 11 — Monitoring & Observability

### Monitoring Score: 10/100 🔴

### Current State

| Feature | Status | Recommendation |
|---|---|---|
| Error Tracking | ❌ None | Sentry |
| Request Logging | ❌ None (just `console.error`) | Pino or Winston |
| Performance Monitoring | ❌ None | Vercel Analytics or PostHog |
| Uptime Monitoring | ❌ None | BetterStack or Pingdom |
| Analytics | ❌ None | Google Analytics or PostHog |
| Session Replay | ❌ None | Sentry or PostHog |

### Issues

#### CRITICAL: No Error Tracking

**Issue**: All error handling uses `console.error()` which is invisible in production. When the contact form email fails, or a database query errors, the only record is in serverless function logs (if even captured).

**Files affected**: All API route handlers use `console.error`.

**Real World Impact**: Silent failures. Users might see error messages but the development team won't know unless users report it. Email delivery failures, database outages, and API errors go undetected.

**Recommended Fix**: Add Sentry:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

#### CRITICAL: No Performance Monitoring

**Issue**: No mechanism to track:
- API response times
- Database query performance
- Frontend Core Web Vitals (LCP, FID, CLS)
- Error rates and trends

**Recommended Fix**: Use Vercel Analytics (built-in for Vercel deployments) or PostHog:

```typescript
// app/layout.tsx — add after Sentry setup
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### MEDIUM: No Structured Logging

**Issue**: `console.error('Failed to fetch products')` provides no context — no request ID, no timestamp (by default in serverless), no correlation ID.

**Recommended Fix**:

```typescript
// Simple structured logger
const logger = {
  error: (message: string, context?: Record<string, unknown>) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      ...context,
    }));
  },
};
```

### Recommended Monitoring Stack

| Tool | Purpose | Cost |
|---|---|---|
| Sentry | Error tracking, performance monitoring | Free tier available |
| Vercel Analytics | Core Web Vitals, page views | Free with Vercel |
| BetterStack | Uptime monitoring, status page | Free tier |
| PostHog | Product analytics, session replay, feature flags | Self-hosted free |

---

## PHASE 12 — Final Verdict

---

# Scores Summary

| Category | Score |
|---|---|
| **Production Readiness** | **55/100** |
| **Security** | **30/100** |
| **Performance** | **70/100** |
| **SEO** | **35/100** |
| **Accessibility** | **50/100** |
| **Code Quality** | **65/100** |
| **Maintainability** | **60/100** |
| **Architecture** | **65/100** |
| **Database** | **55/100** |
| **DevOps** | **25/100** |

---

# CRITICAL ISSUES (Must Fix Before Launch)

| # | Issue | File(s) | Impact |
|---|---|---|---|
| 1 | Exposed credentials in `.env.local` (SMTP, MongoDB, Cloudinary) | `.env.local` | Full data breach, credential theft |
| 2 | No authentication on write API endpoints (POST/PUT/DELETE products, seed) | `src/app/api/products/*`, `src/app/api/seed/*` | Data loss, unauthorized uploads |
| 3 | All sub-pages are `"use client"` preventing metadata export — no unique SEO titles/descriptions | `src/app/*/page.tsx` (5 pages) | Complete SEO failure for sub-pages |
| 4 | No rate limiting on contact form | `src/app/api/contact/route.ts` | Email abuse, SMTP quota exhaustion |
| 5 | No error tracking or monitoring (only `console.error`) | All API routes | Silent production failures |

# HIGH PRIORITY ISSUES

| # | Issue | File(s) | Impact |
|---|---|---|---|
| 6 | MongoDB URI with hardcoded credentials | `.env.local` | Database access on machine compromise |
| 7 | No input validation library (Zod missing) | All API routes | Malformed data, edge-case crashes |
| 8 | No sitemap.xml or robots.txt | Missing | Poor search engine discovery |
| 9 | Missing OpenGraph/Twitter Card metadata | `src/app/layout.tsx` | Poor social media previews |
| 10 | No error boundary pages (`error.tsx`, `not-found.tsx`) | Missing | White screen on errors |
| 11 | No automated tests (zero tests) | Entire project | Regression risk |
| 12 | No CI/CD pipeline | Missing | Manual, error-prone deployments |
| 13 | Cloudinary upload has no file type/size validation | `src/lib/cloudinary.ts` | Unrestricted file uploads |
| 14 | No MongoDB connection event handlers | `src/lib/mongodb.ts` | Silent connection failures |
| 15 | No database indexes on `createdAt` | `src/models/Product.ts` | Slow queries as data grows |

# MEDIUM PRIORITY ISSUES

| # | Issue | File(s) |
|---|---|---|
| 16 | Images not using `next/image` for optimization | All component files |
| 17 | Placeholder "Lorem ipsum" text on live pages | `Services.tsx`, `QuoteBanner.tsx` |
| 18 | Footer links point to `#` (dead links) | `Footer.tsx` |
| 19 | Services "Read More" links point to `#` | `Services.tsx` |
| 20 | Non-semantic unicode/emoji icons instead of SVGs | `Header.tsx`, `Footer.tsx`, `contact-us/page.tsx` |
| 21 | 33 ESLint errors in vortex.tsx | `vortex.tsx` |
| 22 | `any` types in focus-cards and vortex | `focus-cards.tsx`, `vortex.tsx` |
| 23 | CSRF protection missing on contact form | `contact-us/page.tsx` |
| 24 | No loading states (`loading.tsx` missing) | App pages |
| 25 | Form inputs missing proper `<label>` elements | `contact-us/page.tsx` |
| 26 | Inconsistent API response shapes | All API route files |

# LOW PRIORITY IMPROVEMENTS

| # | Issue | File(s) |
|---|---|---|
| 27 | Low-quality meta description ("Spec Factory & Industrial Template") | `layout.tsx` |
| 28 | Unused variables in vortex.tsx (`HALF_PI`, `TO_RAD`) | `vortex.tsx` |
| 29 | Duplicate image reuse across sections | Multiple section files |
| 30 | Missing keyboard navigation aria-labels on hero carousel | `Hero.tsx` |
| 31 | No JSON-LD structured data | Missing |
| 32 | No Docker configuration | Missing |
| 33 | MongoDB `_id` exposed to client | Multiple files |
| 34 | `NEXT_PUBLIC_BASE_URL` naming misleading | `products/page.tsx` |
| 35 | No `focus-visible` styles for keyboard users | `globals.css` |

---

# RECOMMENDED PRODUCTION STACK

| Category | Recommended |
|---|---|
| **Hosting** | Vercel (Pro plan for team features) |
| **Database** | MongoDB Atlas (M10+ cluster for production) |
| **File Storage** | Cloudinary (current, fine with auth fixes) |
| **Email** | SendGrid or AWS SES (replace Gmail SMTP for production) |
| **Domain** | Custom domain with Vercel DNS |
| **CDN** | Vercel Edge Network (built-in) |

# RECOMMENDED MONITORING STACK

| Tool | Purpose | Implementation Priority |
|---|---|---|
| **Sentry** | Error tracking, performance monitoring | CRITICAL — before launch |
| **Vercel Analytics** | Core Web Vitals, traffic analytics | HIGH — before launch |
| **BetterStack** | Uptime monitoring, status page | MEDIUM — after launch |
| **PostHog** | Product analytics, session replay | MEDIUM — after launch |

# RECOMMENDED SECURITY STACK

| Measure | Implementation |
|---|---|
| API Key auth for admin routes | Before launch |
| Rate limiting (Upstash Redis or in-memory) | Before launch |
| Zod schema validation for all inputs | Before launch |
| CSP headers in `next.config.ts` | Before launch |
| Rotate all exposed credentials | **Immediately** |
| Remove `.env.local` from committed state | **Immediately** |
| Switch from Gmail SMTP to SendGrid/SES | Before launch |

---

# FINAL VERDICT

## PARTIALLY READY FOR PRODUCTION

**The application will technically deploy and display content, but it is NOT safe to launch without addressing the critical and high-priority issues listed above.**

**Minimum requirements before launch:**
1. 🔴 Rotate ALL exposed credentials (SMTP, MongoDB, Cloudinary)
2. 🔴 Remove `.env.local` from source control
3. 🔴 Add authentication to ALL write API endpoints
4. 🔴 Add rate limiting to contact form
5. 🔴 Restructure client components to allow per-page metadata export
6. 🔴 Set up Sentry or equivalent error tracking
7. 🟡 Add sitemap.xml and robots.txt
8. 🟡 Add proper meta descriptions and OpenGraph tags
9. 🟡 Add error boundary pages
10. 🟡 Set up CI/CD pipeline

**Estimated effort to fix all critical issues**: 2-3 days for a single developer
**Estimated effort to fix all issues**: 1-2 weeks

**Launch blockers**: 5 critical issues, 10 high-priority issues
**Canary launch possible**: With critical fixes only (items 1-6 above), the site can launch with manual oversight.
**Full production readiness target**: After completing all critical + high priority items.

---

*Report generated by automated production audit. All severity ratings assume a production internet-facing deployment. Internal/intranet deployments would have different risk profiles.*
