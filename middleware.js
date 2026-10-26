// Host routing and the dev gate.
//
// Known public hosts get a holding page for every path except the files the
// holding page itself needs. Every other host (dev.carehub.org, preview
// deployments, anything unexpected) requires HTTP Basic auth with the password
// in the DEV_GATE_PASSWORD environment variable, and is refused if it is unset.
export const config = { matcher: "/:path*" };

const HOLDING = {
  "maple.carehub.org": "/under-construction.html",
  "maplecommunity.org": "/under-construction.html",
  "www.maplecommunity.org": "/under-construction.html",
  "carehub.org": "/coming-soon.html",
  "www.carehub.org": "/coming-soon.html",
  "carehub-org.vercel.app": "/coming-soon.html",
};

const OPEN = /^\/(assets\/|holding\.css$|under-construction\.html$|coming-soon\.html$|favicon)/;

function rewriteTo(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = "";
  return new Response(null, { headers: { "x-middleware-rewrite": url.toString() } });
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default function middleware(request) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  const url = new URL(request.url);

  const holding = HOLDING[host];
  if (holding) {
    if (OPEN.test(url.pathname)) return;
    return rewriteTo(request, holding);
  }

  const expected = process.env.DEV_GATE_PASSWORD;
  if (expected) {
    const auth = request.headers.get("authorization") || "";
    if (auth.startsWith("Basic ")) {
      let decoded = "";
      try { decoded = atob(auth.slice(6)); } catch (e) { decoded = ""; }
      const password = decoded.slice(decoded.indexOf(":") + 1);
      if (safeEqual(password, expected)) return;
    }
  }
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Maple dev", charset="UTF-8"', "Cache-Control": "no-store" },
  });
}
