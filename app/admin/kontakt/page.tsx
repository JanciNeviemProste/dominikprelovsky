import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import settings from "@/data/site-settings.json";
import ContactEditor from "@/components/admin/ContactEditor";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <ContactEditor initial={settings} />;
}
