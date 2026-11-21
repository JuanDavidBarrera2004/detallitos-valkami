// Utilidades compartidas del "servidor" (Cloudflare Pages Functions)
export const json = (datos, estado = 200, extra = {}) =>
  new Response(JSON.stringify(datos), { status: estado, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra } });

export function sinAlmacen(env) {
  return !env.TIENDA ? json({ error: "Falta conectar el almacenamiento (KV con el nombre TIENDA) en Cloudflare." }, 503) : null;
}

// Compara la contraseña sin filtrar información por el tiempo de respuesta
async function igual(a, b) {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  const x = new Uint8Array(ha), y = new Uint8Array(hb);
  let d = 0; for (let i = 0; i < x.length; i++) d |= x[i] ^ y[i];
  return d === 0;
}

export async function autorizado(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const h = request.headers.get("Authorization") || "";
  const clave = h.startsWith("Bearer ") ? h.slice(7) : "";
  return clave.length > 0 && (await igual(clave, env.ADMIN_PASSWORD));
}
export const noAutorizado = () => json({ error: "Contraseña incorrecta o sesión vencida." }, 401);

export async function leerProductos(env) { return (await env.TIENDA.get("productos", "json")) || []; }
export async function guardarProductos(env, l) { await env.TIENDA.put("productos", JSON.stringify(l)); }

const texto = (v, max = 200) => String(v ?? "").trim().slice(0, max);
const numero = v => Math.max(0, Math.round(Number(String(v ?? "").replace(/[^\d.]/g, "")) || 0));

export function limpiarProducto(p) {
  const id = texto(p.id, 60).replace(/[^a-z0-9-]/gi, "") || "p-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const opciones = (Array.isArray(p.opciones) ? p.opciones : []).map(o => ({ nombre: texto(o.nombre, 60), precio: numero(o.precio) })).filter(o => o.nombre && o.precio).slice(0, 12);
  return {
    id,
    nombre: texto(p.nombre, 120) || "Detalle sin nombre",
    categoria: texto(p.categoria, 60),
    precio: opciones.length ? Math.min(...opciones.map(o => o.precio)) : numero(p.precio),
    precioAntes: numero(p.precioAntes) || 0,
    descripcion: texto(p.descripcion, 2000),
    incluye: (Array.isArray(p.incluye) ? p.incluye : String(p.incluye || "").split("\n")).map(x => texto(x, 120)).filter(Boolean).slice(0, 30),
    opciones,
    imagenes: (Array.isArray(p.imagenes) ? p.imagenes : []).map(u => texto(u, 500)).filter(u => /^(\/api\/img\/|https:\/\/)/.test(u)).slice(0, 8),
    visible: p.visible !== false,
    destacado: !!p.destacado,
    agotado: !!p.agotado,
    orden: Number.isFinite(Number(p.orden)) && p.orden !== "" ? Number(p.orden) : 999,
    actualizado: new Date().toISOString(),
  };
}

export const AJUSTES_BASE = {
  anuncio: "Domicilio por solo $3.000 · o recoge tu detalle en la tienda",
  costoDomicilio: 3000,
  direccion: "",
  horario: "Lunes a sábado, 8:00 a.m. a 6:00 p.m.",
  zonaDomicilio: "",
  imagenPortada: "",
  categorias: ["Desayunos sorpresa", "Anchetas", "Arreglos y flores", "Cajas sorpresa", "Globos", "Personalizados"],
};
export function limpiarAjustes(a) {
  const cats = (Array.isArray(a.categorias) ? a.categorias : String(a.categorias || "").split("\n")).map(x => texto(x, 60)).filter(Boolean);
  const img = texto(a.imagenPortada, 500);
  return {
    anuncio: texto(a.anuncio, 160),
    costoDomicilio: a.costoDomicilio === "" || a.costoDomicilio == null ? 3000 : numero(a.costoDomicilio),
    direccion: texto(a.direccion, 200),
    horario: texto(a.horario, 200),
    zonaDomicilio: texto(a.zonaDomicilio, 200),
    imagenPortada: /^(\/api\/img\/|https:\/\/)/.test(img) ? img : "",
    categorias: [...new Set(cats)].slice(0, 20).length ? [...new Set(cats)].slice(0, 20) : AJUSTES_BASE.categorias,
  };
}
