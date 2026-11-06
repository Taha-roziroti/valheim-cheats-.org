import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { SUPPORT_EMAIL } from '../config/site';

export const en: Translations = {
  site: {
    name: 'ValheimCheats',
    domain: 'valheimcheats.org',
    title: 'Valheim Cheats for PC | ESP Features & Guides',
    description:
      'Valheim cheats for Windows PC: ESP features, pricing, Cloud DMA setup, and console command guides at valheimcheats.org.',
    discord: PRIMARY_CHECKOUT_PATH,
  },
  nav: [
    { href: '/valheim-esp/', label: 'Valheim ESP' },
    { href: '/valheim-cheats-pricing/', label: 'Pricing' },
    { href: '/valheim-console-commands/', label: 'Console' },
    { href: '/valheim-cloud-dma/', label: 'Cloud DMA' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/support/', label: 'Support' },
  ],
  support: {
    eyebrow: 'Support',
    title: 'ValheimCheats support',
    subtitle: 'Help with checkout, ESP setup, and Cloud DMA.',
    channels: [
      {
        icon: 'users',
        title: 'Start checkout',
        desc: 'Open the secure checkout for Valheim ESP, Cloud DMA, or HWID tools.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'headphones',
        title: 'Email support',
        desc: 'Questions about orders, compatibility, or setup.',
        linkLabel: SUPPORT_EMAIL,
        href: `mailto:${SUPPORT_EMAIL}`,
      },
      {
        icon: 'navFaq',
        title: 'Read the FAQ',
        desc: 'ESP, pricing, Cloud DMA, and built-in console commands.',
        linkLabel: 'View FAQ',
        href: '/faq/',
      },
      {
        icon: 'clock',
        title: 'Contact page',
        desc: 'All support options in one place.',
        linkLabel: 'Open support',
        href: '/support/',
      },
    ],
    ticketTitle: 'Include in your message',
    ticketItems: [
      { title: 'Order email', desc: 'The address used when you completed checkout.' },
      { title: 'Platform', desc: 'Windows version and whether you use Cloud DMA or a single PC.' },
      { title: 'What you tried', desc: 'Steps taken, error text, or a short screen recording if it helps.' },
    ],
  },
  footer: {
    tagline: 'Valheim cheats — ESP, pricing, Cloud DMA, and console guides. valheimcheats.org',
    explore: 'Explore',
    exploreLinks: [
      { href: '/', label: 'Home', ariaLabel: 'Home' },
      { href: '/valheim-esp/', label: 'Valheim ESP', ariaLabel: 'Valheim ESP' },
      { href: '/valheim-cheats-pricing/', label: 'Pricing', ariaLabel: 'Pricing' },
      { href: '/valheim-cloud-dma/', label: 'Cloud DMA', ariaLabel: 'Cloud DMA' },
      { href: '/valheim-console-commands/', label: 'Console commands', ariaLabel: 'Console commands' },
      { href: '/faq/', label: 'FAQ', ariaLabel: 'FAQ' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About ValheimCheats',
      description:
        'ValheimCheats publishes independent guides and product information for Valheim players on Windows PC.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'ValheimCheats focuses on Valheim ESP features, cheat pricing context, Cloud DMA setup, and built-in devcommands — written for players who want clear, practical information before checkout.',
            'All product names are used for identification only.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'We cover Valheim cheats (ESP overlay), monthly vs lifetime pricing, Hyper-V / Cloud DMA prerequisites, and official in-game console commands for single-player or hosted worlds.',
            'Guides are updated when game or storefront details change. Always confirm the latest version on the page you are reading.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For checkout, licensing, or technical issues, use the Support page. Include your order email, Windows version, and what you already tried.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'How valheimcheats.org handles analytics, cookies, and contact data.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics (page views, device type, browser, approximate region) when enabled. Checkout happens on our partner’s pages — we do not store payment card data on valheimcheats.org.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us improve content and fix broken links. Support messages may retain the email and content you send until your request is resolved.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies where required for analytics or theme preference. You can block cookies in your browser; core content remains available.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'Privacy questions can be sent via the Support page. Purchase rules are in our Terms & Conditions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description: 'Terms for using valheimcheats.org and purchasing through linked checkout.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'By using valheimcheats.org or completing checkout through links we provide, you agree to these Terms and our Privacy Policy.',
          ],
        },
        {
          heading: 'Content',
          paragraphs: [
            'Information on this site is for general guidance. Game features, anti-cheat policies, and third-party tools can change without notice. You are responsible for how you use Valheim and any third-party software.',
          ],
        },
        {
          heading: 'Checkout',
          paragraphs: [
            'Payments and license delivery are handled by external checkout pages. valheimcheats.org does not process or store your card details.',
          ],
        },
        {
          heading: 'Risk',
          paragraphs: [
            'Third-party cheats and tools may violate game or platform rules and can lead to account restrictions. Use them only if you accept that risk.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms; the “Last updated” note on this page will change when we do. Continued use means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Billing and product issues are handled through the channels on the Support page.',
          ],
        },
      ],
    },
    support: {
      title: 'ValheimCheats Support',
      description: 'Get help with Valheim ESP checkout, Cloud DMA setup, and HWID tools.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'ValheimCheats home',
    checkoutAria: 'Start checkout',
    checkoutChooseTitle: 'Choose checkout',
    checkoutChooseDescription: 'Pick the product you want to open. You will continue on our partner checkout.',
    checkoutOptionValheim: 'Valheim plan',
    checkoutOptionCloudDma: 'Cloud DMA add-on',
    checkoutOptionHwid: 'HWID spoofer',
    dialogClose: 'Close dialog',
    discordAria: 'ValheimCheats support',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
  },
};
