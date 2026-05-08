import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import settings from "@/data/site-settings.json";
import HeroEditor from "@/components/admin/HeroEditor";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <HeroEditor initial={settings} />;
}
