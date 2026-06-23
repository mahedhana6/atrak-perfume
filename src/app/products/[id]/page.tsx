import type { Metadata } from "next";
import { ArrowLeft, PackageCheck, PackageX, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { SiteHeader } from "@/components/SiteHeader";
import { formatCurrency } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, description: true }
  });

  if (!product) {
    return {
      title: "Product not found"
    };
  }

  return {
    title: product.name,
    description: product.description.slice(0, 150)
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: "asc" }
      }
    }
  });

  if (!product) {
    notFound();
  }

  const gallery = Array.from(
    new Set([product.imageUrl, ...product.images.map((image) => image.url)])
  ).filter(Boolean);
  const available = product.isAvailable && product.stockQuantity > 0;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="space-y-4">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition hover:text-gold-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to catalog
          </Link>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-plum-900 sm:col-span-2">
              <ProductImage src={gallery[0]} alt={product.name} eager />
            </div>
            {gallery.slice(1, 5).map((image, index) => (
              <div
                key={image}
                className="aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-plum-900"
              >
                <ProductImage src={image} alt={`${product.name} image ${index + 2}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold uppercase text-gold-300">{product.category.name}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ivory">
            {product.name}
          </h1>
          <p className="mt-5 text-3xl font-semibold text-gold-300">
            {formatCurrency(product.price.toString())}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
                available
                  ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
                  : "border-rose-300/30 bg-rose-300/10 text-rose-100"
              }`}
            >
              {available ? (
                <PackageCheck className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PackageX className="h-4 w-4" aria-hidden="true" />
              )}
              {available ? `${product.stockQuantity} in stock` : "Out of stock"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-ivory/75">
              <ShieldCheck className="h-4 w-4 text-gold-300" aria-hidden="true" />
              Authentic Atrak selection
            </span>
          </div>
          <div className="mt-8 border-y border-white/10 py-8">
            <h2 className="font-serif text-2xl font-semibold text-ivory">Description</h2>
            <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-ivory/72">
              {product.description}
            </p>
          </div>
          <div className="mt-8 rounded-lg border border-gold-400/30 bg-gold-400/10 p-5">
            <p className="text-sm font-semibold text-gold-300">Availability</p>
            <p className="mt-2 text-sm leading-6 text-ivory/75">
              {available
                ? "This fragrance is currently available. Visit the store or contact the team to reserve it."
                : "This fragrance is currently out of stock. Check back soon for restock updates."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
