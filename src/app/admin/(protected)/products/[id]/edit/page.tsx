import { notFound } from "next/navigation";
import { ProductEditorForm } from "@/components/ProductEditorForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { sortOrder: "asc" }
        }
      }
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } })
  ]);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-gold-600">Catalog</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-plum-950">Edit product</h1>
      <div className="mt-8">
        <ProductEditorForm product={product} categories={categories} />
      </div>
    </section>
  );
}
