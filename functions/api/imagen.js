// /api/imagen — sube una foto (ya reducida en el navegador) y devuelve su dirección
import { json, sinAlmacen, autorizado, noAutorizado } from "../lib/comun.js";

const TIPOS = ["image/jpeg", "image/webp", "image/png"];

export async function onRequestPost({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  const tipo = (request.headers.get("Content-Type") || "").split(";")[0];
  if (!TIPOS.includes(tipo)) return json({ error: "Formato de imagen no permitido" }, 415);
  const datos = await request.arrayBuffer();
  if (datos.byteLength > 4 * 1024 * 1024) return json({ error: "La foto es muy pesada (máx. 4 MB)" }, 413);
  const id = Date.now().toString(36) + crypto.randomUUID().slice(0, 8);
  await env.TIENDA.put("img:" + id, datos, { metadata: { tipo } });
  return json({ url: "/api/img/" + id });
}

export async function onRequestDelete({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  const id = (new URL(request.url).searchParams.get("id") || "").replace(/[^a-z0-9-]/gi, "");
  if (id) await env.TIENDA.delete("img:" + id);
  return json({ ok: true });
}
