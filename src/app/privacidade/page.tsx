import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Mail, ShieldCheck, Siren } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { emergencyInfo, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidade",
  description:
    "Como o Canal de Denúncias da Comissão de Direitos das Mulheres no Jiu-Jitsu trata as informações enviadas pelas mulheres e meninas.",
  alternates: { canonical: "/privacidade" },
};

const sections = [
  {
    title: "Quais dados podem ser enviados",
    content: (
      <>
        <p>
          O formulário solicita apenas as informações que você escolher
          compartilhar. A <strong>idade é obrigatória</strong> para que a CDMJJ
          possa compreender a faixa etária das vítimas e orientar suas ações de
          proteção e prevenção. O relato também é necessário para que a denúncia
          exista.
        </p>
        <p>
          Nome, e-mail e telefone só são solicitados se você escolher a opção
          identificada. Cidade, academia, local, data e outras informações de
          contexto são opcionais e podem ser deixadas em branco.
        </p>
      </>
    ),
  },
  {
    title: "Para que usamos as informações",
    content: (
      <>
        <p>
          As informações são usadas para acolhimento, escuta qualificada,
          orientação, encaminhamento e acompanhamento da denúncia, conforme os
          protocolos da Comissão. Também podem ser usadas, de forma agregada e
          sem identificar pessoas, para produção de evidências, monitoramento e
          formulação de políticas de proteção às mulheres no jiu-jitsu.
        </p>
        <p>
          Relatos individuais não são publicados. A CDMJJ não vende dados
          pessoais.
        </p>
      </>
    ),
  },
  {
    title: "Se você escolher o anonimato",
    content: (
      <>
        <p>
          No modo anônimo, nome, e-mail e telefone não são coletados. O servidor
          descarta esses campos mesmo que sejam enviados por engano. A idade
          continua obrigatória e os demais campos de contexto são opcionais.
        </p>
        <p>
          Como não há contato, o protocolo exibido após o envio é a sua
          referência para uma eventual comunicação futura com a CDMJJ.
        </p>
      </>
    ),
  },
  {
    title: "Como o envio funciona",
    content: (
      <>
        <p>
          A denúncia é transmitida por conexão HTTPS e enviada por e-mail ao
          endereço institucional da CDMJJ por meio de um provedor de e-mail
          transacional. O site não mantém um banco de dados com os relatos.
        </p>
        <p>
          O provedor de e-mail processa a mensagem apenas para realizar a
          entrega. O conteúdo permanece na caixa de entrada institucional da
          Comissão, sob responsabilidade da equipe que a acessa.
        </p>
      </>
    ),
  },
  {
    title: "Compartilhamento",
    content: (
      <p>
        As informações não são compartilhadas para fins comerciais. Poderá
        haver compartilhamento quando estritamente necessário para a proteção
        da pessoa, para atendimento de obrigação legal, para exercício regular
        de direitos ou com o seu consentimento, observados os protocolos de
        sigilo da Comissão.
      </p>
    ),
  },
  {
    title: "Por quanto tempo ficam guardadas",
    content: (
      <p>
        O site não armazena os relatos. O prazo de guarda do e-mail
        institucional segue a política interna da CDMJJ e as obrigações legais
        aplicáveis. A Comissão deve manter seus prazos de retenção documentados
        e revisá-los periodicamente, garantindo que os dados sejam eliminados
        ou anonimizados quando não forem mais necessários.
      </p>
    ),
  },
  {
    title: "Seus direitos",
    content: (
      <>
        <p>
          Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode
          solicitar confirmação de tratamento, acesso, correção, anonimização,
          bloqueio ou eliminação de dados, além de informações sobre
          compartilhamento. Para exercer seus direitos, entre em contato pelo
          canal de atendimento da CDMJJ e informe que se trata de uma
          solicitação de privacidade.
        </p>
        <p>
          Como o site não mantém um banco de dados, pedidos de acesso ou
          eliminação de um relato devem ser direcionados à equipe que administra
          o e-mail institucional do canal.
        </p>
      </>
    ),
  },
  {
    title: "Segurança e cookies",
    content: (
      <>
        <p>
          O site usa HTTPS, restringe o envio de e-mail ao endereço institucional
          configurado e aplica medidas básicas de proteção contra abuso, como
          limite de tentativas e campo anti-robô. Nenhum sistema é totalmente
          imune a falhas; por isso, orientamos que você não inclua informações
          que não sejam necessárias e que procure ajuda imediata em situações de
          risco.
        </p>
        <p>
          Este site não utiliza cookies de publicidade ou ferramentas de
          análise de comportamento. Não há rastreamento de terceiros.
        </p>
      </>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-ink/15">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="hero-grid absolute inset-0 opacity-60" />
          <span className="absolute -right-24 top-0 size-[24rem] rounded-full border border-red/20" />
        </div>

        <div className="shell relative grid gap-10 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-red">
                <span aria-hidden="true" className="h-px w-8 bg-red" />
                Transparência e cuidado
              </p>
              <h1 className="display mt-6 text-[clamp(3rem,7vw,6.5rem)]">
                Aviso de
                <br />
                <span className="font-serif text-[1.04em] font-normal italic normal-case leading-[0.82] text-red">
                  privacidade.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
                Este aviso explica, de forma direta, como o Canal de Denúncias
                da CDMJJ trata as informações que você compartilha. Nosso
                compromisso é usar seus dados com cuidado, sigilo e respeito.
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink/40">
                Última atualização: novembro de 2026
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={0.12}>
              <div className="border-2 border-ink bg-paper-strong p-6">
                <p className="eyebrow flex items-center gap-2 text-red">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  Em resumo
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/65">
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-red" />
                    A idade é obrigatória; demais dados de identificação são
                    opcionais.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-red" />
                    No modo anônimo, nome e contato não são coletados.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-red" />
                    O site não mantém banco de dados com os relatos.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-red" />
                    Não usamos cookies de publicidade ou rastreamento.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <article className="lg:col-span-8">
              <div className="divide-y divide-ink/15">
                {sections.map((section, index) => (
                  <Reveal key={section.title}>
                    <section className="py-8 first:pt-0">
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-xs text-red">
                          0{index + 1}
                        </span>
                        <h2 className="display text-3xl md:text-4xl">
                          {section.title}
                        </h2>
                      </div>
                      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/65 [&_strong]:font-semibold [&_strong]:text-ink">
                        {section.content}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-8">
                <div className="border border-ink/15 bg-paper-strong p-6">
                  <p className="eyebrow flex items-center gap-2 text-red">
                    <Mail aria-hidden="true" className="size-4" />
                    Fale com a CDMJJ
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    Para dúvidas sobre privacidade ou para exercer seus
                    direitos, use o canal de atendimento da Comissão.
                  </p>
                  {siteConfig.contactEmail ? (
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="mt-3 block break-all text-sm font-semibold text-red underline underline-offset-2"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  ) : null}
                  <Link
                    href="/denuncia"
                    className="mt-5 inline-flex items-center gap-2 bg-ink px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-red"
                  >
                    Acessar o canal
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>

                <div className="border border-red bg-red p-6 text-paper">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em]">
                    <Siren aria-hidden="true" className="size-4" />
                    Emergência
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/85">
                    Se você está em risco imediato, ligue 190. Para orientação e
                    apoio à mulher, ligue 180.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`tel:${emergencyInfo.police}`}
                      className="inline-flex min-h-11 items-center justify-center bg-ink px-5 py-2.5 font-display text-lg text-paper transition-colors hover:bg-paper hover:text-ink"
                    >
                      {emergencyInfo.police}
                    </a>
                    <a
                      href={`tel:${emergencyInfo.women}`}
                      className="inline-flex min-h-11 items-center justify-center bg-ink px-5 py-2.5 font-display text-lg text-paper transition-colors hover:bg-paper hover:text-ink"
                    >
                      {emergencyInfo.women}
                    </a>
                  </div>
                </div>

                <div className="border border-ink/15 p-5">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/55">
                    <LockKeyhole aria-hidden="true" className="size-3.5 text-red" />
                    Lembrete
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/50">
                    Este site não substitui os serviços de emergência, o
                    atendimento psicológico ou a orientação jurídica
                    especializada.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
