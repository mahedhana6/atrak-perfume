# Atrak Parfumeria

A modern responsive perfume store built with Next.js, TypeScript, Tailwind CSS, SQLite for local development, and Prisma.

## Features

- Luxury storefront using the provided Atrak Parfumeria logo.
- Product catalog with search, category filters, prices, descriptions, availability, and mobile-first product cards.
- Product detail pages with image galleries, full descriptions, price, category, and stock state.
- Secure admin login using server-side credential checks and signed HTTP-only session cookies.
- Admin dashboard for adding, editing, deleting, and marking products available or out of stock.
- Category management for the required perfume, bakhoor, air freshener, and gift set categories.
- Product image uploads with Vercel Blob support in production and a local development fallback.
- Prisma schema, SQLite local database, and seed data.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- SQLite for local development
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

3. Update `.env`:

```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@atrak.test"
ADMIN_PASSWORD="choose-a-long-password"
ADMIN_SESSION_SECRET="replace-with-at-least-32-random-characters"
```

The SQLite database file is created at `prisma/dev.db`.

4. Create and seed the database:

```bash
npm run prisma:migrate -- --name init
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` for the storefront and `http://localhost:3000/admin` for the dashboard.

## Vercel Deployment

1. Create a Vercel project connected to this repository.
2. Add a PostgreSQL database, such as Vercel Postgres, Neon, Supabase, or any hosted PostgreSQL provider.
3. For PostgreSQL production deployments, update the Prisma datasource provider to `postgresql`, set `DATABASE_URL` to your hosted PostgreSQL connection string, and generate production migrations for that database.
4. Set these environment variables in Vercel:

```env
DATABASE_URL="your-production-postgres-url"
ADMIN_EMAIL="your-admin-email"
ADMIN_PASSWORD="your-strong-admin-password"
ADMIN_SESSION_SECRET="at-least-32-random-characters"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

5. Run production migrations:

```bash
npm run prisma:deploy
```

6. Seed optional demo products:

```bash
npm run db:seed
```

7. Deploy with Vercel. The build command is:

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
