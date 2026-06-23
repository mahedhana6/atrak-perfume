import crypto from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { toSlug } from "@/lib/format";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function isUploadableFile(file: File) {
  return file.size > 0 && file.size <= MAX_IMAGE_SIZE && file.type.startsWith("image/");
}

function extensionFromFile(file: File) {
  const fromName = path.extname(file.name).toLowerCase();
  if (fromName && fromName.length <= 6) {
    return fromName;
  }

  return file.type === "image/png" ? ".png" : ".jpg";
}

export async function uploadProductImages(files: File[]) {
  const validFiles = files.filter(isUploadableFile);

  if (validFiles.length === 0) {
    return [];
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const uploads = await Promise.all(
      validFiles.map(async (file) => {
        const safeName = `${toSlug(path.parse(file.name).name) || "product"}-${crypto.randomUUID()}${extensionFromFile(file)}`;
        const blob = await put(`products/${safeName}`, file, {
          access: "public",
          addRandomSuffix: false
        });

        return blob.url;
      })
    );

    return uploads;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Set BLOB_READ_WRITE_TOKEN to enable persistent Vercel image uploads.");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const saved = await Promise.all(
    validFiles.map(async (file) => {
      const safeName = `${toSlug(path.parse(file.name).name) || "product"}-${crypto.randomUUID()}${extensionFromFile(file)}`;
      const bytes = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(uploadDir, safeName), bytes);
      return `/uploads/${safeName}`;
    })
  );

  return saved;
}

export function imageUrlsFromText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/\r?\n|,/)
    .map((url) => url.trim())
    .filter(Boolean);
}
