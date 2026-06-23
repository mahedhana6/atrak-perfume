import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
