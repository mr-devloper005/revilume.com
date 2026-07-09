import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Revilume ideas and everyday discovery',
      description: 'Explore useful ideas, fresh perspectives, and practical public resources through Revilume.',
      openGraphTitle: 'Revilume ideas and everyday discovery',
      openGraphDescription: 'Discover useful knowledge and practical resources in a polished Revilume experience.',
      keywords: ['Revilume', 'ideas', 'discovery', 'public resources'],
    },
    hero: {
      badge: 'Ideas and everyday discovery',
      title: ['Ideas that brighten', 'the way forward.'],
      description: 'Explore useful knowledge, fresh perspectives, and connected resources for curious minds.',
      primaryCta: { label: 'Start exploring', href: '/search' },
      secondaryCta: { label: 'About Revilume', href: '/about' },
      searchPlaceholder: 'Search ideas, resources, and topics',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for calm browsing and connected discovery.',
      paragraphs: [
        'Revilume brings useful knowledge, visual inspiration, and practical resources together so visitors can explore naturally.',
        'Instead of separating related ideas into disconnected spaces, the experience keeps them within easy reach through clear navigation.',
        'Wherever someone begins, they can continue discovering helpful context and new perspectives without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A clear homepage with a strong emphasis on ideas and imagery.',
        'Connected paths for useful knowledge and supporting resources.',
        'A cleaner browsing rhythm that makes exploration feel easier.',
        'Lightweight interactions that keep the experience fast and comfortable.',
      ],
      primaryLink: { label: 'Start exploring', href: '/search' },
      secondaryLink: { label: 'About Revilume', href: '/about' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore ideas and resources through one connected experience.',
      description: 'Move between fresh perspectives and useful resources through one clear visual system.',
      primaryCta: { label: 'Explore Revilume', href: '/search' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to explore content.',
    description: `${slot4BrandConfig.siteName} is built to make long-form reading, visual discovery, and supporting resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Articles, visual posts, listings, resources, and profiles stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find articles, listings, and resources faster.',
      description: 'Use keywords, categories, and content types to discover useful Revilume posts from every active section.',
      placeholder: 'Search by keyword, business, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Share something worth discovering.',
      description: 'Add a clear title, useful context, and supporting details to prepare your next Revilume submission.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
