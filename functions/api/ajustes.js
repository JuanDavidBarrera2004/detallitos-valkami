// /api/ajustes — anuncio, costo del domicilio, dirección, horario, categorías, foto de portada
import { json, sinAlmacen, autorizado, noAutorizado, AJUSTES_BASE, limpiarAjustes } from "../lib/comun.js";

export async function onRequestGet({ env }) {
  if (!env.TIENDA) return json(AJUSTES_BASE);
  const a = (await env.TIENDA.get("ajustes", "json")) || {};
  return json({ ...AJUSTES_BASE, ...a }, 200, { "Cache-Control": "public, max-age=30" });
}

export async function onRequestPut({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  let datos; try { datos = await request.json(); } catch { return json({ error: "Datos inválidos" }, 400); }
  const a = limpiarAjustes(datos);
  await env.TIENDA.put("ajustes", JSON.stringify(a));
  return json(a);
}
