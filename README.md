<p align="center">
  <img src="/images/logo.png" alt="Aeron Steels" width="120" />
</p>

<h1 align="center">Aeron Steels Private Limited</h1>

<p align="center">
  Corporate website for an ISO 9001:2015 certified steel manufacturing and precision component fabrication company based in Rohtak, Haryana.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js%2016-000000?logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 📇 Table of Contents

- [Pages](#-pages)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)

---

## 🗺️ Pages

| Route | Description |
|---|---|
| `/` | 🏠 Home — Hero, About, Services, Quote Banner, International Exhibitions |
| `/about-us` | 🏢 Company profile and history |
| `/products` | 📦 Product catalog with pagination |
| `/products/[id]` | 🔍 Product detail with lightbox viewer |
| `/infrastructure` | 🏭 Facility photo gallery |
| `/certifications` | ✅ Certifications and compliance |
| `/contact-us` | 📬 Contact form with email notification |
| `/sitemap.xml` | 🔗 SEO sitemap |

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| ⚛️ Framework | Next.js 16 (App Router, Turbopack) |
| 📝 Language | TypeScript 5 |
| 🎨 Styling | Tailwind CSS v4 |
| 🌀 Animation | Framer Motion |
| 🗄️ Database | MongoDB via Mongoose 9 |
| ☁️ Media | Cloudinary (upload, transform, CDN) |
| 📧 Email | Nodemailer + Mailgen (SMTP) |
| ✅ Validation | Zod |
| 🚀 Deployment | Vercel |

## 🚀 Getting Started

### 📋 Prerequisites

- ✅ Node.js 20 or later
- 🗄️ MongoDB Atlas instance (or local MongoDB)
- ☁️ Cloudinary account
- 📧 SMTP credentials (Gmail App Password recommended)

### 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

- **SMTP** — host, port, user, password, and recipient email
- **MongoDB** — connection URI
- **Cloudinary** — cloud name, API key, and API secret
- **Optional** — admin API key, site URL

```bash
cp .env.example .env.local
```

### 💻 Install and Run

```bash
npm install
npm run dev       # opens http://localhost:3000
```

### 📦 Build for Production

```bash
npm run build
npm start
```

### 🌱 Seed Product Data

```bash
npx tsx scripts/seed-products.ts
```

Reads images from `public/Item Details/`, uploads each to Cloudinary, and inserts the corresponding product records into MongoDB. All existing products are replaced.

## 📁 Project Structure

```
📂 src/
  📂 app/
    📄 page.tsx                  Home page assembly
    📄 layout.tsx                Root layout, SEO metadata, JSON-LD
    📂 about-us/                 Company information
    📂 products/                 Product catalog and detail pages
    📂 infrastructure/           Facility photo gallery
    📂 certifications/           Certifications display
    📂 contact-us/               Contact form
    📂 api/                      REST API routes
  📂 components/
    📂 layout/                   Header, Footer
    📂 sections/                 Home page section components
    📂 ui/                       Reusable UI primitives
  📂 lib/                        Utilities (Cloudinary, MongoDB, email, env, validation)
  📂 models/                     Mongoose schemas
📂 public/
  📂 photos/home/                Home page images
  📂 photos/infra/               Infrastructure gallery images
  📂 images/                     Logo and legacy assets
```

## 🌐 API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| 📖 GET | `/api/products` | ❌ No | Paginated product list |
| 📖 GET | `/api/products/[id]` | ❌ No | Single product by ID |
| ➕ POST | `/api/products` | 🔑 Bearer token | Create a product |
| 🌱 POST | `/api/seed` | 🔑 Bearer token | Bulk seed products from local images |
| 📬 POST | `/api/contact` | ❌ No | Submit a contact enquiry |

The admin Bearer token is set via the `ADMIN_API_KEY` environment variable.

## 🚢 Deployment

1. 📤 Push the repository to GitHub.
2. 🔄 Import the project into Vercel.
3. ⚙️ Configure all environment variables in the Vercel dashboard.
4. 🚀 Deploy.

The sitemap and metadata are pre-configured for SEO. Update `SITE_URL` in your environment to match the production domain.

---

<p align="center">
  <strong>Aeron Steels Private Limited</strong><br />
  📍 Khewat no 1306, Village Baniyani, Bhiwani Road, Rohtak, Haryana 124001<br />
  📧 <a href="mailto:aeronsteels28@gmail.com">aeronsteels28@gmail.com</a> | 📞 +91 8307028125
</p>
