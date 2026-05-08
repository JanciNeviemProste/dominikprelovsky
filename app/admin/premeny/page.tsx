import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import transformations from "@/data/transformations.json";
import TransformationsEditor from "@/components/admin/TransformationsEditor";

export const dynamic = "force-dynamic";

export default async function AdminTransformationsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <TransformationsEditor initial={transformations} />;
}
