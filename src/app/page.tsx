import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  MoveRight,
} from "lucide-react";

import { PillarsSection } from "@/components/pillars-section";
import { Reveal } from "@/components/reveal";
import { TypewriterWord } from "@/components/typewriter-word";
import { PILLAR_FLOW, PILLAR_WORDS } from "@/lib/pillars";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Estamos aqui para te ouvir",
  description:
    "Conheça a Comissão de Direitos das Mulheres no Jiu-Jitsu e os cinco pilares que orientam sua atuação pela proteção, educação, incidência política, monitoramento e valorização das mulheres no esporte.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-cdmjj.png`,
    description: siteConfig.description,
    areaServed: "BR",
    ...(siteConfig.instagram ? { sameAs: [siteConfig.instagram] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-ink/15 bg-paper">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-grid absolute inset-0" />
            <span className="absolute -right-40 -top-48 size-[34rem] rounded-full border border-ink/10" />
            <span className="absolute -right-16 top-8 size-[22rem] rounded-full border border-red/20" />
            <Asterisk className="spin-slow absolute right-[5%] top-[15%] hidden size-36 text-red/25 lg:block" />
            <span className="display absolute -bottom-8 left-1/2 -translate-x-1/2 text-[22vw] leading-none text-ink/[0.032]">
              CDMJJ
            </span>
          </div>

          <div className="shell relative grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/60">
                  <span aria-hidden="true" className="h-2 w-2 bg-red" />
                  Comissão de Direitos das Mulheres no Jiu-Jitsu
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="display mt-7 text-[clamp(2.75rem,10.5vw,8.5rem)]">
                  <span className="sr-only">Estamos aqui para te ouvir.</span>
                  <span aria-hidden="true">
                    <span className="block">Estamos aqui</span>
                    <span className="block">
                      para te{" "}
                      <span className="font-serif text-[1.08em] font-normal italic normal-case leading-[0.8] text-red">
                        <TypewriterWord text="ouvir." />
                      </span>
                    </span>
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.13}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl">
                  Um canal de acolhimento, escuta e enfrentamento ao assédio, à
                  violência e à discriminação contra mulheres e meninas no
                  jiu-jitsu. Aqui, sua voz tem espaço, respeito e sigilo.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/denuncia"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 bg-ink px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-red"
                  >
                    Fazer uma denúncia
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                  <Link
                    href="#comissao"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 border border-ink/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-white/40"
                  >
                    Conhecer a Comissão
                    <ArrowDown
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-y-0.5"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:pt-14">
              <Reveal delay={0.18}>
                <div className="relative mx-auto max-w-sm lg:ml-auto">
                  <div className="border-2 border-ink bg-paper-strong p-6 shadow-[10px_10px_0_0_var(--red)] md:p-7 md:shadow-[14px_14px_0_0_var(--red)]">
                    <p className="eyebrow text-red">Canal de acolhimento</p>
                    <p className="display mt-4 text-4xl leading-[0.94]">
                      Você no controle.
                    </p>

                    <ul className="mt-6 space-y-3 text-sm leading-snug text-ink/70">
                      {[
                        "Anônima ou identificada",
                        "Escuta qualificada e sigilosa",
                        "Orientação e encaminhamento",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-red text-paper">
                            <Check aria-hidden="true" className="size-3" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee overflow-hidden border-b border-ink bg-ink py-3.5 text-paper">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((group) => (
              <div
                key={group}
                aria-hidden={group === 1}
                className="flex shrink-0 items-center"
              >
                {PILLAR_WORDS.map((word) => (
                  <span
                    key={`${group}-${word}`}
                    className="flex items-center gap-6 pr-6"
                  >
                    <span className="display text-lg tracking-[0.04em] text-paper/90">
                      {word}
                    </span>
                    <Asterisk className="size-4 text-red" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <section
          id="comissao"
          className="border-b border-ink/15 py-20 md:py-28"
        >
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="eyebrow flex items-center gap-3 text-red">
                    <span aria-hidden="true" className="h-px w-8 bg-red" />
                    01 / A Comissão
                  </p>
                  <h2 className="display mt-6 text-[clamp(3rem,5.6vw,5.25rem)]">
                    Uma comissão para{" "}
                    <span className="text-red">transformar</span> o jiu-jitsu.
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <figure className="mt-10 hidden w-full max-w-xs border border-ink/15 bg-paper-strong p-6 lg:block">
                    <Image
                      src="/logo-cdmjj.png"
                      alt="Marca da Comissão de Direitos das Mulheres no Jiu-Jitsu"
                      width={1064}
                      height={1011}
                      className="h-auto w-full"
                    />
                    <figcaption className="mt-4 border-t border-ink/10 pt-3 text-[10px] uppercase leading-relaxed tracking-[0.13em] text-ink/45">
                      Proteger, educar, articular, monitorar e valorizar.
                    </figcaption>
                  </figure>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:pt-12">
                <Reveal delay={0.06}>
                  <p className="text-2xl font-medium leading-snug tracking-[-0.01em] md:text-3xl">
                    Somos uma comissão dedicada a proteger mulheres e meninas,
                    transformar a cultura do jiu-jitsu e incidir sobre
                    estruturas e políticas — dentro das academias, nas
                    competições e em toda a cadeia profissional do esporte.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <PillarsSection />

        {/* Logic */}
        <section
          id="atuacao"
          className="relative overflow-hidden border-b border-paper/10 bg-ink py-20 text-paper md:py-28"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <span className="absolute -right-32 -top-40 size-[32rem] rounded-full bg-red/15 blur-[110px]" />
            <span className="absolute -bottom-48 -left-32 size-[26rem] rounded-full border border-paper/10" />
          </div>

          <div className="shell relative">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow flex items-center gap-3 text-red">
                    <span aria-hidden="true" className="h-px w-8 bg-red" />
                    03 / A lógica dos cinco pilares
                  </p>
                  <h2 className="display mt-6 text-[clamp(3rem,6.5vw,6rem)]">
                    Do acolhimento à{" "}
                    <span className="text-red">transformação social.</span>
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-5 lg:pt-14">
                <Reveal delay={0.1}>
                  <p className="max-w-md text-base leading-relaxed text-paper/60">
                    Os pilares não funcionam isolados. Eles formam um ciclo
                    contínuo de proteção, educação, incidência, evidências e
                    oportunidades para mulheres no jiu-jitsu.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="mt-14 grid gap-px bg-paper/15 md:grid-cols-5">
              {PILLAR_FLOW.map((step, index) => (
                <Reveal key={step.verb} delay={index * 0.06}>
                  <div className="group relative h-full bg-ink p-6 transition-colors hover:bg-ink-soft md:p-7">
                    <div className="flex items-start justify-between gap-2">
                      <span className="display text-5xl text-paper/20 transition-colors group-hover:text-red">
                        0{index + 1}
                      </span>
                      {index < PILLAR_FLOW.length - 1 ? (
                        <MoveRight
                          aria-hidden="true"
                          className="mt-2 hidden size-4 text-red/60 md:block"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="mt-2 size-2 bg-red md:block"
                        />
                      )}
                    </div>
                    <h3 className="display mt-6 text-2xl text-red">
                      {step.verb}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper/55">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-red text-paper">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
          >
            <span className="absolute -left-24 -top-32 size-[28rem] rounded-full border border-paper/30" />
            <span className="absolute -bottom-40 -right-20 size-[34rem] rounded-full border border-ink/30" />
            <span className="display text-outline-light absolute -bottom-10 right-0 text-[18vw] leading-none">
              OUVIR
            </span>
          </div>

          <div className="shell relative grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-paper/60">Sua voz importa</p>
                <h2 className="display mt-5 text-[clamp(3.5rem,8.5vw,8rem)]">
                  Você não
                  <br />
                  está{" "}
                  <span className="font-serif font-normal italic normal-case text-ink">
                    sozinha
                  </span>
                  .
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="max-w-md text-base leading-relaxed text-paper/85 md:text-lg">
                  Se você sofreu assédio, violência ou discriminação no
                  jiu-jitsu, este canal existe para te ouvir. Você decide se
                  quer se identificar ou permanecer anônima.
                </p>
                <Link
                  href="/denuncia"
                  className="group mt-7 inline-flex min-h-14 items-center justify-center gap-3 bg-ink px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
                >
                  Quero fazer uma denúncia
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
