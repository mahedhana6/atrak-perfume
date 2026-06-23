import { Plus, Save, Trash2 } from "lucide-react";
import {
  createCategory,
  deleteCategory,
  updateCategory
} from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } }
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-gold-600">Catalog</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-plum-950">Manage categories</h1>

      <form action={createCategory} className="mt-8 flex flex-col gap-3 rounded-lg border border-plum-950/10 bg-white p-5 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="text-sm font-semibold text-plum-950">New category</span>
          <input
            name="name"
            required
            placeholder="Category name"
            className="mt-2 h-12 w-full rounded-lg border border-plum-950/15 bg-white px-4 text-plum-950 outline-none transition focus:border-gold-500"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 self-end rounded-full bg-plum-950 px-5 text-sm font-semibold text-ivory transition hover:bg-plum-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="grid gap-3 rounded-lg border border-plum-950/10 bg-white p-4 md:grid-cols-[1fr_auto] md:items-end"
          >
            <form
              action={updateCategory.bind(null, category.id)}
              className="grid min-w-0 gap-3 md:grid-cols-[1fr_auto] md:items-end"
            >
              <label className="block">
                <span className="text-sm font-semibold text-plum-950">
                  {category._count.products} products
                </span>
                <input
                  name="name"
                  required
                  defaultValue={category.name}
                  className="mt-2 h-12 w-full rounded-lg border border-plum-950/15 bg-white px-4 text-plum-950 outline-none transition focus:border-gold-500"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-plum-950/10 px-4 text-sm font-semibold text-plum-950 transition hover:border-gold-500 hover:text-gold-600"
                title="Save category"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                Save
              </button>
            </form>
            <form action={deleteCategory.bind(null, category.id)}>
              <button
                type="submit"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 text-rose-700 transition hover:bg-rose-50"
                title="Delete category"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-plum-950/55">
        Categories with products are protected by the database relation. Move or delete products
        before removing a populated category.
      </p>
    </section>
  );
}
