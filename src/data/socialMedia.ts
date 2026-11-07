export interface SocialMediaPlatform {
  id: 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'github';
  name: string;
  username: string;
  handle: string;
  url: string;
  description: string;
  badgeColor: string;
  hoverColor: string;
}

export const SOCIAL_USERNAME = 'nepalhealthsewa';
export const OFFICIAL_EMAIL = 'Nepalhealthsewa@gmail.com';

export interface OfficialWebsite {
  name: string;
  label: string;
  url: string;
  domain: string;
  isPrimary?: boolean;
  description: string;
}

export const OFFICIAL_WEBSITES: OfficialWebsite[] = [
  {
    name: 'Official Web Portal',
    label: 'nepalhealthsewa.com',
    url: 'https://nepalhealthsewa.com',
    domain: 'nepalhealthsewa.com',
    isPrimary: true,
    description: 'Primary custom domain and official web portal',
  },
  {
    name: 'Netlify Production Mirror',
    label: 'nepalhealthsewa.netlify.app',
    url: 'https://nepalhealthsewa.netlify.app',
    domain: 'nepalhealthsewa.netlify.app',
    isPrimary: false,
    description: 'High-availability Netlify production deployment',
  },
  {
    name: 'Cloudflare Pages Mirror',
    label: 'nepalhealthsewa.pages.dev',
    url: 'https://nepalhealthsewa.pages.dev',
    domain: 'nepalhealthsewa.pages.dev',
    isPrimary: false,
    description: 'Cloudflare Pages edge mirror for fast global loading',
  },
];

export const OFFICIAL_SOCIAL_MEDIAS: SocialMediaPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    username: 'nepalhealthsewa',
    handle: '@nepalhealthsewa',
    url: 'https://www.facebook.com/nepalhealthsewa',
    description: 'Community blood alerts, live camp updates, and health discussions',
    badgeColor: 'bg-blue-600/10 text-blue-600 border-blue-200 dark:border-blue-900',
    hoverColor: 'hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: 'nepalhealthsewa',
    handle: '@nepalhealthsewa',
    url: 'https://www.instagram.com/nepalhealthsewa',
    description: 'Photo highlights from field camps, donor spotlights, and infographics',
    badgeColor: 'bg-pink-600/10 text-pink-600 border-pink-200 dark:border-pink-900',
    hoverColor: 'hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    username: 'nepalhealthsewa',
    handle: '@nepalhealthsewa',
    url: 'https://www.youtube.com/@nepalhealthsewa',
    description: 'Educational healthcare tutorials, camp documentaries, and donor talks',
    badgeColor: 'bg-red-600/10 text-red-600 border-red-200 dark:border-red-900',
    hoverColor: 'hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10',
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    username: 'nepalhealthsewa',
    handle: '@nepalhealthsewa',
    url: 'https://twitter.com/nepalhealthsewa',
    description: 'Urgent rare-blood broadcasts, public health alerts, and instant advisories',
    badgeColor: 'bg-sky-600/10 text-sky-600 border-sky-200 dark:border-sky-900',
    hoverColor: 'hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'nepalhealthsewa',
    handle: 'nepalhealthsewa',
    url: 'https://www.linkedin.com/in/nepalhealthsewa',
    description: 'Institutional partnerships, volunteer recruitment, and medical research outreach',
    badgeColor: 'bg-blue-700/10 text-blue-700 border-blue-200 dark:border-blue-900',
    hoverColor: 'hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10',
  },
  {
    id: 'github',
    name: 'GitHub',
    username: 'nepalhealthsewa',
    handle: 'nepalhealthsewa',
    url: 'https://github.com/nepalhealthsewa',
    description: 'Open-source digital health tools, medical calculators, and public repositories',
    badgeColor: 'bg-slate-800/10 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700',
    hoverColor: 'hover:text-white hover:border-slate-500 hover:bg-slate-800',
  },
];
