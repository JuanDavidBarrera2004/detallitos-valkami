// /api/productos — lista pública; crear, editar y borrar solo con la contraseña del panel
import { json, sinAlmacen, autorizado, noAutorizado, leerProductos, guardarProductos, limpiarProducto } from "../lib/comun.js";

export async function onRequestGet({ env, request }) {
  if (!env.TIENDA) return json([]);
  const l = await leerProductos(env);
  const todos = new URL(request.url).searchParams.has("todos") && (await autorizado(request, env));
  return json(todos ? l : l.filter(p => p.visible !== false), 200, todos ? {} : { "Cache-Control": "public, max-age=30" });
}

export async function onRequestPost({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  let datos; try { datos = await request.json(); } catch { return json({ error: "Datos inválidos" }, 400); }
  const l = await leerProductos(env);
  // Reordenar varios a la vez: { orden: [{id, orden}] }
  if (Array.isArray(datos.orden)) {
    const m = new Map(datos.orden.map(o => [o.id, Number(o.orden)]));
    l.forEach(p => { if (m.has(p.id)) p.orden = m.get(p.id); });
    await guardarProductos(env, l);
    return json({ ok: true });
  }
  const p = limpiarProducto(datos);
  const i = l.findIndex(x => x.id === p.id);
  if (i >= 0) l[i] = p; else l.push(p);
  if (l.length > 1500) return json({ error: "Se alcanzó el máximo de productos." }, 400);
  await guardarProductos(env, l);
  return json(p);
}

export async function onRequestDelete({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  const id = new URL(request.url).searchParams.get("id");
  const l = await leerProductos(env);
  const p = l.find(x => x.id === id);
  if (!p) return json({ error: "No existe" }, 404);
  await guardarProductos(env, l.filter(x => x.id !== id));
  // Borra también sus fotos guardadas
  await Promise.all((p.imagenes || []).filter(u => u.startsWith("/api/img/")).map(u => env.TIENDA.delete("img:" + u.slice(9))));
  return json({ ok: true });
}
