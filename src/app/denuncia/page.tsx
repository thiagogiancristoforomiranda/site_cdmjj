import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";

import { DenunciaForm } from "@/components/denuncia-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Fazer uma denúncia",
  description:
    "Canal de denúncias da Comissão de Direitos das Mulheres no Jiu-Jitsu. Denuncie de forma anônima ou identificada, com acolhimento e sigilo.",
  alternates: { canonical: "/denuncia" },
  robots: { index: false, follow: false },
};

const safetyPoints = [
  {
    icon: ShieldCheck,
    title: "Anônima ou identificada",
    text: "Você escolhe se quer informar seu nome.",
  },
  {
    icon: LockKeyhole,
    title: "Sem armazenamento no site",
    text: "O relato é enviado por e-mail, não fica em um banco de dados.",
  },
];

export default function DenunciaPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-ink/15">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="hero-grid absolute inset-0 opacity-70" />
          <span className="absolute -right-24 top-10 size-[24rem] rounded-full border border-red/20" />
          <span className="absolute -bottom-40 -left-24 size-[30rem] rounded-full border border-ink/10" />
        </div>

        <div className="shell relative grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-red">
                <span aria-hidden="true" className="h-px w-8 bg-red" />
                Canal de Denúncias e Ouvidoria
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="display mt-6 text-[clamp(2.9rem,8.5vw,6.8rem)]">
                Sua voz.
                <br />
                No seu tempo.
                <br />
                <span className="shine-text font-serif text-[1.04em] font-normal italic normal-case leading-[0.82]">
                  Com segurança.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl">
                Um espaço para mulheres e meninas que sofreram assédio,
                violência ou discriminação no jiu-jitsu. Você escolhe como
                falar.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.16}>
              <aside className="mx-auto max-w-md border-2 border-ink bg-paper-strong p-6 shadow-[10px_10px_0_0_var(--red)] md:p-7 lg:ml-auto lg:mr-0 lg:shadow-[14px_14px_0_0_var(--red)]">
                <p className="eyebrow text-red">Antes de começar</p>
                <h2 className="display mt-3 text-4xl leading-[0.94]">
                  Simples e sigiloso.
                </h2>

                <ul className="mt-6 space-y-4">
                  {safetyPoints.map((point) => {
                    const Icon = point.icon;

                    return (
                      <li key={point.title} className="flex items-start gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center border border-red/30 text-red">
                          <Icon aria-hidden="true" className="size-3.5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold leading-snug text-ink">
                            {point.title}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-ink/55">
                            {point.text}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <DenunciaForm />
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-8">
                <div className="bg-ink p-6 text-paper">
                  <p className="eyebrow flex items-center gap-2 text-red">
                    <MessagesSquare aria-hidden="true" className="size-4" />
                    Antes de enviar
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-relaxed text-paper/70">
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-red" />
                      Você não precisa provar nada nem ter todos os detalhes.
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-red" />
                      Conte no seu tempo. Sua segurança vem primeiro.
                    </li>
                  </ul>
                </div>

                <div className="border border-ink/15 bg-paper-strong p-6">
                  <p className="eyebrow flex items-center gap-2 text-red">
                    <FileText aria-hidden="true" className="size-4" />
                    O que acontece depois
                  </p>
                  <ol className="mt-5 space-y-4">
                    {[
                      "Seu relato chega ao e-mail institucional da CDMJJ.",
                      "A equipe lê e acolhe conforme os protocolos da Comissão.",
                      "Se você deixou contato, podemos retornar com orientações.",
                    ].map((step, index) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink/65"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center bg-ink font-display text-[11px] text-paper">
                          0{index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <Link
                    href="/privacidade"
                    className="link-line mt-5 inline-block text-[10px] font-bold uppercase tracking-[0.13em] text-red"
                  >
                    Ler o aviso de privacidade
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
