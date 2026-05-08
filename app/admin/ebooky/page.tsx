import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import ebooks from "@/data/ebooks.json";
import EbooksEditor from "@/components/admin/EbooksEditor";

export const dynamic = "force-dynamic";

export default async function AdminEbooksPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <EbooksEditor initial={ebooks} />;
}
