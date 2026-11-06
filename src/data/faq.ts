import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, ROUTES } from '../utils/path';

export type FaqTopic = 'all' | 'esp' | 'pricing' | 'dma' | 'console' | 'safety' | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const espPage = link('Valheim ESP overview', ROUTES.valheimEsp);
const pricingPage = link('pricing page', ROUTES.pricing);
const dmaPage = link('Cloud DMA guide', ROUTES.cloudDma);
const consolePage = link('console commands guide', ROUTES.consoleCommands);
const faqPage = link('full FAQ', ROUTES.faq);
const supportPage = link('Support', ROUTES.support);
const checkout = link('checkout', ROUTES.checkoutValheim);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does the Valheim ESP show?',
    a: `The ESP is an overlay for Windows that highlights players, ore, bosses, ships, creatures, and other points of interest. Details are listed on the ${espPage}.`,
  },
  {
    id: 'cloud-dma-needed',
    topic: 'dma',
    icon: 'faqPlatforms',
    q: 'Do I need Cloud DMA?',
    a: `Full ESP functionality on supported setups often uses a Cloud DMA workflow (Hyper-V, second machine, or similar). See the ${dmaPage} for prerequisites and purchase — it is separate from the main Valheim plan.`,
  },
  {
    id: 'pricing-plans',
    topic: 'pricing',
    icon: 'faqRankTiers',
    q: 'What plans are available?',
    a: `Plans are summarized on the ${pricingPage} (for example monthly vs lifetime where offered). ${checkout} opens the current partner flow.`,
  },
  {
    id: 'console-vs-cheats',
    topic: 'console',
    icon: 'faqBlogVsCheats',
    q: 'Are built-in console commands the same as cheats?',
    a: `No. Valve’s devcommands work in worlds where you enable them (single-player or a server you control). They are not the same as third-party ESP software — see ${consolePage} for the official command list.`,
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party tools?',
    a: a(
      'Yes — any client modification can break game or platform rules and may lead to restrictions. Use third-party software only if you accept that risk.',
    ),
  },
  {
    id: 'platform',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platform is supported?',
    a: a('Guides on this site target Valheim on Windows PC. macOS and Linux are not covered here.'),
  },
  {
    id: 'after-purchase',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a(
      'Follow the instructions in your checkout confirmation and any setup email from the seller. If something fails, contact support with your order email and Windows version.',
    ),
  },
  {
    id: 'hwid-tool',
    topic: 'setup',
    icon: 'faqHwidWhen',
    q: 'What is the HWID spoofer checkout?',
    a: `Some players need a separate hardware-ID tool from the partner store. You can open it from the header checkout chooser or ${supportPage} if you are unsure whether it applies to your case.`,
  },
  {
    id: 'refund',
    topic: 'pricing',
    icon: 'faqMore',
    q: 'Who handles refunds?',
    a: a(
      'Refunds and license disputes follow the policy shown at checkout and in our Terms & Conditions. This site does not process payments directly.',
    ),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `You are on it — use the topic filters above, or open ${faqPage} anytime. For one-on-one help, use ${supportPage}.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['what-is-esp', 'cloud-dma-needed', 'pricing-plans', 'ban-risk', 'platform', 'after-purchase'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Filter questions about ESP, pricing, Cloud DMA, console commands, safety, and setup.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'esp',
  'pricing',
  'dma',
  'console',
  'safety',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Short answers related to what you are reading — open the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}
