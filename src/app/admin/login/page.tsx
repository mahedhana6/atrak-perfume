import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { getAdminSession } from "@/lib/auth";
import { loginAction } from "./actions";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();
  const params = (await searchParams) ?? {};

  if (session) {
    redirect("/admin");
  }

  const errorMessage =
    params.error === "invalid"
      ? "The email or password is incorrect."
      : params.error === "config"
        ? "Admin credentials are not configured. Check your environment variables."
        : "";

  return (
    <main className="grid min-h-screen place-items-center bg-plum-950 px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-glow">
        <BrandLogo className="mb-8" />
        <h1 className="font-serif text-4xl font-semibold text-ivory">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-ivory/65">
          Sign in to manage products, categories, images, stock, and availability.
        </p>
        {errorMessage && (
          <div className="mt-5 rounded-lg border border-rose-300/30 bg-rose-300/10 p-3 text-sm text-rose-100">
            {errorMessage}
          </div>
        )}
        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ivory">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={process.env.ADMIN_EMAIL ?? "admin@atrak.test"}
              className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-ink/40 px-4 text-ivory outline-none transition focus:border-gold-400"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ivory">Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-ink/40 px-4 text-ivory outline-none transition focus:border-gold-400"
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-6 text-sm font-semibold text-plum-950 transition hover:bg-gold-300"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
