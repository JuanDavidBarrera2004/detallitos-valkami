// /api/pedidos — la tienda guarda cada pedido; el panel los lista y cambia su estado
import { json, sinAlmacen, autorizado, noAutorizado, leerProductos, AJUSTES_BASE } from "../lib/comun.js";

const ESTADOS = ["nuevo", "confirmado", "preparando", "entregado", "cancelado"];
const t = (v, max = 200) => String(v ?? "").trim().slice(0, max);
const llave = numero => "pedido:" + numero;

// Guardar un pedido (lo hace el cliente al pulsar "Enviar pedido por WhatsApp")
export async function onRequestPost({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  let d; try { d = await request.json(); } catch { return json({ error: "Datos inválidos" }, 400); }
  const items = Array.isArray(d.items) ? d.items.slice(0, 40) : [];
  if (!items.length || !t(d.nombre) || !t(d.celular)) return json({ error: "Faltan datos" }, 400);

  // Los precios se toman del catálogo guardado, no de lo que envía el navegador
  const catalogo = await leerProductos(env);
  const lineas = [];
  for (const it of items) {
    const p = catalogo.find(x => x.id === it.id);
    const cant = Math.min(99, Math.max(1, Math.round(Number(it.cant) || 1)));
    const op = p && (p.opciones || []).find(o => o.nombre === it.opcion);
    const precio = op ? op.precio : p ? p.precio : 0;
    lineas.push({ id: t(it.id, 60), nombre: p ? p.nombre : t(it.nombre, 120), opcion: op ? op.nombre : "", cant, precio, subtotal: precio * cant });
  }
  const aj = { ...AJUSTES_BASE, ...((await env.TIENDA.get("ajustes", "json")) || {}) };
  const domicilio = d.entrega === "domicilio";
  const envio = domicilio ? Number(aj.costoDomicilio) || 0 : 0;
  const subtotal = lineas.reduce((s, l) => s + l.subtotal, 0);

  // Número del pedido: el navegador lo propone (va en el mensaje de WhatsApp) y aquí se valida
  let numero = /^VK-[A-Z0-9]{5,8}$/.test(d.numero || "") ? d.numero : "VK-" + crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  if (await env.TIENDA.get(llave(numero))) numero += crypto.randomUUID().slice(0, 2).toUpperCase();

  const pedido = {
    numero, creado: new Date().toISOString(), estado: "nuevo",
    entrega: domicilio ? "domicilio" : "recoger",
    nombre: t(d.nombre, 80), celular: t(d.celular, 30),
    direccion: domicilio ? t(d.direccion, 160) : "", barrio: domicilio ? t(d.barrio, 80) : "", indicaciones: domicilio ? t(d.indicaciones, 200) : "",
    destinatario: domicilio ? t(d.destinatario, 80) : "", celDest: domicilio ? t(d.celDest, 30) : "", sorpresa: domicilio && !!d.sorpresa,
    fecha: t(d.fecha, 10), hora: t(d.hora, 30), mensaje: t(d.mensaje, 400), pago: t(d.pago, 60), notas: t(d.notas, 300),
    items: lineas, subtotal, envio, total: subtotal + envio,
  };
  // Se guarda 1 año
  await env.TIENDA.put(llave(numero), JSON.stringify(pedido), { metadata: { creado: pedido.creado }, expirationTtl: 60 * 60 * 24 * 365 });
  return json({ ok: true, numero });
}

// Listar pedidos (solo panel)
export async function onRequestGet({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  const claves = [];
  let cursor;
  do {
    const r = await env.TIENDA.list({ prefix: "pedido:", cursor, limit: 1000 });
    claves.push(...r.keys); cursor = r.list_complete ? null : r.cursor;
  } while (cursor && claves.length < 3000);
  claves.sort((a, b) => String(b.metadata?.creado || "").localeCompare(String(a.metadata?.creado || "")));
  const ultimos = claves.slice(0, 200);
  const pedidos = (await Promise.all(ultimos.map(k => env.TIENDA.get(k.name, "json")))).filter(Boolean);
  pedidos.sort((a, b) => b.creado.localeCompare(a.creado));
  return json(pedidos);
}

// Cambiar estado o nota interna (solo panel)
export async function onRequestPut({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  let d; try { d = await request.json(); } catch { return json({ error: "Datos inválidos" }, 400); }
  const k = llave(t(d.numero, 20));
  const p = await env.TIENDA.get(k, "json");
  if (!p) return json({ error: "Pedido no encontrado" }, 404);
  if (d.estado !== undefined) { if (!ESTADOS.includes(d.estado)) return json({ error: "Estado inválido" }, 400); p.estado = d.estado; }
  if (d.notaInterna !== undefined) p.notaInterna = t(d.notaInterna, 500);
  p.actualizado = new Date().toISOString();
  await env.TIENDA.put(k, JSON.stringify(p), { metadata: { creado: p.creado }, expirationTtl: 60 * 60 * 24 * 365 });
  return json(p);
}

// Borrar un pedido (solo panel)
export async function onRequestDelete({ env, request }) {
  const f = sinAlmacen(env); if (f) return f;
  if (!(await autorizado(request, env))) return noAutorizado();
  const n = t(new URL(request.url).searchParams.get("numero"), 20);
  await env.TIENDA.delete(llave(n));
  return json({ ok: true });
}
