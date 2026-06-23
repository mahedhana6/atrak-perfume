import { Edit, PackageCheck, PackageX, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  deleteProduct,
  toggleProductAvailability
} from "@/app/admin/actions";
import { ProductImage } from "@/components/ProductImage";
import { formatCurrency } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } }
    })
  ]);

  const inStock = products.filter((product) => product.isAvailable && product.stockQuantity > 0).length;
  const totalStock = products.reduce((sum, product) => sum + product.stockQuantity, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-gold-600">Admin dashboard</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-plum-950">
            Product management
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-plum-950 px-5 text-sm font-semibold text-ivory transition hover:bg-plum-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add product
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-plum-950/10 bg-white p-5">
          <p className="text-sm font-semibold text-plum-950/55">Products</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-plum-950">{products.length}</p>
        </div>
        <div className="rounded-lg border border-plum-950/10 bg-white p-5">
          <p className="text-sm font-semibold text-plum-950/55">Available</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-plum-950">{inStock}</p>
        </div>
        <div className="rounded-lg border border-plum-950/10 bg-white p-5">
          <p className="text-sm font-semibold text-plum-950/55">Units in stock</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-plum-950">{totalStock}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-lg border border-plum-950/10 bg-white">
          <div className="border-b border-plum-950/10 px-5 py-4">
            <h2 className="font-serif text-2xl font-semibold text-plum-950">Products</h2>
          </div>
          <div className="divide-y divide-plum-950/10">
            {products.map((product) => {
              const available = product.isAvailable && product.stockQuantity > 0;
              const toggleAvailability = toggleProductAvailability.bind(
                null,
                product.id,
                !product.isAvailable
              );

              return (
                <div key={product.id} className="grid gap-4 p-5 md:grid-cols-[84px_1fr_auto] md:items-center">
                  <div className="h-24 w-24 overflow-hidden rounded-lg bg-plum-950 md:h-20 md:w-20">
                    <ProductImage src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase text-gold-600">
                      {product.category.name}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-plum-950">
                      {product.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-plum-950/62">
                      {product.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-semibold text-plum-950">
                        {formatCurrency(product.price.toString())}
                      </span>
                      <span className={available ? "text-emerald-700" : "text-rose-700"}>
                        {available ? `${product.stockQuantity} available` : "Out of stock"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-plum-950/10 text-plum-950 transition hover:border-gold-500 hover:text-gold-600"
                      title="Edit product"
                    >
                      <Edit className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <form action={toggleAvailability}>
                      <button
                        type="submit"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-plum-950/10 text-plum-950 transition hover:border-gold-500 hover:text-gold-600"
                        title={product.isAvailable ? "Mark out of stock" : "Mark available"}
                      >
                        {product.isAvailable ? (
                          <PackageX className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <PackageCheck className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>
                    </form>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <button
                        type="submit"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-200 text-rose-700 transition hover:bg-rose-50"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
            {products.length === 0 && (
              <div className="p-8 text-center text-plum-950/60">No products yet.</div>
            )}
          </div>
        </div>

        <aside className="rounded-lg border border-plum-950/10 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold text-plum-950">Categories</h2>
            <Link href="/admin/categories" className="text-sm font-semibold text-gold-600">
              Manage
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-ivory px-4 py-3 text-sm"
              >
                <span className="font-semibold text-plum-950">{category.name}</span>
                <span className="text-plum-950/55">{category._count.products}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
