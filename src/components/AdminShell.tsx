import { Boxes, LayoutDashboard, LogOut, Plus, Tags } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { logoutAction } from "@/app/admin/login/actions";

type AdminShellProps = {
  email: string;
  children: React.ReactNode;
};

export function AdminShell({ email, children }: AdminShellProps) {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-plum-950/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <BrandLogo tone="dark" />
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-plum-950/70">
            <Link
              href="/admin"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-plum-950/10 px-4 transition hover:border-gold-500 hover:text-plum-950"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
            <Link
              href="/admin/products/new"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-plum-950/10 px-4 transition hover:border-gold-500 hover:text-plum-950"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add product
            </Link>
            <Link
              href="/admin/categories"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-plum-950/10 px-4 transition hover:border-gold-500 hover:text-plum-950"
            >
              <Tags className="h-4 w-4" aria-hidden="true" />
              Categories
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-plum-950/10 px-4 transition hover:border-gold-500 hover:text-plum-950"
            >
              <Boxes className="h-4 w-4" aria-hidden="true" />
              Storefront
            </Link>
          </nav>
          <form action={logoutAction} className="flex items-center gap-3 text-sm text-plum-950/60">
            <span className="hidden sm:inline">{email}</span>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-plum-950 px-4 font-semibold text-ivory transition hover:bg-plum-800"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </main>
  );
}
