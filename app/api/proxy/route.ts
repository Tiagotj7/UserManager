// app/api/proxy/route.ts
import type { NextRequest } from "next/server";

// Configure no Vercel: BACKEND_API_URL = https://usermanager.alwaysdata.net/index.php
const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "https://usermanager.alwaysdata.net/index.php";

export const dynamic = "force-dynamic";

async function proxy(req: NextRequest) {
  try {
    const incoming = new URL(req.url);
    const search = incoming.search; // inclui ?id=...
    const target = BACKEND_API_URL + search;

    const init: RequestInit = { method: req.method, headers: {} };

    // copia headers exceto host
    req.headers.forEach((value, key) => {
      if (key.toLowerCase() === "host") return;
      // @ts-ignore
      init.headers[key] = value;
    });

    // repassa corpo para POST/PUT/PATCH
    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "PATCH"
    ) {
      init.body = await req.text();
    }

    const res = await fetch(target, init);

    // Verifica se o backend mandou HTML (por exemplo, página de erro)
    const contentType = (res.headers.get("content-type") || "").toLowerCase();

    if (contentType.includes("text/html")) {
      const html = await res.text();
      const snippet = html.slice(0, 1000);

      const errBody = {
        error: "Backend retornou HTML em vez de JSON",
        snippet,
        hint:
          "Verifique se a URL BACKEND_API_URL aponta para index.php e se o PHP não está retornando página de erro.",
      };

      return new Response(JSON.stringify(errBody), {
        status: 502,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    // Lê o corpo como texto
    const bodyText = await res.text();

    // Se vier vazio, devolve um JSON vazio em vez de string vazia
    if (!bodyText) {
      return new Response("[]", {
        status: res.status,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    // Se o próprio backend marcou como JSON, apenas repassa, garantindo header correto
    if (contentType.includes("application/json")) {
      return new Response(bodyText, {
        status: res.status,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    // Se não for JSON declarado, tenta fazer parse; se não der, empacota em erro JSON
    try {
      const parsed = JSON.parse(bodyText);
      return new Response(JSON.stringify(parsed), {
        status: res.status,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    } catch {
      return new Response(
        JSON.stringify({
          error: "Resposta do backend não é JSON válido",
          raw: bodyText.slice(0, 500),
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
    }
  } catch (err: any) {
    const message =
      typeof err === "string" ? err : err?.message ?? "Proxy error";
    return new Response(
      JSON.stringify({ error: "Proxy failed", details: message }),
      {
        status: 502,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
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
  // responde preflight rapidamente
  return new Response(null, { status: 204 });
}