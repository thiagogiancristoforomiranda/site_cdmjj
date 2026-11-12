import { z } from "zod";

export const AGE_MIN = 1;
export const AGE_MAX = 120;
export const REPORT_MIN = 20;
export const REPORT_MAX = 6000;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Este campo deve ter no máximo ${max} caracteres.` })
    .optional();

export const denunciaSchema = z
  .object({
    anonymous: z.boolean(),
    name: optionalText(120),
    age: z
      .number({ error: "Informe sua idade para continuar." })
      .int({ error: "Informe uma idade válida." })
      .min(AGE_MIN, { error: "Informe uma idade válida." })
      .max(AGE_MAX, { error: "Informe uma idade válida." }),
    contactEmail: z
      .string()
      .trim()
      .max(200)
      .optional()
      .refine(
        (value) => !value || z.string().email().safeParse(value).success,
        { error: "Informe um e-mail válido." },
      ),
    contactPhone: optionalText(40),
    city: optionalText(120),
    state: optionalText(2),
    academy: optionalText(200),
    role: optionalText(80),
    accused: optionalText(200),
    relationship: optionalText(200),
    location: optionalText(300),
    date: optionalText(100),
    report: z
      .string()
      .trim()
      .min(REPORT_MIN, {
        error: "Conte um pouco mais sobre o que aconteceu.",
      })
      .max(REPORT_MAX, {
        error: `O relato deve ter no máximo ${REPORT_MAX} caracteres.`,
      }),
    witnesses: optionalText(1200),
    previousReport: optionalText(80),
    support: z
      .array(z.string().max(80))
      .max(8, { error: "Selecione no máximo 8 opções." })
      .optional(),
    consent: z
      .boolean()
      .refine((value) => value === true, {
        error: "É necessário concordar com o aviso de privacidade.",
      }),
    website: z.string().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.anonymous && (!data.name || data.name.trim().length < 2)) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Informe seu nome ou escolha a opção de anonimato.",
      });
    }
  });

export type DenunciaData = z.infer<typeof denunciaSchema>;
export type DenunciaFormValues = z.input<typeof denunciaSchema>;

export const ROLE_OPTIONS = [
  "Aluna",
  "Atleta",
  "Professora",
  "Gestora",
  "Arbitra",
  "Outra",
  "Prefiro não informar",
] as const;

export const PREVIOUS_REPORT_OPTIONS = [
  "Sim",
  "Não",
  "Prefiro não informar",
] as const;

export const SUPPORT_OPTIONS = [
  "Escuta e acolhimento",
  "Orientação sobre denúncia formal",
  "Apoio psicológico",
  "Orientação jurídica",
  "Proteção e segurança",
  "Outro",
] as const;
