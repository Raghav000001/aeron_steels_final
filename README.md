# Aeron Steels Private Limited — Corporate Website

Corporate website for **Aeron Steels Private Limited (ASPL)**, an ISO 9001:2015 certified steel manufacturing and precision component fabrication company based in Rohtak, Haryana.

Built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, MongoDB, and Cloudinary.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, About, Services, Quote Banner, International Exhibitions |
| `/about-us` | Company profile and history |
| `/products` | Product catalog (MongoDB + Cloudinary) |
| `/products/[id]` | Product detail with lightbox |
| `/infrastructure` | Facility photo gallery |
| `/certifications` | Certifications and compliance |
| `/contact-us` | Contact form with email notification |
| `/sitemap.xml` | SEO sitemap |

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Database**: MongoDB (Mongoose 9)
- **Media**: Cloudinary (image upload & CDN)
- **Email**: Nodemailer + Mailgen (SMTP)
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas (or local instance)
- Cloudinary account
- SMTP credentials (e.g., Gmail App Password)

### Environment Variables

Create `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=aeronsteels28@gmail.com

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

ADMIN_API_KEY=your-admin-key
SITE_URL=https://aeronsteels.com
```

### Install & Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve production build
```

### Seed Products

```bash
npx tsx scripts/seed-products.ts
```

Reads images from `public/Item Details/`, uploads to Cloudinary, inserts into MongoDB.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout (header, footer, SEO metadata)
│   ├── about-us/                # About page
│   ├── products/                # Product catalog + detail
│   ├── infrastructure/          # Facility gallery
│   ├── certifications/          # Certifications
│   ├── contact-us/              # Contact form
│   └── api/                     # API routes
├── components/
│   ├── layout/                  # Header, Footer
│   ├── sections/                # Home page sections
│   └── ui/                      # Reusable components
├── lib/                         # Utilities
├── models/                      # Mongoose models
└── public/                      # Static assets
    ├── photos/home/             # Home page images
    ├── photos/infra/            # Infrastructure images
    └── images/                  # Logo, legacy assets
```

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | — | List products (paginated) |
| GET | `/api/products/[id]` | — | Single product |
| POST | `/api/products` | Bearer | Create product |
| POST | `/api/seed` | Bearer | Bulk seed from local images |
| POST | `/api/contact` | — | Submit contact enquiry |

## Deployment

Deploy on Vercel. Connect the repository and configure environment variables in the Vercel dashboard.

---

**Aeron Steels Private Limited**  
Khewat no 1306, Village Baniyani, Bhiwani Road, Rohtak, Haryana 124001  
aeronsteels28@gmail.com | +91 8307028125
