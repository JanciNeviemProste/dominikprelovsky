import React from 'react';

interface YouTubeWelcomeSectionProps {
  youtubeUrl?: string;
}

function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (parsed.pathname.startsWith('/embed/')) return url;
    }
    return null;
  } catch {
    return null;
  }
}

export const YouTubeWelcomeSection: React.FC<YouTubeWelcomeSectionProps> = ({ youtubeUrl }) => {
  if (!youtubeUrl) return null;
  const embed = toEmbedUrl(youtubeUrl);
  if (!embed) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="font-heading text-5xl md:text-6xl text-black mb-4"
            style={{ textTransform: 'none' }}
          >
            Privítam ťa
          </h2>
          <p className="font-body text-lg text-[var(--color-text-tertiary)] max-w-2xl mx-auto">
            Krátke video o tom, ako spolupráca prebieha a ako vyzerá cesta k výsledku.
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black">
          <iframe
            src={embed}
            title="Uvítacie video — Dominik Prelovský"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
