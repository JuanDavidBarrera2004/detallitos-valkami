// /api/entregas — galería de pedidos entregados (pública) que el panel administra
import { json, sinAlmacen, autorizado, noAutorizado } from "../lib/comun.js";

const t = (v, max = 200) => String(v ?? "").trim().slice(0, max);
const leer = async env => (await env.TIENDA.get("entregas", "json")) || [];
const guardar = (env, l) => env.TIENDA.put("entregas", JSON.stringify(l));

export async function onRequestGet({ env, request }) {
  if (!env.TIENDA) return json([]);
  const l = await leer(env);
  const todos = new URL(request.url).searchParams.has("todos") && (await autorizado(request, env));
  return json(todos ? l : l.filter(e => e.visible !== false), 200, todos ? {} : { "Cache-Control": "public, max-age=30" });
}

// Agregar o editar una foto de entrega
export async function onRequestPost({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  let d; try { d = await request.json(); } catch { return json({ error: "Datos inválidos" }, 400); }
  const l = await leer(env);
  const i = d.id ? l.findIndex(e => e.id === d.id) : -1;
  if (i >= 0) {
    if (d.texto !== undefined) l[i].texto = t(d.texto, 160);
    if (d.visible !== undefined) l[i].visible = !!d.visible;
    await guardar(env, l);
    return json(l[i]);
  }
  const imagen = t(d.imagen, 500);
  if (!/^(\/api\/img\/|https:\/\/)/.test(imagen)) return json({ error: "Falta la foto" }, 400);
  const e = { id: "e-" + Date.now().toString(36) + crypto.randomUUID().slice(0, 4), imagen, texto: t(d.texto, 160), pedido: t(d.pedido, 20), fecha: new Date().toISOString(), visible: true };
  l.unshift(e);
  await guardar(env, l.slice(0, 300));
  return json(e);
}

export async function onRequestDelete({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  const id = new URL(request.url).searchParams.get("id");
  const l = await leer(env);
  const e = l.find(x => x.id === id);
  if (!e) return json({ error: "No existe" }, 404);
  await guardar(env, l.filter(x => x.id !== id));
  if (e.imagen.startsWith("/api/img/")) await env.TIENDA.delete("img:" + e.imagen.slice(9));
  return json({ ok: true });
}
