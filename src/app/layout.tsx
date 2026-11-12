import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Instrument_Serif } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "CDMJJ — Comissão de Direitos das Mulheres no Jiu-Jitsu",
    template: "%s · CDMJJ",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "CDMJJ",
    "Comissão de Direitos das Mulheres no Jiu-Jitsu",
    "denúncia de assédio",
    "assédio no jiu-jitsu",
    "mulheres no jiu-jitsu",
    "violência contra a mulher",
    "esporte seguro",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: "Estamos aqui para te ouvir",
    description:
      "Acolhimento, escuta e enfrentamento ao assédio, à violência e à discriminação contra mulheres e meninas no jiu-jitsu.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Estamos aqui para te ouvir — Comissão de Direitos das Mulheres no Jiu-Jitsu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estamos aqui para te ouvir",
    description:
      "Conheça a CDMJJ e o canal de denúncias para mulheres no jiu-jitsu.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "nonprofit",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C8102E",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${anton.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#conteudo"
          className="sr-only z-[100] bg-ink px-4 py-3 text-sm font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>

        <SiteHeader />
        <div id="conteudo" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />

        <noscript>
          <style>{`
            [data-reveal] { opacity: 1 !important; transform: none !important; }
            .typewriter-wrap { display: none !important; }
            .typewriter-fallback { display: inline !important; }
          `}</style>
        </noscript>
      </body>
    </html>
  );
}
