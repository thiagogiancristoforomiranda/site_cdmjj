const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const siteConfig = {
  name: "Comissão de Direitos das Mulheres no Jiu-Jitsu",
  shortName: "CDMJJ",
  description:
    "Canal de acolhimento, escuta e enfrentamento ao assédio, à violência e à discriminação contra mulheres e meninas no jiu-jitsu.",
  url: rawSiteUrl.replace(/\/$/, ""),
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "cdmjiujitsu@gmail.com",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
    "https://www.instagram.com/cdmjj/",
} as const;

export const siteNav = [
  { href: "/#comissao", label: "A Comissão" },
  { href: "/#pilares", label: "Pilares" },
  { href: "/#atuacao", label: "Como atuamos" },
] as const;

export const emergencyInfo = {
  police: "190",
  women: "180",
} as const;
