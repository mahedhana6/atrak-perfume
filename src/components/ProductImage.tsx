import clsx from "clsx";

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
};

export function ProductImage({ src, alt, className, eager = false }: ProductImageProps) {
  return (
    <img
      src={src || "/products/placeholder.svg"}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={clsx("h-full w-full object-cover", className)}
    />
  );
}
