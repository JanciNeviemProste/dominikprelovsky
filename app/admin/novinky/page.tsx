import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import highlights from "@/data/highlights.json";
import HighlightsEditor from "@/components/admin/HighlightsEditor";

export const dynamic = "force-dynamic";

export default async function AdminHighlightsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <HighlightsEditor initial={highlights} />;
}
