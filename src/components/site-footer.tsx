import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";

import { InstagramIcon } from "@/components/instagram-icon";
import { siteConfig, siteNav } from "@/lib/site";

export function SiteFooter() {
  // Atualize esta constante anualmente ou ao revisar o conteúdo do site.
  const year = 2026;

  return (
    <footer className="bg-ink text-paper">
      <div className="shell">
        <div className="flex flex-col items-center border-b border-paper/15 py-16 text-center md:py-20">
          <Link
            href="/"
            aria-label="Ir para a página inicial da CDMJJ"
            className="inline-flex"
          >
            <Image
              src="/logo-cdmjj-white.png"
              alt="Logo da Comissão de Direitos das Mulheres no Jiu-Jitsu"
              width={1064}
              height={1011}
              className="h-[126px] w-auto"
            />
          </Link>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/60">
            Protegemos mulheres e meninas, educamos para transformar a cultura
            e ampliamos o protagonismo feminino no jiu-jitsu.
          </p>

          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2.5 border border-paper/20 px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-paper/80 transition-colors hover:border-paper/50 hover:text-paper"
          >
            <InstagramIcon className="size-4 text-red" />
            @cdmjj no Instagram
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>

          <div className="mt-14 grid w-full max-w-3xl gap-10 border-t border-paper/15 pt-10 sm:grid-cols-2 sm:gap-16">
            <div className="flex flex-col items-center">
              <p className="eyebrow text-red">Navegação</p>
              <ul className="mt-5 space-y-3 text-sm text-paper/70">
                <li>
                  <Link className="link-line inline-block" href="/">
                    Início
                  </Link>
                </li>
                {siteNav.map((item) => (
                  <li key={item.href}>
                    <Link className="link-line inline-block" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className="link-line inline-block"
                    href="/privacidade"
                  >
                    Aviso de privacidade
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center">
              <p className="eyebrow text-red">Canal</p>
              <ul className="mt-5 space-y-3 text-sm text-paper/70">
                <li className="flex items-center justify-center gap-2.5">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-4 shrink-0 text-red"
                  />
                  Denúncia anônima ou identificada
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="flex items-center justify-center gap-2.5 break-all transition-colors hover:text-paper"
                  >
                    <Mail
                      aria-hidden="true"
                      className="size-4 shrink-0 text-red"
                    />
                    {siteConfig.contactEmail}
                  </a>
                </li>
              </ul>
              <Link
                href="/denuncia"
                className="mt-6 inline-flex items-center gap-2 bg-red px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Fazer denúncia
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 py-6 text-center text-[11px] leading-relaxed text-paper/40">
          <p>
            © {year} Comissão de Direitos das Mulheres no Jiu-Jitsu. Todos os
            direitos reservados.
          </p>
          <p>
            Este site não substitui os serviços de emergência ou atendimento
            especializado.
          </p>
        </div>
      </div>
    </footer>
  );
}
