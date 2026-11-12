"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChartNoAxesCombined,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { PILLARS } from "@/lib/pillars";

const pillarIcons = {
  shield: ShieldCheck,
  graduation: GraduationCap,
  landmark: Landmark,
  chart: ChartNoAxesCombined,
  sparkles: Sparkles,
} as const;

export function PillarsSection() {
  const [activePillar, setActivePillar] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible[0]) {
          const index = Number(
            (visible[0].target as HTMLElement).dataset.index ?? 0,
          );
          setActivePillar(index);
        }
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    })

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pilares" className="border-b border-ink/15 py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-10">
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-red">
                  <span aria-hidden="true" className="h-px w-8 bg-red" />
                  02 / Nossos pilares
                </p>
                <h2 className="display mt-6 text-[clamp(3rem,6vw,5.5rem)]">
                  Cinco pilares.
                  <br />
                  <span className="text-red">Um só compromisso.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65">
                  A CDMJJ estrutura sua atuação em cinco pilares complementares,
                  que abrangem da proteção de mulheres e meninas à ampliação do
                  protagonismo feminino no esporte.
                </p>
              </Reveal>

              <nav
                aria-label="Pilares da CDMJJ"
                className="mt-9 hidden space-y-1 lg:block"
              >
                {PILLARS.map((pillar, index) => (
                  <a
                    key={pillar.id}
                    href={`#${pillar.id}`}
                    aria-current={activePillar === index ? "true" : undefined}
                    className={`flex items-center gap-4 border-l-2 py-2.5 pl-4 text-sm transition-colors ${
                      activePillar === index
                        ? "border-red font-semibold text-ink"
                        : "border-ink/15 text-ink/45 hover:border-ink/40 hover:text-ink/75"
                    }`}
                  >
                    <span
                      className={`font-display text-xs ${
                        activePillar === index ? "text-red" : "text-ink/30"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    {pillar.shortTitle}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            <nav
              aria-label="Pilares da CDMJJ"
              className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 lg:hidden"
            >
              {PILLARS.map((pillar, index) => (
                <a
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  aria-current={activePillar === index ? "true" : undefined}
                  className={`shrink-0 border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    activePillar === index
                      ? "border-red bg-red text-paper"
                      : "border-ink/20 text-ink/60"
                  }`}
                >
                  0{index + 1} {pillar.shortTitle}
                </a>
              ))}
            </nav>

            <div>
              {PILLARS.map((pillar, index) => {
                const Icon = pillarIcons[pillar.icon];

                return (
                  <Reveal key={pillar.id} delay={index === 0 ? 0 : 0.04}>
                    <article
                      ref={(element) => {
                        sectionRefs.current[index] = element;
                      }}
                      data-index={index}
                      id={pillar.id}
                      className="group border-t border-ink/20 py-9 md:py-12"
                    >
                      <div className="grid gap-5 md:grid-cols-[92px_1fr] md:gap-7">
                        <div className="flex items-start justify-between md:block">
                          <span
                            aria-hidden="true"
                            className="text-outline display text-6xl transition-all duration-300 group-hover:text-red group-hover:[-webkit-text-stroke:0px] md:text-7xl"
                          >
                            0{index + 1}
                          </span>
                          <span className="flex size-9 items-center justify-center border border-red/30 text-red md:mt-5">
                            <Icon aria-hidden="true" className="size-4" />
                          </span>
                        </div>

                        <div>
                          <p className="eyebrow text-red">
                            Pilar 0{index + 1}
                          </p>
                          <h3 className="display mt-3 text-[clamp(2rem,4.2vw,3.5rem)]">
                            {pillar.title}
                          </h3>
                          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/68">
                            {pillar.description}
                          </p>

                          <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                            {pillar.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/75"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-2 size-1.5 shrink-0 bg-red"
                                />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
