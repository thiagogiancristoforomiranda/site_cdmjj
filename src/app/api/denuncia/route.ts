import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { denunciaSchema } from "@/lib/denuncia-schema";
import { generateProtocol, sendDenunciaEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 32_000;

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
};

function json(
  status: number,
  body: Record<string, unknown>,
  extraHeaders?: Record<string, string>,
) {
  return NextResponse.json(body, {
    status,
    headers: { ...noStoreHeaders, ...extraHeaders },
  });
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function hashIp(ip: string) {
  const salt = process.env.RATE_LIMIT_SALT ?? "cdmjj-canal-de-denuncias";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json(415, { error: "Formato de envio inválido." });
  }

  const contentLength = Number(
    request.headers.get("content-length") ?? "0",
  );
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json(413, { error: "O conteúdo enviado é muito grande." });
  }

  const rateLimit = checkRateLimit(hashIp(getClientIp(request)));
  if (!rateLimit.allowed) {
    return json(
      429,
      {
        error:
          "Muitas tentativas em pouco tempo. Aguarde alguns minutos antes de enviar novamente.",
      },
      { "Retry-After": String(rateLimit.retryAfter) },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json(400, { error: "Não foi possível ler o conteúdo enviado." });
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return json(413, { error: "O conteúdo enviado é muito grande." });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json(400, { error: "Conteúdo inválido." });
  }

  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.trim().length > 0
  ) {
    // Resposta neutra para não ensinar robôs a contornar a proteção.
    return json(200, { protocol: generateProtocol() });
  }

  const parsed = denunciaSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return json(400, {
      error: "Revise os campos indicados e tente novamente.",
      fields: fieldErrors,
    });
  }

  const data = parsed.data;
  const safeData = data.anonymous
    ? { ...data, name: "", contactEmail: "", contactPhone: "" }
    : data;

  const protocol = generateProtocol();

  try {
    await sendDenunciaEmail(safeData, protocol);
    return json(200, { protocol });
  } catch (error) {
    console.error(
      "[denuncia] Falha no envio de e-mail:",
      error instanceof Error ? error.name : "erro desconhecido",
    );
    return json(503, {
      error:
        "Não foi possível enviar sua denúncia agora. Tente novamente em alguns instantes.",
    });
  }
}
