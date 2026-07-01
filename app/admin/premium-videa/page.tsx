import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import videos from "@/data/premium-videos.json";
import PremiumVideosEditor from "@/components/admin/PremiumVideosEditor";

export const dynamic = "force-dynamic";

type Video = {
  id: string;
  title: string;
  description?: string;
  provider: "youtube" | "vimeo";
  videoId: string;
};

export default async function AdminPremiumVideosPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <PremiumVideosEditor initial={videos as Video[]} />;
}
