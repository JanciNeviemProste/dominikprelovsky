import React from 'react';
import Link from 'next/link';
import { InstagramIcon, YouTubeIcon, ApplePodcastsIcon, SpotifyIcon } from '../icons';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  handle: string;
  color: string;
}

export const SocialLinksSection: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: <InstagramIcon className="w-16 h-16" />,
      url: 'https://www.instagram.com/fitcoach_dominprelovsky/',
      handle: '@fitcoach_dominprelovsky',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
    },
    {
      name: 'Facebook',
      icon: <InstagramIcon className="w-16 h-16" />,
      url: 'https://www.facebook.com/dominikprelovsky',
      handle: '/dominikprelovsky',
      color: 'hover:bg-[#1877F2]',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[var(--max-width-container)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className={`bg-[#eeeeee] p-8 text-center transition-all duration-300 ${link.color} hover:text-white`}>
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {link.icon}
                  </div>
                </div>

                {/* Platform Name */}
                <h3 className="font-heading text-xl text-black group-hover:text-white mb-2 transition-colors duration-300">
                  {link.name}
                </h3>

                {/* Handle */}
                <p className="font-body text-sm text-gray-600 group-hover:text-white transition-colors duration-300">
                  {link.handle}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 flex justify-center">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
