"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CheckCheck,
  Copy,
  Info,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import {
  AGE_MAX,
  AGE_MIN,
  PREVIOUS_REPORT_OPTIONS,
  REPORT_MAX,
  ROLE_OPTIONS,
  SUPPORT_OPTIONS,
  denunciaSchema,
  type DenunciaFormValues,
} from "@/lib/denuncia-schema";
import { siteConfig } from "@/lib/site";

const defaultValues: DenunciaFormValues = {
  anonymous: true,
  name: "",
  age: undefined as unknown as number,
  contactEmail: "",
  contactPhone: "",
  city: "",
  state: "",
  academy: "",
  role: "",
  accused: "",
  relationship: "",
  location: "",
  date: "",
  report: "",
  witnesses: "",
  previousReport: "",
  support: [],
  consent: false,
  website: "",
};

type FieldErrorProps = {
  id: string;
  message?: string;
};

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red">
      {message}
    </p>
  );
}

type FormSectionHeaderProps = {
  id: string;
  number: string;
  title: string;
  description?: string;
};

function FormSectionHeader({
  id,
  number,
  title,
  description,
}: FormSectionHeaderProps) {
  return (
    <div className="border-t border-ink/20 pt-7">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xs text-red">{number}</span>
        <h2 id={id} className="display text-3xl leading-none">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/55">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function DenunciaForm() {
  const [protocol, setProtocol] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<DenunciaFormValues>({
    resolver: zodResolver(denunciaSchema),
    defaultValues,
    mode: "onTouched",
  });

  const anonymous = useWatch({ control, name: "anonymous" });
  const reportLength = useWatch({ control, name: "report" })?.length ?? 0;

  useEffect(() => {
    if (anonymous) {
      clearErrors(["name", "contactEmail", "contactPhone"]);
    }
  }, [anonymous, clearErrors]);

  useEffect(() => {
    if (protocol) {
      successRef.current?.focus();
    }
  }, [protocol]);

  const onSubmit = async (data: DenunciaFormValues) => {
    setSubmissionError(null);
    setCopied(false);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch("/api/denuncia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      const result = (await response.json().catch(() => null)) as
        | { protocol?: string; error?: string }
        | null;

      if (!response.ok || !result?.protocol) {
        setSubmissionError(
          result?.error ||
            "Não foi possível enviar sua denúncia agora. Tente novamente em alguns instantes.",
        );
        return;
      }

      setProtocol(result.protocol);
      reset(defaultValues);
    } catch (error) {
      setSubmissionError(
        error instanceof DOMException && error.name === "AbortError"
          ? "O envio demorou mais que o esperado. Verifique sua conexão e tente novamente."
          : "Não foi possível enviar sua denúncia agora. Verifique sua conexão e tente novamente.",
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const copyProtocol = async () => {
    if (!protocol) return;

    try {
      await navigator.clipboard.writeText(protocol);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_500);
    } catch {
      setCopied(false);
    }
  };

  if (protocol) {
    return (
      <div
        className="border-2 border-ink bg-paper-strong"
        role="status"
        aria-live="polite"
      >
        <div className="h-1.5 bg-red" />
        <div className="p-6 md:p-10">
          <span className="flex size-12 items-center justify-center bg-red text-paper">
            <ShieldCheck aria-hidden="true" className="size-6" />
          </span>
          <p className="eyebrow mt-6 text-red">Denúncia enviada</p>
          <h2
            ref={successRef}
            tabIndex={-1}
            className="display mt-3 text-4xl outline-none md:text-5xl"
          >
            Obrigada por confiar na gente.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65">
            Seu relato foi encaminhado ao e-mail institucional da Comissão de
            Direitos das Mulheres no Jiu-Jitsu. Ele não foi publicado e não
            fica armazenado neste site.
          </p>

          <div className="mt-7 border border-ink/20 bg-paper p-5">
            <p className="eyebrow text-ink/45">Seu protocolo</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-lg font-bold tracking-wide text-ink">
                {protocol}
              </p>
              <button
                type="button"
                onClick={copyProtocol}
                className="inline-flex min-h-10 items-center justify-center gap-2 border border-ink/20 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink hover:bg-white/60"
              >
                {copied ? (
                  <CheckCheck aria-hidden="true" className="size-3.5" />
                ) : (
                  <Copy aria-hidden="true" className="size-3.5" />
                )}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink/50">
              Guarde este protocolo. Ele é a referência da sua denúncia caso
              você queira entrar em contato com a CDMJJ depois.
            </p>
          </div>

          <div className="mt-8">
            <p className="eyebrow text-red">O que acontece agora</p>
            <ol className="mt-4 space-y-4">
              {[
                "A equipe da CDMJJ recebe o relato pelo e-mail institucional do canal.",
                "A denúncia é lida e acolhida conforme os protocolos de proteção e sigilo da Comissão.",
                "Se você informou um contato, a CDMJJ poderá retornar com orientações e encaminhamentos.",
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-ink/65">
                  <span className="flex size-6 shrink-0 items-center justify-center bg-ink font-display text-[11px] text-paper">
                    0{index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {anonymous ? (
            <p className="mt-6 border-l-2 border-red bg-red/[0.045] px-4 py-3 text-sm leading-relaxed text-ink/70">
              Como você escolheu o anonimato, não temos seus dados de contato.
              O protocolo acima é a sua referência.
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setProtocol(null);
                setSubmissionError(null);
                setCopied(false);
                formTopRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="inline-flex min-h-12 items-center justify-center bg-ink px-5 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-paper transition-colors hover:bg-red"
            >
              Enviar outra denúncia
            </button>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center border border-ink/25 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:border-ink hover:bg-white/50"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={formTopRef}
      className="scroll-mt-6 border-2 border-ink bg-paper-strong"
    >
      <div className="border-b border-ink/15 bg-paper px-5 py-6 md:px-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow text-red">Formulário de denúncia</p>
            <h2 className="display mt-2 text-3xl md:text-4xl">
              Conte o que aconteceu.
            </h2>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center border border-red/30 text-red">
            <LockKeyhole aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-9 p-5 md:p-8"
      >
        {submissionError ? (
          <div
            role="alert"
            className="flex items-start gap-3 border-l-2 border-red bg-red/[0.055] px-4 py-3 text-sm leading-relaxed text-ink/75"
          >
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
            <div>
              <p>{submissionError}</p>
              {siteConfig.contactEmail ? (
                <p className="mt-1.5 text-ink/55">
                  Se o problema continuar, escreva para{" "}
                  <a
                    className="font-semibold text-red underline underline-offset-2"
                    href={`mailto:${siteConfig.contactEmail}`}
                  >
                    {siteConfig.contactEmail}
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <section aria-labelledby="identificacao-titulo">
          <FormSectionHeader
            id="identificacao-titulo"
            number="01"
            title="Como você quer se identificar?"
          />

          <Controller
            control={control}
            name="anonymous"
            render={({ field }) => (
              <fieldset className="mt-5">
                <legend className="sr-only">
                  Escolha entre denúncia anônima ou identificada
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      value: true,
                      title: "Anônima",
                      headline: "Sem nome. Sem contato.",
                      description:
                        "Nenhum dado de identificação será solicitado.",
                    },
                    {
                      value: false,
                      title: "Identificada",
                      headline: "Falar sem anonimato.",
                      description:
                        "Seu nome e contato ficam apenas com a equipe da CDMJJ.",
                    },
                  ].map((option) => {
                    const selected = field.value === option.value;

                    return (
                      <label
                        key={option.title}
                        className={`relative cursor-pointer border-2 p-4 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-red ${
                          selected
                            ? "border-red bg-red/[0.045]"
                            : "border-ink/20 bg-paper/45 hover:border-ink/45"
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={String(option.value)}
                          checked={selected}
                          onChange={() => field.onChange(option.value)}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          className="sr-only"
                        />
                        <span className="flex items-center justify-between gap-3">
                          <span className="eyebrow text-ink/55">
                            {option.title}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`flex size-5 items-center justify-center rounded-full border ${
                              selected
                                ? "border-red bg-red text-paper"
                                : "border-ink/30"
                            }`}
                          >
                            {selected ? <Check className="size-3" /> : null}
                          </span>
                        </span>
                        <span className="display mt-3 block text-2xl leading-[0.95]">
                          {option.headline}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-ink/60">
                          {option.description}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}
          />

          <div className="mt-6 border border-ink/15 bg-white/35 p-4">
            <label
              htmlFor="age"
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60"
            >
              Idade
              <span className="bg-red px-2 py-0.5 text-[9px] tracking-[0.12em] text-paper">
                Obrigatória
              </span>
            </label>
            <div className="relative mt-2 max-w-[12rem]">
              <input
                id="age"
                type="number"
                inputMode="numeric"
                min={AGE_MIN}
                max={AGE_MAX}
                placeholder="Ex.: 28"
                aria-invalid={errors.age ? "true" : undefined}
                aria-describedby={
                  errors.age ? "age-error age-help" : "age-help"
                }
                className="field pr-16"
                {...register("age", { valueAsNumber: true })}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink/40"
              >
                anos
              </span>
            </div>
            <FieldError id="age-error" message={errors.age?.message} />
            <p id="age-help" className="mt-2 text-xs leading-relaxed text-ink/50">
              Usamos apenas para entender o perfil das vítimas. A idade não
              identifica você sozinha.
            </p>
          </div>

          {!anonymous ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                  Seu nome <span className="text-red">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Como você quer ser chamada"
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="field"
                  {...register("name")}
                />
                <FieldError id="name-error" message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="contactEmail" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                  E-mail para retorno{" "}
                  <span className="font-medium normal-case tracking-normal text-ink/40">
                    (opcional)
                  </span>
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  aria-invalid={errors.contactEmail ? "true" : undefined}
                  aria-describedby={
                    errors.contactEmail ? "contactEmail-error" : undefined
                  }
                  className="field"
                  {...register("contactEmail")}
                />
                <FieldError
                  id="contactEmail-error"
                  message={errors.contactEmail?.message}
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                  Telefone para retorno{" "}
                  <span className="font-medium normal-case tracking-normal text-ink/40">
                    (opcional)
                  </span>
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  className="field"
                  {...register("contactPhone")}
                />
              </div>

              <p className="text-xs leading-relaxed text-ink/50 sm:col-span-2">
                Se informar, a CDMJJ poderá retornar com orientações, sempre
                com sigilo.
              </p>
            </div>
          ) : null}
        </section>

        <section aria-labelledby="contexto-titulo">
          <FormSectionHeader
            id="contexto-titulo"
            number="02"
            title="Sobre a situação"
            description="Preencha apenas o que souber."
          />

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Cidade
              </label>
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                placeholder="Cidade"
                className="field"
                {...register("city")}
              />
            </div>

            <div>
              <label htmlFor="state" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                UF
              </label>
              <input
                id="state"
                type="text"
                autoComplete="address-level1"
                placeholder="Ex.: SP"
                maxLength={2}
                className="field uppercase"
                {...register("state")}
              />
            </div>

            <div>
              <label htmlFor="academy" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Academia, equipe ou evento
              </label>
              <input
                id="academy"
                type="text"
                placeholder="Se quiser informar"
                className="field"
                {...register("academy")}
              />
            </div>

            <div>
              <label htmlFor="role" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Sua atuação no jiu-jitsu
              </label>
              <select id="role" className="field" {...register("role")}>
                <option value="">Selecione (opcional)</option>
                {ROLE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="accused" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Pessoa ou instituição citada
              </label>
              <input
                id="accused"
                type="text"
                placeholder="Se quiser informar"
                className="field"
                {...register("accused")}
              />
            </div>

            <div>
              <label htmlFor="relationship" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Vínculo com a pessoa citada
              </label>
              <input
                id="relationship"
                type="text"
                placeholder="Ex.: professor, colega, organizador"
                className="field"
                {...register("relationship")}
              />
            </div>

            <div>
              <label htmlFor="location" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Onde aconteceu
              </label>
              <input
                id="location"
                type="text"
                placeholder="Academia, competição, evento..."
                className="field"
                {...register("location")}
              />
            </div>

            <div>
              <label htmlFor="date" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Quando aconteceu
              </label>
              <input
                id="date"
                type="text"
                placeholder="Ex.: março de 2025"
                className="field"
                {...register("date")}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="report" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                O que aconteceu? <span className="text-red">*</span>
              </label>
              <textarea
                id="report"
                rows={7}
                maxLength={REPORT_MAX}
                placeholder="Conte do seu jeito. Você pode incluir o que lembrar, sem se preocupar em ter todas as respostas."
                aria-invalid={errors.report ? "true" : undefined}
                aria-describedby={errors.report ? "report-error" : undefined}
                className="field"
                {...register("report")}
              />
              <div className="mt-1.5 flex items-start justify-between gap-4">
                <FieldError id="report-error" message={errors.report?.message} />
                <span className="ml-auto shrink-0 text-[10px] tabular-nums text-ink/35">
                  {reportLength}/{REPORT_MAX}
                </span>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="witnesses" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Testemunhas ou outras informações{" "}
                <span className="font-medium normal-case tracking-normal text-ink/40">
                  (opcional)
                </span>
              </label>
              <textarea
                id="witnesses"
                rows={3}
                maxLength={1200}
                placeholder="Se houver algo mais que você queira acrescentar"
                className="field"
                {...register("witnesses")}
              />
            </div>

            <div>
              <label htmlFor="previousReport" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                Já denunciou isso antes?
              </label>
              <select
                id="previousReport"
                className="field"
                {...register("previousReport")}
              >
                <option value="">Selecione (opcional)</option>
                {PREVIOUS_REPORT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section aria-labelledby="apoio-titulo">
          <FormSectionHeader
            id="apoio-titulo"
            number="03"
            title="Que apoio você gostaria?"
            description="Opcional. Marque o que fizer sentido para você."
          />

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {SUPPORT_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-start gap-3 border border-ink/15 bg-paper/40 px-3.5 py-3 text-sm leading-snug text-ink/70 transition-colors hover:border-ink/35 has-[:checked]:border-red has-[:checked]:bg-red/[0.035]"
              >
                <input
                  type="checkbox"
                  value={option}
                  className="check-field mt-0.5"
                  {...register("support")}
                />
                {option}
              </label>
            ))}
          </div>
        </section>

        <section aria-labelledby="envio-titulo">
          <FormSectionHeader
            id="envio-titulo"
            number="04"
            title="Envio seguro"
          />

          <div className="mt-5 border border-ink/15 bg-white/35 p-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/70">
              <input
                type="checkbox"
                className="check-field mt-0.5"
                aria-invalid={errors.consent ? "true" : undefined}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                {...register("consent")}
              />
              <span>
                Li e compreendi o{" "}
                <a
                  href="/privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red underline underline-offset-2"
                >
                  aviso de privacidade
                </a>{" "}
                e autorizo o envio destas informações à CDMJJ por e-mail.{" "}
                <span className="text-red">*</span>
              </span>
            </label>
            <FieldError id="consent-error" message={errors.consent?.message} />
          </div>

          <div className="mt-4 space-y-2 text-xs leading-relaxed text-ink/50">
            <p className="flex items-start gap-2">
              <LockKeyhole
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-red"
              />
              A denúncia é enviada diretamente ao e-mail institucional da CDMJJ.
              Este site não mantém um banco de dados com os relatos.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-red disabled:cursor-wait disabled:opacity-65"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
                Enviando com segurança...
              </>
            ) : (
              <>
                <LockKeyhole aria-hidden="true" className="size-4" />
                Enviar denúncia com segurança
              </>
            )}
          </button>
        </section>

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          {...register("website")}
        />
      </form>
    </div>
  );
}
