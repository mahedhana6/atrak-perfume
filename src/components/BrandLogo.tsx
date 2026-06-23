import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type BrandLogoProps = {
  compact?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

export function BrandLogo({ compact = false, tone = "light", className }: BrandLogoProps) {
  return (
    <Link href="/" className={clsx("group inline-flex items-center gap-3", className)}>
      <span className="relative h-12 w-12 overflow-hidden rounded-full border border-gold-400/60 bg-plum-900 shadow-glow">
        <Image
          src="/brand/atrak.jpg"
          alt="Atrak Parfumeria logo"
          fill
          sizes="48px"
          className="object-cover"
          priority
        />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span
            className={clsx(
              "block font-serif text-xl font-semibold",
              tone === "light" ? "text-ivory" : "text-plum-950"
            )}
          >
            Atrak
          </span>
          <span
            className={clsx(
              "block text-xs font-medium uppercase",
              tone === "light" ? "text-gold-300" : "text-gold-600"
            )}
          >
            Parfumeria
          </span>
        </span>
      )}
    </Link>
  );
}
