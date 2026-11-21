// /api/resenas — los clientes dejan reseñas; solo se publican cuando el panel las aprueba
import { json, sinAlmacen, autorizado, noAutorizado } from "../lib/comun.js";

const t = (v, max = 200) => String(v ?? "").trim().replace(/\s+/g, " ").slice(0, max);
const leer = async env => (await env.TIENDA.get("resenas", "json")) || [];
const guardar = (env, l) => env.TIENDA.put("resenas", JSON.stringify(l));

export async function onRequestGet({ env, request }) {
  if (!env.TIENDA) return json({ promedio: 0, total: 0, resenas: [] });
  const l = await leer(env);
  if (new URL(request.url).searchParams.has("todos")) {
    if (!(await autorizado(request, env))) return noAutorizado();
    return json(l);
  }
  const ok = l.filter(r => r.aprobada);
  const promedio = ok.length ? Math.round((ok.reduce((s, r) => s + r.estrellas, 0) / ok.length) * 10) / 10 : 0;
  return json({ promedio, total: ok.length, resenas: ok.map(({ id, nombre, estrellas, comentario, fecha }) => ({ id, nombre, estrellas, comentario, fecha })) },
    200, { "Cache-Control": "public, max-age=30" });
}

// Un cliente envía su reseña
export async function onRequestPost({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  let d; try { d = await request.json(); } catch { return json({ error: "Datos inválidos" }, 400); }
  if (d.sitio) return json({ ok: true }); // campo trampa para robots
  const estrellas = Math.round(Number(d.estrellas));
  const nombre = t(d.nombre, 60), comentario = t(d.comentario, 600);
  if (!(estrellas >= 1 && estrellas <= 5)) return json({ error: "Elige de 1 a 5 estrellas." }, 400);
  if (nombre.length < 2) return json({ error: "Escribe tu nombre." }, 400);
  if (comentario.length < 5) return json({ error: "Cuéntanos un poco más en tu comentario." }, 400);
  // Máximo una reseña por minuto desde la misma conexión
  const ip = request.headers.get("CF-Connecting-IP") || "local";
  const llaveIp = "resena-ip:" + ip;
  if (await env.TIENDA.get(llaveIp)) return json({ error: "Ya recibimos tu reseña. Intenta de nuevo en un minuto." }, 429);
  await env.TIENDA.put(llaveIp, "1", { expirationTtl: 60 });
  const l = await leer(env);
  if (l.filter(r => !r.aprobada).length >= 200) return json({ error: "Por ahora no podemos recibir más reseñas. Escríbenos por WhatsApp." }, 503);
  const r = { id: "r-" + Date.now().toString(36) + crypto.randomUUID().slice(0, 4), nombre, estrellas, comentario, fecha: new Date().toISOString(), aprobada: false };
  l.unshift(r);
  await guardar(env, l.slice(0, 1000));
  return json({ ok: true });
}

// Aprobar u ocultar (solo panel)
export async function onRequestPut({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  let d; try { d = await request.json(); } catch { return json({ error: "Datos inválidos" }, 400); }
  const l = await leer(env);
  const r = l.find(x => x.id === d.id);
  if (!r) return json({ error: "No existe" }, 404);
  r.aprobada = !!d.aprobada;
  await guardar(env, l);
  return json(r);
}

export async function onRequestDelete({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  const id = new URL(request.url).searchParams.get("id");
  await guardar(env, (await leer(env)).filter(x => x.id !== id));
  return json({ ok: true });
}
