"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { imageUrlsFromText, uploadProductImages } from "@/lib/uploads";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { toSlug } from "@/lib/format";

function formText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function formNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${key} must be a valid positive number.`);
  }

  return value;
}

function formFiles(formData: FormData, key: string) {
  return formData.getAll(key).filter((entry): entry is File => entry instanceof File);
}

async function productPayload(formData: FormData) {
  const uploadedImages = await uploadProductImages(formFiles(formData, "images"));
  const manualImages = imageUrlsFromText(formData.get("imageUrls"));
  const images = Array.from(new Set([...uploadedImages, ...manualImages])).filter(Boolean);
  const fallbackImage = "/products/placeholder.svg";

  return {
    product: {
      name: formText(formData, "name"),
      description: formText(formData, "description"),
      price: formNumber(formData, "price"),
      categoryId: formText(formData, "categoryId"),
      stockQuantity: Math.floor(formNumber(formData, "stockQuantity")),
      isAvailable: formData.get("isAvailable") === "on",
      imageUrl: images[0] ?? fallbackImage
    },
    images: images.length > 0 ? images : [fallbackImage]
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const payload = await productPayload(formData);

  await prisma.product.create({
    data: {
      ...payload.product,
      images: {
        create: payload.images.map((url, index) => ({
          url,
          sortOrder: index
        }))
      }
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(productId: string, formData: FormData) {
  await requireAdmin();
  const payload = await productPayload(formData);

  await prisma.product.update({
    where: { id: productId },
    data: {
      ...payload.product,
      images: {
        deleteMany: {},
        create: payload.images.map((url, index) => ({
          url,
          sortOrder: index
        }))
      }
    }
  });

  revalidatePath("/");
  revalidatePath(`/products/${productId}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(productId: string) {
  await requireAdmin();

  await prisma.product.delete({
    where: { id: productId }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function toggleProductAvailability(productId: string, isAvailable: boolean) {
  await requireAdmin();

  await prisma.product.update({
    where: { id: productId },
    data: { isAvailable }
  });

  revalidatePath("/");
  revalidatePath(`/products/${productId}`);
  revalidatePath("/admin");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const name = formText(formData, "name");

  await prisma.category.create({
    data: {
      name,
      slug: toSlug(name)
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(categoryId: string, formData: FormData) {
  await requireAdmin();
  const name = formText(formData, "name");

  await prisma.category.update({
    where: { id: categoryId },
    data: {
      name,
      slug: toSlug(name)
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(categoryId: string) {
  await requireAdmin();

  await prisma.category.delete({
    where: { id: categoryId }
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
