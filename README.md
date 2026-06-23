# Atrak Parfumeria

A modern responsive perfume store built with Next.js, TypeScript, Tailwind CSS, Neon PostgreSQL, and Prisma.

## Features

- Luxury storefront using the provided Atrak Parfumeria logo.
- Product catalog with search, category filters, prices, descriptions, availability, and mobile-first product cards.
- Product detail pages with image galleries, full descriptions, price, category, and stock state.
- Secure admin login using server-side credential checks and signed HTTP-only session cookies.
- Admin dashboard for adding, editing, deleting, and marking products available or out of stock.
- Category management for the required perfume, bakhoor, air freshener, and gift set categories.
- Product image uploads with Vercel Blob support in production and a local development fallback.
- Prisma schema, Neon PostgreSQL database, and seed data.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Neon PostgreSQL
- Prisma ORM
- Vercel Blob for persistent production image uploads

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your Neon connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
ADMIN_EMAIL="admin@atrak.test"
ADMIN_PASSWORD="choose-a-long-password"
ADMIN_SESSION_SECRET="replace-with-at-least-32-random-characters"
```

4. Apply migrations and seed the Neon database:

```bash
npm run prisma:deploy
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` for the storefront and `http://localhost:3000/admin` for the dashboard.

## Vercel Deployment

1. Create a Vercel project connected to this repository.
2. Create a Neon PostgreSQL database and copy its pooled or direct connection string.
3. Set these environment variables in Vercel:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require"
ADMIN_EMAIL="your-admin-email"
ADMIN_PASSWORD="your-strong-admin-password"
ADMIN_SESSION_SECRET="at-least-32-random-characters"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

4. Run production migrations against Neon:

```bash
npm run prisma:deploy
```

5. Seed optional demo products:

```bash
npm run db:seed
```

6. Deploy with Vercel. The build command is:

```bash
npm run build
```

## Image Uploads

In development, uploaded images are saved to `public/uploads`.

On Vercel, set `BLOB_READ_WRITE_TOKEN` so product images are uploaded to Vercel Blob. Serverless deployments do not persist files written to the local filesystem, so Blob storage is required for production uploads.

## Admin Login

The admin dashboard uses the `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` environment variables. Sessions are signed, HTTP-only, same-site cookies and expire after 8 hours.

## Seeded Categories

- Men's Perfumes
- Women's Perfumes
- Unisex Perfumes
- Bakhoor
- Air Fresheners
- Gift Sets
