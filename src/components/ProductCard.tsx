import type { Category, Product } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { formatCurrency } from "@/lib/format";

type ProductCardProps = {
  product: Product & {
    category: Category;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const available = product.isAvailable && product.stockQuantity > 0;

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-glow transition hover:-translate-y-1 hover:border-gold-400/60">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden bg-plum-900">
          <ProductImage
            src={product.imageUrl}
            alt={product.name}
            className="transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-gold-300">
                {product.category.name}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-ivory">
                {product.name}
              </h3>
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gold-300 transition group-hover:border-gold-400">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-ivory/70">{product.description}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-semibold text-gold-300">
              {formatCurrency(product.price.toString())}
            </p>
            <span className={available ? "text-xs text-emerald-200" : "text-xs text-rose-200"}>
              {available ? "Available" : "Out of stock"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
