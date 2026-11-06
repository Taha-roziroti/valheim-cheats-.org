export interface SiteConfig {
  name: string;
  domain: string;
  title: string;
  description: string;
  /** Legacy field name — checkout URL used where “join” CTAs referenced an external link. */
  discord: string;
}

export interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
  /** When the target section exists on the current page, scroll instead of navigating. */
  scrollTarget?: string;
}

export interface Translations {
  site: SiteConfig;
  nav: NavLink[];
  support: {
    eyebrow: string;
    title: string;
    subtitle: string;
    channels: {
      icon: string;
      title: string;
      desc: string;
      linkLabel: string;
      href: string;
    }[];
    ticketTitle: string;
    ticketItems: { title: string; desc: string }[];
  };
  footer: {
    tagline: string;
    explore: string;
    exploreLinks: NavLink[];
    support: string;
    legal: string;
    privacy: string;
    terms: string;
    about: string;
  };
  legalPages: {
    about: {
      title: string;
      description: string;
      sections: { heading: string; paragraphs: string[] }[];
    };
    privacy: {
      title: string;
      description: string;
      sections: { heading: string; paragraphs: string[] }[];
    };
    terms: {
      title: string;
      description: string;
      sections: { heading: string; paragraphs: string[] }[];
    };
    support: {
      title: string;
      description: string;
    };
  };
  ui: {
    skipLink: string;
    browseCheats: string;
    browseCheatsMobile: string;
    homeAria: string;
    checkoutAria: string;
    checkoutChooseTitle: string;
    checkoutChooseDescription: string;
    checkoutOptionValheim: string;
    checkoutOptionCloudDma: string;
    checkoutOptionHwid: string;
    dialogClose: string;
    discordAria: string;
    menuOpen: string;
    menuClose: string;
    themeLight: string;
    themeDark: string;
  };
}
