export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/**
 * Single source of truth for the primary navigation.
 * Add a page here and it shows up in the header (and dropdowns) automatically.
 */
export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about", description: "Who we are" },
      { label: "Team", href: "/about/team", description: "The people behind the work" },
      { label: "History", href: "/about/history", description: "Our journey so far" },
    ],
  },
  {
    label: "Capabilities",
    href: "/capabilities",
  },
  {
    label: "Platforms",
    href: "/platforms",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
