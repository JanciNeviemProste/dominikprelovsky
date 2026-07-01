import data from "@/data/premium-videos.json";

export interface PremiumVideo {
  id: string;
  title: string;
  description?: string;
  provider: "youtube" | "vimeo";
  /** ID videa (nie celá URL) — napr. YouTube "dQw4w9WgXcQ" alebo Vimeo "123456789". */
  videoId: string;
}

export const premiumVideos = data as PremiumVideo[];

// Bezpečný embed URL — z uloženého providera + ID (nikdy nie surová URL od používateľa).
export function premiumEmbedUrl(v: PremiumVideo): string {
  const id = encodeURIComponent(v.videoId);
  return v.provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${id}`
    : `https://player.vimeo.com/video/${id}`;
}
