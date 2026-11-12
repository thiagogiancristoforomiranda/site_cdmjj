import "server-only";

import nodemailer from "nodemailer";
import { Resend } from "resend";

import type { DenunciaData } from "@/lib/denuncia-schema";

const protocolAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateProtocol() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);

  const code = Array.from(bytes)
    .map((byte) => protocolAlphabet[byte % protocolAlphabet.length])
    .join("");

  return `CDMJJ-${new Date().getFullYear()}-${code}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function valueOrEmpty(value: string | undefined) {
  return value?.trim() ?? "";
}

const DEFAULT_RECIPIENT = "cdmjiujitsu@gmail.com";

function getRecipients() {
  const configured = (process.env.DENUNCIA_EMAIL_TO ?? "")
    .split(/[,;]/)
    .map((email) => email.trim())
    .filter(Boolean);

  return configured.length > 0 ? configured : [DEFAULT_RECIPIENT];
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

export function buildDenunciaEmail(
  data: DenunciaData,
  protocol: string,
  submittedAt: string,
): EmailContent {
  const rows: Array<[string, string]> = [];
  const addRow = (label: string, value: string | undefined) => {
    const clean = valueOrEmpty(value);
    if (clean) rows.push([label, clean]);
  };

  addRow("Protocolo", protocol);
  addRow("Recebida em", submittedAt);
  addRow("Modo", data.anonymous ? "Anônima" : "Identificada");
  addRow("Idade", `${data.age} anos`);

  if (!data.anonymous) {
    addRow("Nome", data.name);
    addRow("E-mail de contato", data.contactEmail);
    addRow("Telefone de contato", data.contactPhone);
  }

  addRow(
    "Cidade / UF",
    [data.city, data.state].filter(Boolean).join(" / "),
  );
  addRow("Academia / equipe", data.academy);
  addRow("Atuação no jiu-jitsu", data.role);
  addRow("Pessoa ou instituição citada", data.accused);
  addRow("Vínculo com a pessoa citada", data.relationship);
  addRow("Local", data.location);
  addRow("Quando aconteceu", data.date);
  addRow("Já denunciou antes", data.previousReport);
  addRow("Apoio desejado", data.support?.join(", "));

  const subject = `[Canal de Denúncias CDMJJ] ${protocol} — ${
    data.anonymous ? "Anônima" : "Identificada"
  }`;

  const detailRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e8e2d8;color:#6c6a65;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;vertical-align:top;width:38%;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e8e2d8;color:#0b0b0c;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;vertical-align:top;">${escapeHtml(
            value,
          )}</td>
        </tr>`,
    )
    .join("");

  const reportHtml = escapeHtml(data.report).replaceAll("\n", "<br />");
  const witnessesHtml = valueOrEmpty(data.witnesses)
    ? `<div style="margin-top:22px;">
        <p style="margin:0 0 6px;color:#c8102e;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Testemunhas / outras informações</p>
        <div style="border-left:3px solid #c8102e;padding:10px 0 10px 14px;color:#33312e;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;">${escapeHtml(
          witnessesHtmlValue(data.witnesses),
        ).replaceAll("\n", "<br />")}</div>
      </div>`
    : "";

  const identificationNotice = data.anonymous
    ? `<p style="margin:0 0 16px;padding:12px 14px;background:#f2efe8;border-left:3px solid #c8102e;color:#33312e;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;">
        Esta denúncia foi enviada em <strong>modo anônimo</strong>. Nome, e-mail e telefone não foram coletados.
      </p>`
    : "";

  const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f2efe8;">
    <div style="padding:28px 12px;background:#f2efe8;">
      <div style="max-width:680px;margin:0 auto;background:#fffdf8;border:1px solid #ded7cb;">
        <div style="background:#0b0b0c;padding:24px 28px;">
          <p style="margin:0;color:#ffffff;font-family:Arial,sans-serif;font-size:17px;font-weight:bold;letter-spacing:1px;">COMISSÃO DE DIREITOS DAS MULHERES NO JIU-JITSU</p>
          <p style="margin:6px 0 0;color:#c8102e;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.8px;text-transform:uppercase;">Canal de Denúncias e Ouvidoria</p>
        </div>
        <div style="height:5px;background:#c8102e;"></div>
        <div style="padding:28px;">
          <p style="margin:0 0 6px;color:#c8102e;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Nova denúncia recebida</p>
          <h1 style="margin:0 0 20px;color:#0b0b0c;font-family:Arial,sans-serif;font-size:26px;line-height:1.2;">${escapeHtml(
            protocol,
          )}</h1>
          ${identificationNotice}
          <table role="presentation" style="width:100%;border-collapse:collapse;border-top:1px solid #e8e2d8;">${detailRows}</table>

          <div style="margin-top:26px;">
            <p style="margin:0 0 8px;color:#c8102e;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Relato</p>
            <div style="border-left:3px solid #c8102e;padding:12px 0 12px 16px;color:#242321;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;">${reportHtml}</div>
          </div>
          ${witnessesHtml}

          <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e8e2d8;">
            <p style="margin:0;color:#77736c;font-family:Arial,sans-serif;font-size:11px;line-height:1.65;">
              Esta mensagem foi enviada pelo formulário do Canal de Denúncias. Trate este conteúdo com confidencialidade. O site não mantém banco de dados com os relatos; a mensagem fica no e-mail institucional da CDMJJ.
            </p>
          </div>
        </div>
      </div>
      <p style="max-width:680px;margin:14px auto 0;color:#8b867d;font-family:Arial,sans-serif;font-size:10px;line-height:1.6;text-align:center;">
        Em caso de risco imediato, ligue 190. Para orientação e apoio, ligue 180.
      </p>
    </div>
  </body>
</html>`;

  const textLines = [
    "COMISSÃO DE DIREITOS DAS MULHERES NO JIU-JITSU",
    "Canal de Denúncias e Ouvidoria",
    "",
    "NOVA DENÚNCIA RECEBIDA",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "RELATO",
    data.report,
  ];

  if (valueOrEmpty(data.witnesses)) {
    textLines.push("", "TESTEMUNHAS / OUTRAS INFORMAÇÕES", data.witnesses ?? "");
  }

  textLines.push(
    "",
    "---",
    "Trate este conteúdo com confidencialidade. O site não mantém banco de dados com os relatos.",
    "Em caso de risco imediato, ligue 190. Para orientação e apoio, ligue 180.",
  );

  return {
    subject,
    html,
    text: textLines.join("\n"),
  };
}

function witnessesHtmlValue(value: string | undefined) {
  return valueOrEmpty(value);
}

type SendResult = {
  provider: "resend" | "smtp" | "development";
};

export async function sendDenunciaEmail(
  data: DenunciaData,
  protocol: string,
): Promise<SendResult> {
  const submittedAt = formatSubmittedAt();
  const { subject, html, text } = buildDenunciaEmail(
    data,
    protocol,
    submittedAt,
  );

  const recipients = getRecipients();
  const from = process.env.DENUNCIA_EMAIL_FROM?.trim();
  const replyTo =
    !data.anonymous && data.contactEmail?.trim()
      ? data.contactEmail.trim()
      : undefined;

  if (process.env.RESEND_API_KEY) {
    if (!from || recipients.length === 0) {
      throw new Error("Configuração do Resend incompleta.");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to: recipients,
      subject,
      html,
      text,
      replyTo,
      headers: { "X-Entity-Ref-ID": protocol },
    });

    if (error) {
      throw new Error("O provedor de e-mail recusou o envio.");
    }

    return { provider: "resend" };
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (smtpHost && smtpUser && smtpPass && from && recipients.length > 0) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure:
        process.env.SMTP_SECURE === "true" ||
        port === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from,
      to: recipients.join(", "),
      subject,
      html,
      text,
      replyTo,
    });

    return { provider: "smtp" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[denuncia] ${protocol} validada. Envio de e-mail não configurado neste ambiente; nenhum dado foi registrado.`,
    );
    return { provider: "development" };
  }

  throw new Error("Canal de e-mail não configurado.");
}
