import type { Prisma } from "@prisma/client";
import { ArrowRight, Gem, PackageCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { SearchFilters } from "@/components/SearchFilters";
import { SiteHeader } from "@/components/SiteHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";

  const where: Prisma.ProductWhereInput = {};

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { category: { name: { contains: q } } }
    ];
  }

  if (category) {
    where.category = { slug: category };
  }

  const [categories, products, featuredProduct] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.findFirst({
      include: { category: true },
      orderBy: { createdAt: "asc" }
    })
  ]);

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-white/10">
        <ProductImage
          src={featuredProduct?.imageUrl ?? "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1800&q=85"}
          alt=""
          eager
          className="absolute inset-0 h-full w-full opacity-30"
        />
        <div className="absolute inset-0 bg-plum-950/75" />
        <div className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            
            <h1 className="font-serif text-5xl font-semibold leading-tight text-ivory sm:text-6xl lg:text-7xl">
              Atrak Parfumeria
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/78">
              Explore refined perfumes for every signature, from deep oud and amber to radiant
              florals, fresh room mists, bakhoor rituals, and elegant gift sets.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#catalog"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-400 px-6 text-sm font-semibold text-plum-950 transition hover:bg-gold-300"
              >
                Shop catalog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/admin"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-ivory transition hover:border-gold-400 hover:text-gold-300"
              >
                Manage products
              </Link>
            </div>
          </div>
          <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="border-l border-gold-400/60 pl-4">
              <Gem className="mb-3 h-5 w-5 text-gold-300" aria-hidden="true" />
              <p className="font-serif text-2xl text-ivory">Curated</p>
              <p className="text-sm text-ivory/65">premium fragrance families</p>
            </div>
            <div className="border-l border-gold-400/60 pl-4">
              <PackageCheck className="mb-3 h-5 w-5 text-gold-300" aria-hidden="true" />
              <p className="font-serif text-2xl text-ivory">Ready</p>
              <p className="text-sm text-ivory/65">live stock visibility</p>
            </div>
            <div className="border-l border-gold-400/60 pl-4">
              <Sparkles className="mb-3 h-5 w-5 text-gold-300" aria-hidden="true" />
              <p className="font-serif text-2xl text-ivory">Elegant</p>
              <p className="text-sm text-ivory/65">mobile-first shopping</p>
            </div>
          </div>
        </div>
      </section>

      <SearchFilters categories={categories} activeCategory={category} search={q} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-gold-300">Fragrance catalog</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-ivory">
              {category
                ? categories.find((item) => item.slug === category)?.name ?? "Selected products"
                : "All collections"}
            </h2>
          </div>
          <p className="text-sm text-ivory/65">
            {products.length} {products.length === 1 ? "product" : "products"} shown
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-10 text-center">
            <p className="font-serif text-3xl text-ivory">No products found</p>
            <p className="mt-3 text-ivory/65">Try a different search term or category filter.</p>
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 bg-ink/45">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-ivory/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <BrandLogo />
          <p>© {new Date().getFullYear()} Atrak Parfumeria. Crafted for luxury retail.</p>
        </div>
      </footer>
    </main>
  );
}
