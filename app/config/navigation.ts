export type NavLink = {
  label: string;
  href: string;
};

/**
 * Single source of truth for site navigation.
 * Used by both the Header (drawer) and the Footer.
 */

// Primary pages
export const pageLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/capabilities" },
  { label: "Affiliations", href: "#affiliations" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "/contact" },
];

// Focus / sector areas
export const focusLinks: NavLink[] = [
  { label: "Aerospace", href: "/capabilities" },
  { label: "Defence", href: "/platforms" },
  { label: "Advanced Systems", href: "/capabilities" },
  { label: "Petrochemical", href: "/capabilities" },
];

// Social profiles
export const socialLinks: NavLink[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
];
