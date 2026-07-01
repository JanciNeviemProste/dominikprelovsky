import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import { isAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPasswordPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      title="ZMENA HESLA"
      subtitle="Nastav si nové heslo do administrácie."
    >
      <ChangePasswordForm />
    </AdminShell>
  );
}
