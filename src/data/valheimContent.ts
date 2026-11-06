/**
 * Cursor-ready SEO content for valheimcheats.org
 *
 * Render intro paragraphs below each H1.
 * Render sections as H2 headings with paragraphs and optional bullet lists.
 * Render FAQs as visible FAQ content.
 * Render internalLinks as normal website navigation links.
 */

export type ValheimContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
};

export type ValheimFaq = {
  question: string;
  answer: string;
};

export type ValheimProductScreenshot = {
  /** Absolute site path to WebP (e.g. /images/product/…webp) */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

/** Wide hero banner (e.g. homepage only) */
export type ValheimHeroImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ValheimSeoPage = {
  slug: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string[];
  sections: ValheimContentSection[];
  faq: ValheimFaq[];
  internalLinks: { href: string; anchor: string }[];
  imageAltPatterns: string[];
  /** Optional in-client product UI screenshots */
  productScreenshots?: ValheimProductScreenshot[];
  /** Optional top-of-page hero (typically homepage) */
  heroImage?: ValheimHeroImage;
};

export const valheimSeoPages: Record<string, ValheimSeoPage> = {
  // =====================================================
  // PAGE 1 — HOMEPAGE
  // =====================================================

  home: {
    slug: '/',
    titleTag: 'Valheim Cheats for PC | ESP Features & Setup',
    metaDescription:
      'Explore Valheim cheats for Windows PC, see player and resource ESP features, compare plans, and review the setup requirements.',
    h1: 'Valheim Cheats for Windows PC',
    primaryKeyword: 'Valheim cheats',
    secondaryKeywords: [
      'Valheim hacks',
      'Valheim cheats for PC',
      'Valheim cheat menu',
    ],

    heroImage: {
      src: '/images/hero/valheim-promo-hero.webp',
      width: 1024,
      height: 576,
      alt: 'Official Valheim game artwork: two Vikings on a grassy overlook facing a misty valley, snow-capped mountains, and the Valheim logo',
    },

    intro: [
      'Valheim has a way of turning a simple trip into an entire expedition. You leave the base looking for a few resources, spot something interesting on the horizon, and suddenly the evening is spent exploring another stretch of the map. A little more information can make those journeys feel much more focused.',

      'Valheimcheats.org brings the key details together in one place: the Valheim ESP feature set, the available access plans, and the Windows setup used for supported builds. Explore the features below, then visit the dedicated pages for a closer look at individual tools and requirements.',
    ],

    sections: [
      {
        heading: 'A More Informative Way to Explore Valheim',

        paragraphs: [
          'The appeal of Valheim is its sense of discovery. Forest paths lead to new resources, coastlines open into unfamiliar waters, and every biome has its own landmarks and challenges. The Valheim cheats experience featured here is built around visual information, helping make important points of interest easier to identify while you play.',

          'Instead of treating every feature as a separate destination, the product brings several useful ESP categories into one interface. That gives the experience a clear focus: see the information that matters to your current expedition and keep your attention on the world around you.',
        ],
      },

      {
        heading: 'Explore the Valheim ESP Feature Set',

        paragraphs: [
          'The feature set covers players, ore, bosses, ships, and creatures. Each category has a different role in Valheim, from keeping track of activity nearby to making resource runs and journeys across the water easier to plan. The stream-proof overlay is another part of the package, with a display mode designed to keep ESP markers and menus out of OBS, Streamlabs, and most capture tools.',

          'For a closer breakdown of each category, visit the dedicated Valheim ESP page. It explains the player, resource, boss, ship, and creature markers in more detail and gives you a single place to review the available features.',
        ],

        bullets: [
          {
            label: 'Player ESP',
            text: 'A visual overview focused on player markers.',
          },
          {
            label: 'Ore ESP',
            text: 'A resource-focused view for ore locations.',
          },
          {
            label: 'Boss ESP',
            text: 'Markers centered on Valheim boss encounters.',
          },
          {
            label: 'Ship and creature ESP',
            text: 'Additional visibility categories for travel and exploration.',
          },
          {
            label: 'Stream-proof overlay',
            text: 'A display mode designed for common capture and streaming tools.',
          },
        ],
      },

      {
        heading: 'Designed Around a Windows PC Setup',

        paragraphs: [
          'The Valheim product supports Windows 10 and Windows 11. The listed system requirements include a dedicated graphics card and at least 8 GB of RAM, together with HVCI, Core Isolation, TPM, and Secure Boot enabled. Full functionality on supported builds uses the Cloud DMA setup.',

          'Cloud DMA is configured around one Windows PC and a Hyper-V-based virtual environment on that same machine. It is not a second-computer setup. The technical guide covers the Windows edition, virtualization, memory, and additional components involved, so you can review the full configuration before getting started.',
        ],
      },

      {
        heading: 'Choose the Details You Want to Explore Next',

        paragraphs: [
          'Some players arrive looking for a specific feature. Others want to compare the monthly and lifetime plans or understand the technical setup first. The pages below are organized around those different questions, making it easy to move from a quick overview to the detail you need.',

          'The product page is the best place to explore the full ESP feature list. The pricing page sets out the available access options, while the Cloud DMA guide explains the single-PC configuration. For built-in Valheim commands such as devcommands, god mode, and item spawning, use the separate console guide.',
        ],
      },
    ],

    faq: [
      {
        question: 'What features are included with the Valheim cheats product?',
        answer:
          'The listed features are Player ESP, Ore ESP, Boss ESP, Ship ESP, Creature ESP, and a stream-proof overlay. The dedicated Valheim ESP page explains each category.',
      },
      {
        question: 'Which operating systems are supported?',
        answer:
          'The Valheim product lists support for Windows 10 and Windows 11. It also lists a dedicated GPU, at least 8 GB of RAM, and several Windows security and virtualization requirements.',
      },
      {
        question: 'Is Cloud DMA part of the Valheim setup?',
        answer:
          'Cloud DMA is required for full functionality on supported builds. Its setup uses a Hyper-V-based environment on a single Windows PC. See the Cloud DMA guide for the full requirements.',
      },
    ],

    internalLinks: [
      { href: '/valheim-esp/', anchor: 'Explore Valheim ESP Features' },
      { href: '/valheim-cheats-pricing/', anchor: 'Compare Valheim Cheats Pricing' },
      { href: '/valheim-cloud-dma/', anchor: 'Read the Cloud DMA Setup Guide' },
      { href: '/valheim-console-commands/', anchor: 'Browse Valheim Console Commands' },
    ],

    imageAltPatterns: [
      'Valheim gameplay showing [verified ESP feature] in [biome]',
      'Valheim ESP overview showing [player, ore, boss, ship, or creature marker]',
      'Valheim Windows PC gameplay with [verified feature] visible',
    ],

    productScreenshots: [
      {
        src: '/images/product/valheim-menu-visuals.webp',
        width: 1024,
        height: 646,
        alt: 'Valheim cheat client Visuals tab showing entity ESP options, creature ESP in biomes, distance slider, and ore and ship overlay toggles',
        caption: 'Visuals — entity ESP, creature ESP, markers, and overlay options',
      },
      {
        src: '/images/product/valheim-menu-world.webp',
        width: 1024,
        height: 646,
        alt: 'Valheim cheat client World tab showing World ESP, Show Distance on, and World Distance slider at 150 meters',
        caption: 'World — world ESP and distance settings',
      },
      {
        src: '/images/product/valheim-menu-misc.webp',
        width: 1024,
        height: 646,
        alt: 'Valheim cheat client Misc tab with stream-proof toggle, menu keys, and Cloud DMA and AWS connection status',
        caption: 'Misc — stream-proof mode and cloud connection status',
      },
    ],
  },

  // =====================================================
  // PAGE 2 — VALHEIM ESP PRODUCT PAGE
  // =====================================================

  esp: {
    slug: '/valheim-esp/',
    titleTag: 'Valheim ESP for PC | Player, Ore & Boss Markers',
    metaDescription:
      'Explore Valheim ESP for players, ore, bosses, ships, and creatures, plus the overlay and Windows requirements for supported builds.',
    h1: 'Valheim ESP Features for Windows PC',
    primaryKeyword: 'Valheim ESP',
    secondaryKeywords: [
      'Valheim player ESP',
      'Valheim resource ESP',
      'Valheim boss ESP',
    ],

    intro: [
      'Valheim rewards preparation, but the world rarely sticks to your plan. A resource trip can turn into a detour, a quiet shoreline can lead to a new discovery, and a route you have traveled before can still hold something worth noticing. Valheim ESP is centered on making key visual information easier to follow while you move through the world.',

      'The available feature categories cover players, ore, bosses, ships, and creatures, with a stream-proof overlay mode included. This page looks at what each category is designed to show and how the Windows setup fits together.',
    ],

    sections: [
      {
        heading: 'Player ESP and Nearby Activity',

        paragraphs: [
          'Player ESP gives the interface a player-focused view of the game world. It is intended for situations where awareness of player positions is useful, whether you are moving between areas, checking the surroundings, or spending time in a shared world.',

          'The goal of a clear ESP layout is readability. Markers should be easy to distinguish from the landscape, so the information can be checked at a glance without taking over the screen. Use the in-product visuals to see how the available player markers are presented in the current build.',
        ],
      },

      {
        heading: 'Resource and Ore ESP for More Focused Runs',

        paragraphs: [
          'Resource gathering is part of almost every Valheim progression loop. You might set out for ore, gather materials for a new workbench upgrade, or look for the ingredients needed to prepare for another biome. Resource ESP puts the ore category at the center of that search.',

          'Valheim resource ESP is a natural fit for players who want to plan gathering sessions around specific destinations. Rather than turning the page into a long list of every resource in the game, this feature overview stays focused on the ore markers included in the product.',
        ],
      },

      {
        heading: 'Boss, Ship, and Creature Markers',

        paragraphs: [
          "Valheim's world is shaped by its biomes, creatures, and major encounters. Boss ESP, Ship ESP, and Creature ESP extend the feature set beyond gathering, giving each of these categories its own place in the overall view.",

          'Boss markers are centered on major encounters. Ship markers relate to journeys across the water, while creature markers add another visual category for exploring the environment. Together with player and ore ESP, they form the core set of Valheim ESP features listed for the product.',
        ],

        bullets: [
          {
            label: 'Boss ESP',
            text: 'A category for boss-related markers.',
          },
          {
            label: 'Ship ESP',
            text: 'A category for ship-related visibility.',
          },
          {
            label: 'Creature ESP',
            text: 'A category for creature markers around the world.',
          },
        ],
      },

      {
        heading: 'Stream-Proof Overlay Mode',

        paragraphs: [
          'The stream-proof overlay is designed for players who capture or broadcast gameplay. Its purpose is to keep ESP markers and menus out of OBS, Streamlabs, and most capture tools, allowing the game view to remain the focus of the recording or stream.',

          'Capture software and configurations can differ, so use the current feature demonstration to review how the mode is presented. The product page includes a showcase of the Valheim interface and its available overlay features.',
        ],
      },

      {
        heading: 'Windows Requirements and Cloud DMA',

        paragraphs: [
          'The Valheim product lists Windows 10 and Windows 11 support, a dedicated GPU, and a minimum of 8 GB RAM. HVCI, Core Isolation, TPM, and Secure Boot are also listed as enabled requirements. Cloud DMA is required for full functionality on supported builds.',

          'Cloud DMA uses a Hyper-V-based virtual environment on the same Windows PC. Its setup has additional requirements around CPU virtualization, the Hyper-V role, memory, and internet connectivity. Visit the Cloud DMA guide for the complete checklist, then review the pricing page to compare the available access options.',
        ],
      },
    ],

    faq: [
      {
        question: 'Which ESP categories are included for Valheim?',
        answer:
          'The listed categories are Player, Ore, Boss, Ship, and Creature ESP. A stream-proof overlay is also included in the feature list.',
      },
      {
        question: 'Does Valheim ESP include a stream-proof overlay?',
        answer:
          'Yes. The listed stream-proof mode is designed to hide ESP markers and menus from OBS, Streamlabs, and most capture tools.',
      },
      {
        question: 'What is required to run Valheim ESP?',
        answer:
          'The listed setup supports Windows 10 and 11, calls for at least 8 GB RAM and a dedicated GPU, and requires HVCI, Core Isolation, TPM, and Secure Boot. Cloud DMA is required for full functionality on supported builds.',
      },
    ],

    internalLinks: [
      { href: '/', anchor: 'Return to the Valheim Cheats Overview' },
      { href: '/valheim-cheats-pricing/', anchor: 'View Monthly and Lifetime Pricing' },
      { href: '/valheim-cloud-dma/', anchor: 'Review Cloud DMA Requirements' },
      { href: '/valheim-console-commands/', anchor: 'Read the Valheim Console Commands Guide' },
    ],

    imageAltPatterns: [
      'Valheim player ESP overlay showing [verified marker]',
      'Valheim ore ESP feature preview in [biome]',
      'Valheim boss ESP feature preview during [encounter]',
      'Valheim ship and creature ESP gameplay preview',
      'Valheim stream-proof overlay feature in Windows gameplay',
    ],

    productScreenshots: [
      {
        src: '/images/product/valheim-menu-visuals.webp',
        width: 1024,
        height: 646,
        alt: 'Valheim cheat client Visuals tab showing entity ESP options, creature ESP in biomes, distance slider, and ore and ship overlay toggles',
        caption: 'Visuals tab — ESP categories and overlay controls',
      },
      {
        src: '/images/product/valheim-menu-world.webp',
        width: 1024,
        height: 646,
        alt: 'Valheim cheat client World tab showing World ESP, Show Distance on, and World Distance slider at 150 meters',
        caption: 'World tab — world ESP and distance',
      },
    ],
  },

  // =====================================================
  // PAGE 3 — PRICING PAGE
  // =====================================================

  pricing: {
    slug: '/valheim-cheats-pricing/',
    titleTag: 'Valheim Cheats Price | Monthly vs Lifetime',
    metaDescription:
      'Compare Valheim cheats pricing, review monthly and lifetime access, and understand the Cloud DMA components used in the setup.',
    h1: 'Valheim Cheats Price and Plan Comparison',
    primaryKeyword: 'Valheim cheats price',
    secondaryKeywords: [
      'Valheim cheats monthly price',
      'Valheim cheats lifetime price',
      'Valheim cheats cost',
    ],

    intro: [
      'Choosing a Valheim plan comes down to how you prefer to access the feature set. The current product listing has two options: monthly access and lifetime access. Both are listed with the same Valheim ESP features, so the main difference is the access period and payment structure.',

      'This page puts the listed prices in one place and explains how the Valheim product fits with the Cloud DMA setup. Looking at both parts together makes it easier to understand the full configuration before you choose a plan.',
    ],

    sections: [
      {
        heading: 'Valheim Cheats Plans at a Glance',

        paragraphs: [
          'The Valheim product listing currently shows a $35 monthly option and a $150 lifetime option. Both plans are shown with the same feature set, including Player ESP, Ore ESP, Boss ESP, Ship ESP, Creature ESP, and the stream-proof overlay.',

          'The monthly option is suited to a shorter access period, while lifetime access is presented as a one-time payment for ongoing access. Choose the structure that best matches how often you expect to play and how you prefer to manage software purchases.',
        ],

        bullets: [
          {
            label: 'Monthly access — $35',
            text: 'A recurring access option for players who prefer a shorter commitment.',
          },
          {
            label: 'Lifetime access — $150',
            text: 'A one-time payment option for ongoing access to the listed Valheim feature set.',
          },
        ],
      },

      {
        heading: 'What the Valheim Plan Includes',

        paragraphs: [
          'The listed Valheim feature set is the same across the monthly and lifetime options. It covers player, ore, boss, ship, and creature ESP, together with a stream-proof overlay mode. That means the plan comparison is about access structure rather than choosing between different feature tiers.',

          'For a closer look at each category, visit the Valheim ESP page. It explains how the feature groups fit into exploration, resource gathering, travel, and major encounters.',
        ],
      },

      {
        heading: 'How Cloud DMA Fits Into the Overall Cost',

        paragraphs: [
          'Cloud DMA is required for full functionality on supported Valheim builds. Its current listing shows a $50 lifetime option and describes a single-PC setup using a Hyper-V-based virtual environment. This is a separate part of the configuration from the Valheim access plan.',

          'The Cloud DMA setup also lists GREENWARD, Static Server, and AWS as required components. Each is identified as a separate purchase, and Static Server and AWS are distinct components. Include these items when working out the full setup budget, and use the live checkout total for the current regional amount.',
        ],
      },

      {
        heading: 'Review Your PC Setup Before Choosing',

        paragraphs: [
          'The Valheim product lists Windows 10 and Windows 11 support, at least 8 GB RAM, and a dedicated GPU. HVCI, Core Isolation, TPM, and Secure Boot are also listed as enabled requirements. Cloud DMA adds requirements for CPU virtualization, Hyper-V, memory, and a stable broadband connection.',

          'The Cloud DMA guide brings those technical details together in a checklist. Reviewing it alongside the Valheim ESP feature page gives you a clearer picture of both the software and the setup involved.',
        ],
      },
    ],

    faq: [
      {
        question: 'How much do Valheim cheats cost?',
        answer:
          'The current Valheim listing shows $35 for monthly access and $150 for lifetime access. Check the live plan display for the current checkout total.',
      },
      {
        question: 'Do the monthly and lifetime plans have different features?',
        answer:
          'The current listing shows the same Valheim feature set for both options: Player, Ore, Boss, Ship, and Creature ESP, plus a stream-proof overlay.',
      },
      {
        question: 'Is Cloud DMA included in the Valheim plan price?',
        answer:
          'Cloud DMA is listed as a separate required part of the setup for full functionality on supported builds. Its page currently lists a $50 lifetime option and identifies GREENWARD, Static Server, and AWS as additional required purchases.',
      },
    ],

    internalLinks: [
      { href: '/valheim-esp/', anchor: 'Explore the Included Valheim ESP Features' },
      { href: '/valheim-cloud-dma/', anchor: 'See Cloud DMA Setup and Components' },
      { href: '/', anchor: 'Return to the Valheim Cheats Overview' },
      { href: '/valheim-console-commands/', anchor: 'Browse the Free Console Commands Guide' },
    ],

    imageAltPatterns: [
      'Valheim monthly and lifetime access plan comparison',
      'Valheim cheats pricing options displayed on a PC screen',
      'Cloud DMA setup components and requirements overview',
    ],
  },

  // =====================================================
  // PAGE 4 — CLOUD DMA TECHNICAL GUIDE
  // =====================================================

  cloudDma: {
    slug: '/valheim-cloud-dma/',
    titleTag: 'Cloud DMA for Valheim | Setup & Requirements',
    metaDescription:
      'Understand Cloud DMA for Valheim, including its single-PC Hyper-V setup, Windows requirements, virtualization, and required components.',
    h1: 'Cloud DMA for Valheim: Requirements and Setup',
    primaryKeyword: 'Cloud DMA for Valheim',
    secondaryKeywords: [
      'Valheim Cloud DMA requirements',
      'Cloud DMA setup for Valheim',
      'Cloud DMA compatibility Valheim',
    ],

    intro: [
      'Cloud DMA is the technical layer used for full functionality on supported builds of the Valheim feature set. Its setup is designed around one Windows PC, where an installer provisions a Hyper-V-based virtual environment and completes activation through an encrypted service link.',

      'That single-PC design is an important part of understanding the configuration. The setup does not call for a second physical tower, an external DMA box, or a PCIe bridge. This guide covers the Windows features, hardware capabilities, and additional components listed for Cloud DMA.',
    ],

    sections: [
      {
        heading: 'How Cloud DMA Fits the Valheim Setup',

        paragraphs: [
          'The Valheim product lists Cloud DMA as required for full functionality on supported builds. Cloud DMA provides the underlying environment used by the supported feature stack, with the installer setting up a Hyper-V-based virtual environment on the same PC used for gaming.',

          'The workflow is built around a single machine rather than a separate hardware tower. The installer provisions the virtual environment and completes activation over an encrypted service link. This makes the Windows configuration and firmware virtualization settings central parts of preparation.',
        ],
      },

      {
        heading: 'The Single-PC Hyper-V Architecture',

        paragraphs: [
          'Cloud DMA uses Hyper-V on the Windows PC. CPU virtualization must be enabled in the system firmware, using Intel VT-x or AMD-V depending on the processor. The Windows installation also needs to support enabling the Hyper-V role during the guided setup; Windows Pro, Enterprise, or Education editions are recommended in the setup notes.',

          'The listed memory requirement is 8 GB RAM minimum, with 16 GB recommended. A stable broadband connection is also required for activation and ongoing service connectivity. These details are worth checking before starting the installation so the system is ready for the guided configuration.',
        ],
      },

      {
        heading: 'Windows Security and Virtualization Requirements',

        paragraphs: [
          'The Cloud DMA requirements list Windows 10 or Windows 11 in 64-bit form, along with several Windows security settings. HVCI, Core Isolation, TPM, and Secure Boot are all listed as enabled requirements. CPU virtualization must also be available and enabled in firmware for Hyper-V.',

          'Use this checklist to review the main configuration points before setup:',
        ],

        bullets: [
          {
            label: 'Operating system',
            text: 'Windows 10 or Windows 11, 64-bit.',
          },
          {
            label: 'Windows security',
            text: 'HVCI, Core Isolation, TPM, and Secure Boot enabled.',
          },
          {
            label: 'Processor virtualization',
            text: 'Intel VT-x or AMD-V enabled in firmware.',
          },
          {
            label: 'Hyper-V',
            text: 'Ability to enable the Hyper-V role; Windows Pro, Enterprise, or Education recommended.',
          },
          {
            label: 'Memory',
            text: '8 GB RAM minimum; 16 GB recommended.',
          },
          {
            label: 'Connection',
            text: 'Stable broadband internet for activation and ongoing service connectivity.',
          },
        ],
      },

      {
        heading: 'Additional Components in the Cloud DMA Configuration',

        paragraphs: [
          'The Cloud DMA setup lists GREENWARD, Static Server, and AWS as required components. They are separate items in the configuration, and Static Server and AWS serve as two distinct components. Keep all three on the setup checklist when planning the complete configuration.',

          'The current Cloud DMA listing shows a $50 lifetime option for the Cloud DMA layer itself. The additional components have their own separate pricing, so use the live checkout details for the current total rather than treating the Cloud DMA listing as the price of every required item combined.',
        ],
      },

      {
        heading: 'A Practical Setup Checklist',

        paragraphs: [
          'Start by confirming the Windows edition and checking that the system has the required security settings enabled. Next, confirm that CPU virtualization is available in firmware and that the Hyper-V role can be enabled on the Windows installation. Check memory and internet connectivity, then review the current installation walkthrough before running the guided setup.',

          'Once the Windows environment is ready, keep the required components together and follow the setup instructions in order. The Valheim ESP page explains the in-game feature categories, while the pricing page lays out the access options and the Cloud DMA component cost.',
        ],
      },
    ],

    faq: [
      {
        question: 'Does Cloud DMA for Valheim require a second PC?',
        answer:
          'No. The listed configuration is designed for one Windows PC using a Hyper-V-based virtual environment on that same machine. It does not require a second physical tower or an external DMA box.',
      },
      {
        question: 'Which Windows versions are listed for Cloud DMA?',
        answer:
          'The Cloud DMA requirements list Windows 10 and Windows 11, 64-bit. The setup notes recommend Windows Pro, Enterprise, or Education for enabling the Hyper-V role.',
      },
      {
        question: 'How much RAM is recommended?',
        answer: 'The listed minimum is 8 GB RAM, with 16 GB recommended.',
      },
      {
        question: 'Which additional components are required?',
        answer:
          'The configuration lists GREENWARD, Static Server, and AWS as required separate components. Static Server and AWS are distinct items.',
      },
    ],

    internalLinks: [
      { href: '/valheim-esp/', anchor: 'Explore Valheim ESP Features' },
      { href: '/valheim-cheats-pricing/', anchor: 'Compare Valheim Plan and Cloud DMA Pricing' },
      { href: '/', anchor: 'Return to the Valheim Cheats Overview' },
    ],

    imageAltPatterns: [
      'Windows Hyper-V setup for Cloud DMA on a single PC',
      'Windows 11 virtualization settings used for Cloud DMA setup',
      'Cloud DMA system requirements checklist for Valheim',
      'Single-PC Cloud DMA architecture diagram',
    ],

    productScreenshots: [
      {
        src: '/images/product/valheim-menu-misc.webp',
        width: 1024,
        height: 646,
        alt: 'Valheim cheat client Misc tab with stream-proof toggle and Cloud DMA and AWS shown as connected',
        caption: 'In-client Cloud DMA and AWS status (Misc tab)',
      },
    ],
  },

  // =====================================================
  // PAGE 5 — VALHEIM CONSOLE COMMANDS GUIDE
  // =====================================================

  consoleCommands: {
    slug: '/valheim-console-commands/',
    titleTag: 'Valheim Console Commands & Devcommands Guide',
    metaDescription:
      'Learn how to open the Valheim console, enable devcommands, and use common commands for god mode, flying, and spawning items.',
    h1: 'Valheim Console Commands and Devcommands',
    primaryKeyword: 'Valheim console commands',
    secondaryKeywords: [
      'Valheim devcommands',
      'Valheim god mode command',
      'Valheim spawn command',
    ],

    intro: [
      "Valheim's developer console gives players a direct way to enter commands while a world is running. It can be useful for testing builds, trying out creative ideas, moving around a familiar area, or learning how different parts of the game behave.",

      'The first step is enabling the console. From there, the devcommands command unlocks the main set of cheat commands, including familiar options such as god mode, flying, and item spawning. This guide covers the basic PC workflow and a handful of commands worth knowing.',
    ],

    sections: [
      {
        heading: 'How to Open the Valheim Developer Console',

        paragraphs: [
          'On a PC, the console is opened with F5 while you are inside a Valheim world. If the console does not appear, make sure console access is enabled for the way you launch the game. On Steam, open Valheim\'s Properties from your Library and add `-console` to the Launch Options field, then start the game through Steam.',

          'Once the world has loaded, press F5 to open the console. You can enter commands in the console window and press Enter to run them. The official Valheim support guide also documents the controller shortcut for opening the console: LB + LT + Start.',
        ],
      },

      {
        heading: 'Enable Valheim Devcommands',

        paragraphs: [
          'With the console open, type `devcommands` and press Enter. This enables the main developer and cheat command set for the current session. Entering `devcommands` again switches that command set off.',

          'If you are learning the available options, start with the console\'s `help` command to view the commands recognized by your current game build. Command availability can depend on the session and its permissions, so use the in-game command list as your reference when exploring less familiar options.',
        ],
      },

      {
        heading: 'Useful Commands: God Mode, Fly, and More',

        paragraphs: [
          'A few commands are especially recognizable because they change how you move through or interact with the world. After enabling devcommands, enter a command by itself and press Enter. Commands that work as toggles can be entered again to switch the effect off.',
        ],

        bullets: [
          {
            label: '`god`',
            text: 'Toggles god mode.',
          },
          {
            label: '`fly`',
            text: 'Toggles flying mode.',
          },
          {
            label: '`ghost`',
            text: 'Toggles ghost mode.',
          },
          {
            label: '`nocost`',
            text: 'Toggles the no-cost building mode.',
          },
          {
            label: '`help`',
            text: 'Displays command information for the current build.',
          },
        ],
      },

      {
        heading: 'Using the Valheim Spawn Command',

        paragraphs: [
          'The spawn command is used to create an item or creature in the world. Its basic structure is `spawn [item] [quantity]`. Replace `[item]` with the item\'s internal name and `[quantity]` with the number you want to create.',

          'For example, `spawn wood 10` follows the command structure for creating ten units of wood. The exact item identifier matters, so check the spelling used by the current game data when a command does not return the item you expected. The same general approach can be used with supported creature identifiers.',
        ],
      },

      {
        heading: 'Console Commands and ESP Serve Different Purposes',

        paragraphs: [
          'Valheim console commands are built-in text commands. They change or inspect aspects of the game session, such as movement modes, building rules, or spawned items. They are useful for experimentation and for understanding the game\'s own developer tools.',

          'Valheim ESP is a separate visual feature set focused on markers for players, ore, bosses, ships, and creatures. The two approaches answer different questions: console commands let you enter instructions, while ESP presents selected information as an overlay during gameplay. Visit the Valheim ESP page for the product feature breakdown.',
        ],
      },
    ],

    faq: [
      {
        question: 'What key opens the Valheim console on PC?',
        answer:
          'Press F5 while inside a world. On Steam, add `-console` to Valheim\'s Launch Options if console access has not been enabled, then launch the game through Steam.',
      },
      {
        question: 'How do I enable devcommands in Valheim?',
        answer:
          'Open the console, type `devcommands`, and press Enter. Enter the command again to switch the developer command set off.',
      },
      {
        question: 'What is the Valheim god mode command?',
        answer: 'After enabling devcommands, enter `god` in the console to toggle god mode.',
      },
      {
        question: 'How do I spawn items in Valheim?',
        answer:
          'Use the structure `spawn [item] [quantity]`, replacing the placeholders with the item\'s internal identifier and the number to create.',
      },
    ],

    internalLinks: [
      { href: '/', anchor: 'Explore Valheim Cheats for PC' },
      { href: '/valheim-esp/', anchor: 'See Valheim ESP Features' },
      { href: '/valheim-cheats-pricing/', anchor: 'View Valheim Plan Pricing' },
    ],

    imageAltPatterns: [
      'Valheim F5 developer console showing [command]',
      'Valheim devcommands entered in the in-game console',
      'Valheim god mode command example on PC',
      'Valheim spawn command example for [item]',
    ],
  },
};

export function listValheimPages(): ValheimSeoPage[] {
  return Object.values(valheimSeoPages);
}

export function getValheimPageByPath(pathname: string): ValheimSeoPage | undefined {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return listValheimPages().find((p) => p.slug === path);
}
