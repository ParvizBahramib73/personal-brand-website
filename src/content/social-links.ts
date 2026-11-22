import { site } from "@/lib/site";

export const socialLinks = [
  { platform: "github", label: "GitHub", href: site.github, external: true },
  { platform: "linkedin", label: "LinkedIn", href: site.linkedin, external: true },
  { platform: "instagram", label: "Instagram", href: site.instagram, external: true },
  { platform: "whatsapp", label: "WhatsApp", href: site.whatsapp, external: true },
  { platform: "email", label: "Email", href: `mailto:${site.email}`, external: false },
] as const;

export type SocialPlatform = (typeof socialLinks)[number]["platform"];
