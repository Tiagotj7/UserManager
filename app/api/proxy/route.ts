import type { NextRequest } from "next/server";

// Proxy route: Next.js -> PHP backend
// Configure BACKEND_API_URL in Vercel (ex: https://meu-backend.com/backend/index.php)
const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://usermanager.infinityfreeapp.com/backend/index.php";

export const dynamic = "force-dynamic";

async function proxy(req: NextRequest) {
  try {
    const incoming = new URL(req.url);
    const search = incoming.search; // includes ?id=...
    const target = BACKEND_API_URL + search;

    const init: RequestInit = { method: req.method, headers: {} };

    // copy headers except host
    req.headers.forEach((value, key) => {
      if (key.toLowerCase() === "host") return;
      // @ts-ignore
      init.headers[key] = value;
    });

    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
      init.body = await req.text();
    }

    const res = await fetch(target, init);
    // Se o backend retornar HTML (ex.: página de proteção do host), devolvemos
    // um erro JSON claro para o frontend em vez de tentar repassar HTML.
    const contentType = (res.headers.get("content-type") || "").toLowerCase();
    if (contentType.includes("text/html")) {
      const html = await res.text();
      const snippet = html.slice(0, 1000);
      // Detect common InfinityFree anti-bot snippet
      const isAntiBot = html.includes("aes.js") || html.includes("requires Javascript") || html.includes("slowAES.decrypt");
      const message = isAntiBot
        ? "O backend remoto está retornando uma página HTML de proteção (anti-bot). Servidores não executam JavaScript, então o proxy não consegue passar por essa verificação."
        : "O backend remoto retornou HTML inesperado em vez de JSON.";

      const errBody = {
        error: "Backend returned HTML",
        message,
        snippet,
        hint: "Hospede o PHP em um servidor que permita requisições server-to-server (sem proteção baseada em JS), ou configure BACKEND_API_URL para um endpoint JSON de teste (ex: /backend/test.php).",
      };

      return new Response(JSON.stringify(errBody), { status: 502, headers: { "Content-Type": "application/json; charset=utf-8" } });
    }

    // Build response headers (we avoid forwarding some hop-by-hop headers)
    const headers = new Headers();
    res.headers.forEach((value, key) => {
      // don't forward security-sensitive or hop-by-hop headers
      if (["connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailers", "transfer-encoding", "upgrade"].includes(key.toLowerCase())) return;
      headers.set(key, value);
    });

    const body = await res.text();
    return new Response(body, { status: res.status, headers });
  } catch (err: any) {
    const message = typeof err === "string" ? err : err?.message ?? "Proxy error";
    return new Response(JSON.stringify({ error: "Proxy failed", details: message }), { status: 502, headers: { "Content-Type": "application/json; charset=utf-8" } });
  }
}

export async function GET(req: NextRequest) {
  return proxy(req);
}

export async function POST(req: NextRequest) {
  return proxy(req);
}

export async function PUT(req: NextRequest) {
  return proxy(req);
}

export async function DELETE(req: NextRequest) {
  return proxy(req);
}

export async function OPTIONS() {
  // respond to preflight quickly
  return new Response(null, { status: 204 });
}
