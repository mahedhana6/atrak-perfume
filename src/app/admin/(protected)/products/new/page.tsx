import { ProductEditorForm } from "@/components/ProductEditorForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-gold-600">Catalog</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-plum-950">Add product</h1>
      <div className="mt-8">
        <ProductEditorForm categories={categories} />
      </div>
    </section>
  );
}
