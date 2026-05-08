import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import testimonials from "@/data/testimonials.json";
import TestimonialEditor from "@/components/admin/TestimonialEditor";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return <TestimonialEditor initialTestimonials={testimonials} />;
}
