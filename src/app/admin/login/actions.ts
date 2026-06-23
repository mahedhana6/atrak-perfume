"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  validateAdminCredentials
} from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  let valid = false;

  try {
    valid = await validateAdminCredentials(email, password);
  } catch {
    redirect("/admin/login?error=config");
  }

  if (!valid) {
    redirect("/admin/login?error=invalid");
  }

  await createAdminSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
