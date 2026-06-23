import type { Category } from "@prisma/client";
import { Search, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

type SearchFiltersProps = {
  categories: Category[];
  activeCategory?: string;
  search?: string;
};

export function SearchFilters({ categories, activeCategory, search }: SearchFiltersProps) {
  const searchParams = new URLSearchParams();
  if (search) {
    searchParams.set("q", search);
  }

  return (
    <section id="catalog" className="border-y border-white/10 bg-plum-900/70">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
        <form action="/" className="flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-ink/40 p-2">
          <Search className="ml-3 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
          <input
            name="q"
            defaultValue={search}
            placeholder="Search perfumes, bakhoor, gift sets"
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ivory outline-none placeholder:text-ivory/40"
          />
          {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
          <button
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-gold-400 px-5 text-sm font-semibold text-plum-950 transition hover:bg-gold-300"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Search</span>
          </button>
        </form>
        {(search || activeCategory) && (
          <Link
            href="/#catalog"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 px-5 text-sm font-semibold text-ivory transition hover:border-gold-400 hover:text-gold-300"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear
          </Link>
        )}
      </div>
      <div id="categories" className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8">
        <Link
          href={search ? `/?q=${encodeURIComponent(search)}#catalog` : "/#catalog"}
          className={clsx(
            "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition",
            !activeCategory
              ? "border-gold-400 bg-gold-400 text-plum-950"
              : "border-white/10 text-ivory/75 hover:border-gold-400 hover:text-gold-300"
          )}
        >
          All
        </Link>
        {categories.map((category) => {
          const params = new URLSearchParams(searchParams);
          params.set("category", category.slug);

          return (
            <Link
              key={category.id}
              href={`/?${params.toString()}#catalog`}
              className={clsx(
                "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition",
                activeCategory === category.slug
                  ? "border-gold-400 bg-gold-400 text-plum-950"
                  : "border-white/10 text-ivory/75 hover:border-gold-400 hover:text-gold-300"
              )}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
