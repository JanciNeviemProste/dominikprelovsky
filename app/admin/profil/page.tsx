import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import profile from "@/data/profile.json";
import ProfileEditor from "@/components/admin/ProfileEditor";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <ProfileEditor initial={profile} />;
}
