import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import services from "@/data/services.json";
import ServicesEditor from "@/components/admin/ServicesEditor";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <ServicesEditor initial={services} />;
}
