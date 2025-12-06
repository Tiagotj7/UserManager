import type { NextRequest } from "next/server";

// BACKEND_API_URL deve ser definido no ambiente (Vercel) apontando para
// o arquivo PHP: ex: https://meu-backend.com/backend/index.php
const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://usermanager.alwaysdata.net";

export const dynamic = "force-dynamic";

async function proxyRequest(req: NextRequest) {
  const incomingUrl = new URL(req.url);
  const search = incomingUrl.search; // inclui ?id=... quando presente

  // garante que query string seja repassada ao backend
  const target = BACKEND_API_URL + search;

  const init: RequestInit = {
    method: req.method,
    headers: {},
  };

  // copia headers do request, exceto host
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() === "host") return;
    // @ts-ignore
    init.headers[key] = value;
  });

  // repassa corpo para POST/PUT/PATCH
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    const body = await req.text();
    init.body = body;
  }

  const res = await fetch(target, init);

  // copia headers da resposta
  const respHeaders = new Headers();
  res.headers.forEach((value, key) => {
    respHeaders.set(key, value);
  });

  const text = await res.text();

  return new Response(text, {
    status: res.status,
    headers: respHeaders,
  });
}

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}

export async function POST(req: NextRequest) {
  return proxyRequest(req);
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req);
}

export async function OPTIONS() {
  // Responde preflight diretamente
  return new Response(null, { status: 204 });
}
