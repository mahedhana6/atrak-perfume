import { LayoutDashboard, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-plum-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo />
        <nav className="hidden items-center gap-6 text-sm font-medium text-ivory/75 md:flex">
          <a href="/#catalog" className="transition hover:text-gold-300">
            Catalog
          </a>
          <a href="/#categories" className="transition hover:text-gold-300">
            Categories
          </a>
          <Link href="/admin" className="transition hover:text-gold-300">
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/#catalog"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory transition hover:border-gold-400 hover:text-gold-300"
            title="Search catalog"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/admin"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300 transition hover:bg-gold-400/20"
            title="Admin dashboard"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
          </Link>
          <span
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-ivory text-plum-950 sm:inline-flex"
            title="Atrak Parfumeria"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </header>
  );
}
