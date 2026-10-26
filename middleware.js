// Password gate for dev.carehub.org only. Every other hostname passes through
// and is routed by the rewrites in vercel.json.
export const config = { matcher: "/:path*" };

export default function middleware(request) {
  const host = (request.headers.get("host") || "").toLowerCase();
  if (host !== "dev.carehub.org") return;

  const auth = request.headers.get("authorization") || "";
  if (auth.startsWith("Basic ")) {
    let decoded = "";
    try { decoded = atob(auth.slice(6)); } catch (e) { decoded = ""; }
    const password = decoded.slice(decoded.indexOf(":") + 1);
    if (password === "maple") return;
  }
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Maple dev", charset="UTF-8"', "Cache-Control": "no-store" },
  });
}
