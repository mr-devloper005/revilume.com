import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Articles and business discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Articles and business discovery',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Visuals', href: '/image-sharing' },
      { label: 'Listings', href: '/listing' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Create', href: '/create' },
    },
  },
  footer: {
    tagline: 'Articles, listings, and useful resources',
    description: 'Revilume brings practical reading and business discovery together for readers, professionals, students, researchers, businesses, and customers.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/article' },
          { label: 'Listings', href: '/listing' },
          { label: 'Images', href: '/image' },
          { label: 'PDF Library', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean reading and business discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
