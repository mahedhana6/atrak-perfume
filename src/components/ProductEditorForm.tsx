import type { Category, Product, ProductImage } from "@prisma/client";
import { Save, Upload } from "lucide-react";
import { createProduct, updateProduct } from "@/app/admin/actions";

type ProductEditorFormProps = {
  categories: Category[];
  product?: Product & {
    images: ProductImage[];
  };
};

export function ProductEditorForm({ categories, product }: ProductEditorFormProps) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct;
  const imageUrls = product
    ? Array.from(new Set([product.imageUrl, ...product.images.map((image) => image.url)]))
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-plum-950">Product name</span>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className="mt-2 h-12 w-full rounded-lg border border-plum-950/15 bg-white px-4 text-plum-950 outline-none transition focus:border-gold-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-plum-950">Full description</span>
          <textarea
            name="description"
            required
            rows={9}
            defaultValue={product?.description}
            className="mt-2 w-full rounded-lg border border-plum-950/15 bg-white px-4 py-3 text-plum-950 outline-none transition focus:border-gold-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-plum-950">Image URLs</span>
          <textarea
            name="imageUrls"
            rows={5}
            defaultValue={imageUrls}
            placeholder="One image URL per line. Uploaded images are added automatically."
            className="mt-2 w-full rounded-lg border border-plum-950/15 bg-white px-4 py-3 text-plum-950 outline-none transition focus:border-gold-500"
          />
        </label>
      </div>

      <aside className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-plum-950">Category</span>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId ?? categories[0]?.id}
            className="mt-2 h-12 w-full rounded-lg border border-plum-950/15 bg-white px-4 text-plum-950 outline-none transition focus:border-gold-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-plum-950">Price</span>
          <input
            name="price"
            required
            min="0"
            step="0.01"
            type="number"
            defaultValue={product?.price.toString()}
            className="mt-2 h-12 w-full rounded-lg border border-plum-950/15 bg-white px-4 text-plum-950 outline-none transition focus:border-gold-500"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-plum-950">Stock quantity</span>
          <input
            name="stockQuantity"
            required
            min="0"
            step="1"
            type="number"
            defaultValue={product?.stockQuantity ?? 0}
            className="mt-2 h-12 w-full rounded-lg border border-plum-950/15 bg-white px-4 text-plum-950 outline-none transition focus:border-gold-500"
          />
        </label>
        <label className="flex items-center gap-3 rounded-lg border border-plum-950/10 bg-white p-4">
          <input
            name="isAvailable"
            type="checkbox"
            defaultChecked={product?.isAvailable ?? true}
            className="h-5 w-5 accent-gold-500"
          />
          <span className="text-sm font-semibold text-plum-950">Available for sale</span>
        </label>
        <label className="block rounded-lg border border-dashed border-plum-950/20 bg-white p-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-plum-950">
            <Upload className="h-4 w-4 text-gold-600" aria-hidden="true" />
            Upload product images
          </span>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="mt-3 block w-full text-sm text-plum-950 file:mr-4 file:rounded-full file:border-0 file:bg-plum-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ivory"
          />
          <p className="mt-3 text-xs leading-5 text-plum-950/55">
            Up to 5 MB per image. Vercel Blob is used when configured; local development saves to
            public uploads.
          </p>
        </label>
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-plum-950 px-6 text-sm font-semibold text-ivory transition hover:bg-plum-800"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {product ? "Save changes" : "Create product"}
        </button>
      </aside>
    </form>
  );
}
