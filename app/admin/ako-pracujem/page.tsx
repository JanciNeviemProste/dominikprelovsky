import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import philosophy from "@/data/philosophy.json";
import PhilosophyEditor from "@/components/admin/PhilosophyEditor";

export const dynamic = "force-dynamic";

export default async function AdminPhilosophyPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <PhilosophyEditor initial={philosophy} />;
}
