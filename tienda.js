// Detallitos Valkami — lógica compartida de la tienda (carrito, pedido por WhatsApp, catálogo)
export const NEGOCIO = {
  nombre: "Detallitos Valkami",
  whatsapp: "573222612304",
  whatsappVisible: "322 261 2304",
  instagram: "https://www.instagram.com/detallitosvalkami/",
  instagramUsuario: "@detallitosvalkami",
};

const AJUSTES_BASE = {
  anuncio: "Domicilio por solo $3.000 · o recoge tu detalle en la tienda",
  costoDomicilio: 3000,
  direccion: "",
  horario: "Lunes a sábado, 8:00 a.m. a 6:00 p.m.",
  zonaDomicilio: "",
  nequi: "",
  nequiTitular: "",
  transferencia: "",
  categorias: ["Desayunos sorpresa", "Anchetas", "Arreglos y flores", "Cajas sorpresa", "Globos", "Personalizados"],
};

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = (t = "") => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const pesos = n => "$" + Math.round(Number(n) || 0).toLocaleString("es-CO");
export const slug = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const waUrl = texto => `https://api.whatsapp.com/send?phone=${NEGOCIO.whatsapp}&text=${encodeURIComponent(texto)}`;

// ---------- Íconos ----------
export const ICO = {
  bolsa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  mas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  moto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h5l3-6h-4l-2-3H8"/><path d="M14.5 6h3l1 5"/></svg>',
  tienda: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v10h16V10"/><path d="M3 4h18l-1 6H4L3 4Z"/><path d="M10 20v-5h4v5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg>',
  corazon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z"/></svg>',
  estrella: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  buscar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  regalo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="3.5" y="9" width="17" height="4" rx="1"/><path d="M5 13v7h14v-7M12 9v11M12 9S10.5 4 8 4.5 7 9 12 9Zm0 0s1.5-5 4-4.5S17 9 12 9Z"/></svg>',
  tarjeta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>',
  calendario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
};

// Dibujos para categorías (se usan cuando un producto todavía no tiene foto)
const ARTE = {
  desayuno: '<svg viewBox="0 0 64 64" fill="none" stroke="#64388f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40h48l-4 10H12z" fill="#f3e6f2"/><path d="M20 40v-8a4 4 0 0 1 4-4h6v12"/><path d="M30 31h3a3 3 0 0 1 0 6h-3"/><circle cx="44" cy="34" r="6" fill="#fff6d6" stroke="#c9a45c"/><path d="M24 22c0-3 3-3 3-6M29 22c0-3 3-3 3-6" stroke="#c9a45c"/></svg>',
  ancheta: '<svg viewBox="0 0 64 64" fill="none" stroke="#64388f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 30h44l-5 22H15z" fill="#f3e6f2"/><path d="M18 30c0-12 28-12 28 0"/><path d="M22 30v-6l6-4 4 4v6M36 30v-8h6v8" stroke="#c9a45c"/><path d="M12 38h40" stroke="#c9a45c"/></svg>',
  flores: '<svg viewBox="0 0 64 64" fill="none" stroke="#64388f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 36h20l-4 20H26z" fill="#f3e6f2"/><circle cx="32" cy="18" r="6" fill="#fde4ef"/><circle cx="21" cy="25" r="5" fill="#fff6d6" stroke="#c9a45c"/><circle cx="43" cy="25" r="5" fill="#ede0fa"/><path d="M32 24v12M23 30l5 6M41 30l-5 6"/></svg>',
  caja: '<svg viewBox="0 0 64 64" fill="none" stroke="#64388f" stroke-width="1.8" stroke-linejoin="round"><rect x="12" y="26" width="40" height="28" rx="2" fill="#ede0fa"/><rect x="9" y="19" width="46" height="9" rx="2" fill="#f3e6f2"/><path d="M32 19v35" stroke="#c9a45c" stroke-width="3"/><path d="M32 19s-4-9-10-7 0 7 10 7Zm0 0s4-9 10-7 0 7-10 7Z" stroke="#c9a45c" fill="#fff6d6"/></svg>',
  globos: '<svg viewBox="0 0 64 64" fill="none" stroke="#64388f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="24" cy="20" rx="9" ry="11" fill="#ede0fa"/><ellipse cx="40" cy="17" rx="9" ry="11" fill="#fde4ef"/><ellipse cx="34" cy="31" rx="8" ry="10" fill="#fff6d6" stroke="#c9a45c"/><path d="M24 31c0 8 6 14 8 25M40 28c0 9-6 16-8 28M34 41l-2 15"/></svg>',
  personalizado: '<svg viewBox="0 0 64 64" fill="none" stroke="#64388f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22h28v26a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6z" fill="#f3e6f2"/><path d="M42 28h4a5 5 0 0 1 0 10h-4"/><path d="M28 32s-5-3-5-6.5a2.6 2.6 0 0 1 5-1 2.6 2.6 0 0 1 5 1C33 29 28 32 28 32Z" fill="#fde4ef"/><path d="M48 10l1.5 4.5L54 16l-4.5 1.5L48 22l-1.5-4.5L42 16l4.5-1.5z" fill="#fff6d6" stroke="#c9a45c"/></svg>',
  peluche: '<svg viewBox="0 0 64 64" fill="none" stroke="#64388f" stroke-width="1.8" stroke-linejoin="round"><circle cx="20" cy="16" r="6" fill="#f3e6f2"/><circle cx="44" cy="16" r="6" fill="#f3e6f2"/><circle cx="32" cy="26" r="13" fill="#ede0fa"/><ellipse cx="32" cy="48" rx="15" ry="11" fill="#ede0fa"/><circle cx="27" cy="24" r="1.4" fill="#64388f"/><circle cx="37" cy="24" r="1.4" fill="#64388f"/><path d="M29 30c2 2 4 2 6 0"/><path d="M32 44s-5-3-5-6a2.5 2.5 0 0 1 5-1 2.5 2.5 0 0 1 5 1c0 3-5 6-5 6Z" fill="#fde4ef" stroke="#c9a45c"/></svg>',
};
export function arte(categoria = "") {
  const c = slug(categoria);
  if (c.includes("desayun") || c.includes("brunch")) return ARTE.desayuno;
  if (c.includes("anchet") || c.includes("cesta") || c.includes("licor")) return ARTE.ancheta;
  if (c.includes("flor") || c.includes("arregl") || c.includes("rosa")) return ARTE.flores;
  if (c.includes("glob")) return ARTE.globos;
  if (c.includes("peluch")) return ARTE.peluche;
  if (c.includes("personal") || c.includes("taza") || c.includes("mug")) return ARTE.personalizado;
  return ARTE.caja;
}

// ---------- Datos ----------
// Vista previa: se muestra solo si la página corre sin el servidor de Cloudflare (por ejemplo, abriendo el archivo en el computador).
export let VISTA_PREVIA = false;
const DEMO = [
  { id: "demo-1", nombre: "Desayuno sorpresa Clásico", categoria: "Desayunos sorpresa", precio: 85000, destacado: true, descripcion: "Ejemplo de vista previa. El administrador reemplaza estos productos desde el panel.", incluye: ["Bandeja decorada", "Sándwich o croissant", "Jugo natural", "Fruta picada", "Tarjeta con tu mensaje"] },
  { id: "demo-2", nombre: "Ancheta Dulce Momento", categoria: "Anchetas", precio: 120000, precioAntes: 135000, destacado: true, descripcion: "Ejemplo de vista previa." },
  { id: "demo-3", nombre: "Bouquet de rosas", categoria: "Arreglos y flores", precio: 95000, destacado: true, descripcion: "Ejemplo de vista previa." },
  { id: "demo-4", nombre: "Caja sorpresa Mini", categoria: "Cajas sorpresa", precio: 55000, destacado: true, descripcion: "Ejemplo de vista previa.", opciones: [{ nombre: "Mini", precio: 55000 }, { nombre: "Mediana", precio: 75000 }, { nombre: "Grande", precio: 98000 }] },
  { id: "demo-5", nombre: "Bouquet de globos", categoria: "Globos", precio: 45000, descripcion: "Ejemplo de vista previa." },
  { id: "demo-6", nombre: "Mug personalizado", categoria: "Personalizados", precio: 35000, descripcion: "Ejemplo de vista previa." },
];

let _ajustes, _productos;
async function api(ruta) {
  const r = await fetch(ruta, { headers: { Accept: "application/json" } });
  if (!r.ok || !(r.headers.get("content-type") || "").includes("json")) throw new Error("sin api");
  return r.json();
}
export async function ajustes() {
  if (_ajustes) return _ajustes;
  try { _ajustes = { ...AJUSTES_BASE, ...(await api("/api/ajustes")) }; }
  catch { _ajustes = { ...AJUSTES_BASE }; }
  if (!Array.isArray(_ajustes.categorias) || !_ajustes.categorias.length) _ajustes.categorias = AJUSTES_BASE.categorias;
  _ajustes.costoDomicilio = Number(_ajustes.costoDomicilio ?? 3000) || 0;
  return _ajustes;
}
export async function productos() {
  if (_productos) return _productos;
  try { _productos = await api("/api/productos"); }
  catch { _productos = DEMO; VISTA_PREVIA = true; }
  _productos = _productos.filter(p => p.visible !== false).sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
  return _productos;
}
let _entregas;
export async function entregas() {
  if (_entregas) return _entregas;
  try { _entregas = await api("/api/entregas"); } catch { _entregas = []; }
  return _entregas;
}
export function pintarGaleria(el, lista) {
  if (!lista.length) { el.innerHTML = `<div class="vacio">Muy pronto verás aquí fotos de nuestros pedidos entregados.</div>`; return; }
  el.innerHTML = lista.map((e, i) => `<button class="foto-ent aparece" data-i="${i}" aria-label="Ver foto${e.texto ? ": " + esc(e.texto) : ""}">
    <img src="${esc(e.imagen)}" alt="${esc(e.texto || "Pedido entregado por Detallitos Valkami")}" loading="lazy">
    ${e.texto ? `<span>${esc(e.texto)}</span>` : ""}</button>`).join("");
  el.onclick = ev => { const b = ev.target.closest(".foto-ent"); if (b) verFoto(lista, +b.dataset.i); };
  observar();
}
function verFoto(lista, i) {
  let v = $("#visor");
  if (!v) {
    document.body.insertAdjacentHTML("beforeend", `<div class="visor" id="visor" role="dialog" aria-modal="true" aria-label="Foto de pedido entregado">
      <button class="cerrar v-cerrar" aria-label="Cerrar">${ICO.x}</button><button class="v-nav v-ant" aria-label="Anterior">‹</button>
      <figure><img alt=""><figcaption></figcaption></figure><button class="v-nav v-sig" aria-label="Siguiente">›</button></div>`);
    v = $("#visor");
    v.onclick = e => { if (e.target === v || e.target.closest(".v-cerrar")) cerrarVisor(); };
    document.addEventListener("keydown", e => { if (!v.classList.contains("abierto")) return; if (e.key === "Escape") cerrarVisor(); if (e.key === "ArrowRight") v._mover(1); if (e.key === "ArrowLeft") v._mover(-1); });
  }
  const pintar = () => { const e = lista[v._i]; $("img", v).src = e.imagen; $("img", v).alt = e.texto || "Pedido entregado"; $("figcaption", v).textContent = e.texto || ""; };
  v._i = i; v._mover = d => { v._i = (v._i + d + lista.length) % lista.length; pintar(); };
  $(".v-ant", v).onclick = () => v._mover(-1); $(".v-sig", v).onclick = () => v._mover(1);
  $$(".v-nav", v).forEach(b => b.style.display = lista.length > 1 ? "" : "none");
  pintar(); v.classList.add("abierto"); document.body.style.overflow = "hidden";
}
function cerrarVisor() { $("#visor")?.classList.remove("abierto"); document.body.style.overflow = ""; }
export const precioDe = p => (p.opciones && p.opciones.length ? Math.min(...p.opciones.map(o => Number(o.precio) || 0)) : Number(p.precio) || 0);

// ---------- Tarjetas ----------
export function tarjeta(p) {
  const img = (p.imagenes || [])[0];
  const agotado = p.agotado;
  const oferta = p.precioAntes && Number(p.precioAntes) > precioDe(p);
  const desde = p.opciones && p.opciones.length > 1 ? "Desde " : "";
  return `<article class="tarjeta aparece">
    <a href="/producto.html?id=${encodeURIComponent(p.id)}" class="foto" aria-label="${esc(p.nombre)}">
      ${agotado ? '<span class="sello agotado">Agotado</span>' : oferta ? '<span class="sello oferta">Oferta</span>' : p.destacado ? '<span class="sello">Favorito</span>' : ""}
      ${img ? `<img src="${esc(img)}" alt="${esc(p.nombre)}" loading="lazy">` : `<div class="arte">${arte(p.categoria)}</div>`}
    </a>
    ${agotado ? "" : `<button class="agregar" data-agregar="${esc(p.id)}" aria-label="Agregar ${esc(p.nombre)} al carrito">${ICO.mas}</button>`}
    <a href="/producto.html?id=${encodeURIComponent(p.id)}" class="info">
      <span class="cat">${esc(p.categoria || "")}</span>
      <h3>${esc(p.nombre)}</h3>
      <div class="precio"><b>${desde}${pesos(precioDe(p))}</b>${oferta ? `<s>${pesos(p.precioAntes)}</s>` : ""}</div>
    </a>
  </article>`;
}
export function pintarRejilla(el, lista, vacio = "Muy pronto tendremos nuevos detalles aquí.") {
  el.innerHTML = lista.length ? lista.map(tarjeta).join("") : `<div class="vacio">${esc(vacio)}<br><br><a class="btn btn-morado" href="${waUrl("Hola Detallitos Valkami, quiero información sobre sus detalles")}" target="_blank" rel="noopener">${ICO.wa} Pregúntanos por WhatsApp</a></div>`;
  observar();
}

// ---------- Carrito ----------
const CLAVE = "valkami_carrito";
export const Carrito = {
  leer() { try { return JSON.parse(localStorage.getItem(CLAVE)) || []; } catch { return []; } },
  guardar(l) { try { localStorage.setItem(CLAVE, JSON.stringify(l)); } catch {} pintarCarrito(); },
  agregar(p, cant = 1, opcion = null) {
    const l = this.leer();
    const llave = p.id + (opcion ? "::" + opcion.nombre : "");
    const ya = l.find(i => i.llave === llave);
    if (ya) ya.cant += cant;
    else l.push({ llave, id: p.id, nombre: p.nombre, opcion: opcion ? opcion.nombre : "", precio: opcion ? Number(opcion.precio) : precioDe(p), img: (p.imagenes || [])[0] || "", categoria: p.categoria || "", cant });
    this.guardar(l);
  },
  cambiar(llave, d) { const l = this.leer(); const i = l.find(x => x.llave === llave); if (!i) return; i.cant += d; this.guardar(i.cant > 0 ? l : l.filter(x => x !== i)); },
  quitar(llave) { this.guardar(this.leer().filter(x => x.llave !== llave)); },
  vaciar() { this.guardar([]); },
  subtotal() { return this.leer().reduce((s, i) => s + i.precio * i.cant, 0); },
  unidades() { return this.leer().reduce((s, i) => s + i.cant, 0); },
};

let entrega = "domicilio";
function costoEnvio(aj) { return entrega === "domicilio" ? aj.costoDomicilio : 0; }

function pintarCarrito() {
  const aj = _ajustes || AJUSTES_BASE;
  const n = Carrito.unidades();
  $$(".burbuja").forEach(b => { b.textContent = n || ""; b.dataset.n = n; });
  const cuerpo = $("#cajonCuerpo"), pie = $("#cajonPie");
  if (!cuerpo) return;
  const l = Carrito.leer();
  if (!l.length) {
    cuerpo.innerHTML = `<div class="carrito-vacio">${ICO.regalo}<p>Tu carrito está vacío.</p><p style="margin-top:6px">Elige un detalle para alguien especial.</p><a href="/tienda.html" class="btn btn-morado" style="margin-top:24px">Ver detalles</a></div>`;
    pie.classList.add("oculto");
    return;
  }
  pie.classList.remove("oculto");
  cuerpo.innerHTML = l.map(i => `<div class="item">
    <div class="mini">${i.img ? `<img src="${esc(i.img)}" alt="">` : `<div class="arte">${arte(i.categoria)}</div>`}</div>
    <div><h4>${esc(i.nombre)}</h4>${i.opcion ? `<div style="font-size:13px;color:var(--gris)">${esc(i.opcion)}</div>` : ""}<div class="p">${pesos(i.precio)}</div>
      <div class="cantidad"><button data-menos="${esc(i.llave)}" aria-label="Quitar uno">−</button><span>${i.cant}</span><button data-mas="${esc(i.llave)}" aria-label="Agregar uno">+</button></div></div>
    <button class="quitar" data-quitar="${esc(i.llave)}">Quitar</button>
  </div>`).join("");
  const sub = Carrito.subtotal(), env = costoEnvio(aj);
  $("#cSub").textContent = pesos(sub);
  $("#cEnv").textContent = entrega === "domicilio" ? (env ? pesos(env) : "Gratis") : "Gratis";
  $("#cTot").textContent = pesos(sub + env);
  $("#precioDom").textContent = aj.costoDomicilio ? "+ " + pesos(aj.costoDomicilio) : "Gratis";
}

export function abrirCarrito() { $("#velo").classList.add("abierto"); $("#cajon").classList.add("abierto"); document.body.style.overflow = "hidden"; }
export function cerrarCarrito() { $("#velo").classList.remove("abierto"); $("#cajon").classList.remove("abierto"); document.body.style.overflow = ""; }

export function aviso(texto) {
  let a = $("#aviso");
  if (!a) { a = document.createElement("div"); a.id = "aviso"; a.className = "aviso"; a.setAttribute("role", "status"); document.body.appendChild(a); }
  a.innerHTML = ICO.check + esc(texto);
  a.classList.add("ver"); clearTimeout(a._t); a._t = setTimeout(() => a.classList.remove("ver"), 2400);
}

// ---------- Pedido ----------
function hoyISO() { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
function horaBonita(h) {
  if (!/^\d{1,2}:\d{2}/.test(h || "")) return h || "";
  let [hh, mm] = h.split(":").map(Number); const pm = hh >= 12; hh = hh % 12 || 12;
  return `${hh}:${String(mm).padStart(2, "0")} ${pm ? "p. m." : "a. m."}`;
}
function fechaBonita(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
}

function abrirPedido() {
  const aj = _ajustes;
  if (!Carrito.leer().length) return;
  cerrarCarrito();
  const m = $("#modalPedido");
  const dom = entrega === "domicilio";
  $("#tituloPedido").textContent = dom ? "Datos para el domicilio" : "Datos para recoger";
  $$(".solo-dom", m).forEach(e => e.classList.toggle("oculto", !dom));
  $$(".solo-rec", m).forEach(e => e.classList.toggle("oculto", dom));
  $$(".solo-dom input[data-req]", m).forEach(e => e.required = dom);
  $("#lblFecha").firstChild.textContent = dom ? "Fecha de entrega" : "Fecha en que lo recoges";
  $("#fHora").parentElement.firstChild.textContent = dom ? "Hora de entrega" : "Hora en que lo recoges";
  $("#infoTienda").innerHTML = aj.direccion
    ? `${ICO.tienda}<span><b>Recoges en:</b> ${esc(aj.direccion)}${aj.horario ? `<br><small>${esc(aj.horario)}</small>` : ""}</span>`
    : `${ICO.tienda}<span>Te confirmamos por WhatsApp la dirección y la hora para recoger tu detalle.</span>`;
  $("#zonaDom").textContent = aj.zonaDomicilio ? aj.zonaDomicilio : "";
  $("#fFecha").min = hoyISO();
  const sub = Carrito.subtotal(), env = costoEnvio(aj);
  $("#resumen").innerHTML = Carrito.leer().map(i => `<div class="fila"><span>${i.cant} × ${esc(i.nombre)}${i.opcion ? " (" + esc(i.opcion) + ")" : ""}</span><span>${pesos(i.precio * i.cant)}</span></div>`).join("")
    + `<div class="fila" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--linea)"><span>${dom ? "Domicilio" : "Recoger en tienda"}</span><span>${dom ? pesos(env) : "Gratis"}</span></div>`
    + `<div class="fila total" style="margin:8px 0 0"><span>Total</span><span>${pesos(sub + env)}</span></div>`;
  $("#errPedido").textContent = "";
  m.classList.add("abierto"); document.body.style.overflow = "hidden";
  setTimeout(() => $("#fNombre").focus(), 100);
}
function cerrarPedido() { $("#modalPedido").classList.remove("abierto"); document.body.style.overflow = ""; }

function enviarPedido(e) {
  e.preventDefault();
  const f = e.target, aj = _ajustes;
  if (!f.reportValidity()) return;
  const v = n => (f.elements[n]?.value || "").trim();
  const dom = entrega === "domicilio";
  const l = Carrito.leer(), sub = Carrito.subtotal(), env = costoEnvio(aj);
  const numero = "VK-" + Array.from(crypto.getRandomValues(new Uint8Array(5)), x => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[x % 32]).join("");
  const lineas = [
    `✨ *Nuevo pedido — ${NEGOCIO.nombre}* ✨`,
    `*Pedido:* ${numero}`, "",
    "*Productos:*",
    ...l.map(i => `• ${i.cant} × ${i.nombre}${i.opcion ? " (" + i.opcion + ")" : ""} — ${pesos(i.precio * i.cant)}`), "",
    `Subtotal: ${pesos(sub)}`,
    dom ? `Domicilio: ${pesos(env)}` : "Recoger en tienda: Gratis",
    `*Total: ${pesos(sub + env)}*`, "",
    `*Entrega:* ${dom ? "🛵 Domicilio" : "🏬 Recoger en la tienda"}`,
    `*Fecha:* ${fechaBonita(v("fecha"))}${v("hora") ? " · " + horaBonita(v("hora")) : ""}`, "",
    `*Cliente:* ${v("nombre")}`,
    `*Celular:* ${v("celular")}`,
  ];
  if (dom) {
    lineas.push(`*Dirección:* ${v("direccion")}${v("barrio") ? ", barrio " + v("barrio") : ""}`);
    if (v("indicaciones")) lineas.push(`*Indicaciones:* ${v("indicaciones")}`);
    if (v("destinatario")) lineas.push(`*Para:* ${v("destinatario")}${v("celDest") ? " (" + v("celDest") + ")" : ""}`);
    if (f.elements.sorpresa?.checked) lineas.push("🎁 *Es sorpresa* — por favor coordinar conmigo, no con quien recibe.");
  }
  if (v("mensaje")) lineas.push("", `💌 *Mensaje para la tarjeta:* "${v("mensaje")}"`);
  lineas.push(`*Forma de pago:* ${v("pago")}`);
  if (v("notas")) lineas.push(`*Notas:* ${v("notas")}`);
  window.open(waUrl(lineas.join("\n")), "_blank", "noopener");
  // Guarda una copia del pedido para el panel de administración
  if (!VISTA_PREVIA) {
    const datos = { numero, entrega, items: l.map(i => ({ id: i.id, nombre: i.nombre, opcion: i.opcion, cant: i.cant })) };
    ["nombre", "celular", "direccion", "barrio", "indicaciones", "destinatario", "celDest", "fecha", "hora", "mensaje", "pago", "notas"].forEach(k => datos[k] = v(k));
    datos.hora = horaBonita(v("hora"));
    datos.sorpresa = !!f.elements.sorpresa?.checked;
    try { fetch("/api/pedidos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos), keepalive: true }).catch(() => {}); } catch {}
  }
  const pago = v("pago");
  Carrito.vaciar();
  f.reset();
  cerrarPedido();
  mostrarPago(numero, sub + env, pago, dom);
}

// ---------- Pago después del pedido ----------
function mostrarPago(numero, total, pago, dom) {
  const aj = _ajustes, m = $("#modalPago");
  const efectivo = /efectivo/i.test(pago);
  $("#pagoNum").textContent = numero;
  $("#pagoTotal").textContent = pesos(total);
  const bloques = [];
  if (aj.nequi) bloques.push({ k: "Nequi", html: `<div class="pago-op${/nequi/i.test(pago) ? " sel" : ""}"><div class="pago-tit"><span class="pago-logo nequi">N</span><b>Nequi</b></div>
      <div class="pago-dato"><span>${esc(aj.nequi)}</span><button type="button" class="copiar" data-copiar="${esc(aj.nequi.replace(/\s/g, ""))}">Copiar</button></div>
      ${aj.nequiTitular ? `<small>A nombre de ${esc(aj.nequiTitular)}</small>` : ""}</div>` });
  if (aj.transferencia) bloques.push({ k: "Transferencia", html: `<div class="pago-op${/transfer/i.test(pago) ? " sel" : ""}"><div class="pago-tit"><span class="pago-logo banco">${ICO.tienda}</span><b>Transferencia bancaria</b></div>
      <div class="pago-dato multi"><span>${esc(aj.transferencia)}</span><button type="button" class="copiar" data-copiar="${esc(aj.transferencia)}">Copiar</button></div></div>` });
  if (/transfer/i.test(pago)) bloques.reverse();
  $("#pagoDatos").innerHTML = efectivo
    ? `<div class="pago-op sel"><div class="pago-tit"><span class="pago-logo banco">$</span><b>Pago en efectivo</b></div><small>Pagas ${dom ? "cuando recibas tu detalle" : "cuando lo recojas en la tienda"}. Ten listo el valor exacto si puedes.</small></div>`
    : bloques.length ? bloques.map(b => b.html).join("") : `<div class="pago-op"><small>En un momento te enviamos por WhatsApp los datos para pagar por Nequi o transferencia.</small></div>`;
  $("#pagoPasos").classList.toggle("oculto", efectivo);
  $("#btnSoporte").classList.toggle("oculto", efectivo);
  $("#btnSoporte").href = waUrl(`Hola ${NEGOCIO.nombre} ✨ Te envío el comprobante de pago del pedido ${numero} por ${pesos(total)} (${pago}). 📎`);
  m.classList.add("abierto"); document.body.style.overflow = "hidden";
}
function cerrarPago() { $("#modalPago").classList.remove("abierto"); document.body.style.overflow = ""; }

// ---------- Estructura común (carrito + modal) ----------
function montarComunes() {
  const html = `
  <div class="velo" id="velo"></div>
  <aside class="cajon" id="cajon" aria-label="Carrito de compras">
    <div class="cajon-cab"><h3>Tu carrito</h3><button class="cerrar" style="position:static" id="cerrarCajon" aria-label="Cerrar carrito">${ICO.x}</button></div>
    <div class="cajon-cuerpo" id="cajonCuerpo"></div>
    <div class="cajon-pie" id="cajonPie">
      <span class="etq">¿Cómo quieres recibirlo?</span>
      <div class="entrega-op" role="radiogroup">
        <label><input type="radio" name="entrega" value="domicilio" checked><span class="caja">${ICO.moto}<b>Domicilio</b><small id="precioDom">+ $3.000</small></span></label>
        <label><input type="radio" name="entrega" value="recoger"><span class="caja">${ICO.tienda}<b>Recoger en tienda</b><small>Gratis</small></span></label>
      </div>
      <div class="fila"><span>Subtotal</span><span id="cSub"></span></div>
      <div class="fila"><span>Entrega</span><span id="cEnv"></span></div>
      <div class="fila total"><span>Total</span><span id="cTot"></span></div>
      <button class="btn btn-oro btn-bloque" id="irPedido">Continuar pedido</button>
    </div>
  </aside>
  <div class="modal" id="modalPedido" role="dialog" aria-modal="true" aria-labelledby="tituloPedido">
    <div class="fondo" data-cerrar-pedido></div>
    <div class="caja-m">
      <button class="cerrar" data-cerrar-pedido aria-label="Cerrar">${ICO.x}</button>
      <span class="sup">Último paso</span>
      <h3 id="tituloPedido">Datos para el domicilio</h3>
      <p class="sub">Al confirmar se abre WhatsApp con tu pedido listo para enviar.</p>
      <form class="form" id="formPedido" novalidate>
        <label>Tu nombre<input name="nombre" id="fNombre" required autocomplete="name"></label>
        <label>Tu celular<input name="celular" required inputmode="tel" autocomplete="tel" pattern="[0-9 +]{7,}" placeholder="300 000 0000"></label>
        <div class="ancho solo-rec" id="infoTienda" style="display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:14px;background:var(--rubor);font-size:14px"></div>
        <label class="ancho solo-dom">Dirección de entrega<input name="direccion" data-req autocomplete="street-address" placeholder="Calle, carrera, número, apto"></label>
        <label class="solo-dom">Barrio<input name="barrio"></label>
        <label class="solo-dom">Indicaciones<input name="indicaciones" placeholder="Conjunto, torre, punto de referencia"></label>
        <p class="ancho solo-dom nota" id="zonaDom" style="margin-top:-6px"></p>
        <label class="solo-dom">¿Para quién es?<input name="destinatario" placeholder="Nombre de quien recibe"></label>
        <label class="solo-dom">Celular de quien recibe<input name="celDest" inputmode="tel" placeholder="Opcional"></label>
        <label class="ancho solo-dom" style="flex-direction:row;align-items:center;gap:10px;font-weight:400"><input type="checkbox" name="sorpresa" style="width:18px;height:18px;accent-color:var(--morado)"> Es una sorpresa (no avisar a quien recibe)</label>
        <label id="lblFecha">Fecha de entrega<input type="date" name="fecha" id="fFecha" required></label>
        <label>Hora de entrega<input type="time" name="hora" id="fHora" min="08:00" max="18:00" step="900"><span class="nota">Entre 8:00 a.m. y 6:00 p.m. Déjala vacía si no importa la hora.</span></label>
        <label class="ancho">Mensaje para la tarjeta <span class="nota">Opcional — lo escribimos con mucho cariño</span><textarea name="mensaje" maxlength="400" placeholder="Feliz cumpleaños, mi amor…"></textarea></label>
        <label>Forma de pago<select name="pago" required><option>Nequi</option><option>Transferencia bancaria</option><option>Efectivo</option></select></label>
        <label>Notas<input name="notas" placeholder="Colores, gustos, alergias…"></label>
        <div class="ancho resumen" id="resumen"></div>
        <p class="ancho error" id="errPedido" role="alert"></p>
        <button class="btn btn-oro btn-bloque ancho" type="submit">${ICO.wa} Enviar pedido por WhatsApp</button>
      </form>
    </div>
  </div>
  <div class="modal" id="modalPago" role="dialog" aria-modal="true" aria-labelledby="tituloPago">
    <div class="fondo" data-cerrar-pago></div>
    <div class="caja-m" style="width:min(520px,100%)">
      <button class="cerrar" data-cerrar-pago aria-label="Cerrar">${ICO.x}</button>
      <div class="pago-ok">${ICO.check}</div>
      <h3 id="tituloPago" style="text-align:center">¡Pedido enviado!</h3>
      <p class="sub" style="text-align:center">Pedido <b id="pagoNum"></b> · Total a pagar</p>
      <div class="pago-total" id="pagoTotal"></div>
      <div id="pagoDatos" class="pago-datos"></div>
      <ol class="pago-pasos" id="pagoPasos">
        <li>Paga el total por Nequi o transferencia.</li>
        <li>Toma una captura del comprobante.</li>
        <li>Pulsa el botón y adjunta la captura en WhatsApp 📎</li>
      </ol>
      <a class="btn btn-wa btn-bloque" id="btnSoporte" target="_blank" rel="noopener">${ICO.wa.replace("<svg", '<svg class="ico"')} Enviar comprobante por WhatsApp</a>
      <button class="btn btn-borde btn-bloque" data-cerrar-pago style="margin-top:10px">Listo</button>
    </div>
  </div>
  <a class="wa-flot" href="${waUrl("Hola Detallitos Valkami ✨ quiero hacer un pedido")}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${ICO.wa}</a>`;
  document.body.insertAdjacentHTML("beforeend", html);

  $("#velo").onclick = cerrarCarrito;
  $("#cerrarCajon").onclick = cerrarCarrito;
  $("#irPedido").onclick = abrirPedido;
  $$('input[name="entrega"]').forEach(r => r.onchange = () => { entrega = r.value; try { localStorage.setItem("valkami_entrega", entrega); } catch {} pintarCarrito(); });
  try { const g = localStorage.getItem("valkami_entrega"); if (g === "recoger" || g === "domicilio") { entrega = g; $(`input[name="entrega"][value="${g}"]`).checked = true; } } catch {}
  $$("[data-cerrar-pedido]").forEach(b => b.onclick = cerrarPedido);
  $$("[data-cerrar-pago]").forEach(b => b.onclick = cerrarPago);
  $("#modalPago").addEventListener("click", async e => {
    const b = e.target.closest("[data-copiar]"); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copiar); } catch { const t = document.createElement("textarea"); t.value = b.dataset.copiar; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    b.textContent = "¡Copiado!"; setTimeout(() => b.textContent = "Copiar", 1600);
  });
  $("#formPedido").addEventListener("submit", enviarPedido);
  $("#formPedido").addEventListener("invalid", e => { $("#errPedido").textContent = "Revisa los campos marcados para continuar."; }, true);
  $("#cajonCuerpo").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.mas) Carrito.cambiar(b.dataset.mas, 1);
    if (b.dataset.menos) Carrito.cambiar(b.dataset.menos, -1);
    if (b.dataset.quitar) Carrito.quitar(b.dataset.quitar);
  };
  document.addEventListener("keydown", e => { if (e.key === "Escape") { cerrarCarrito(); cerrarPedido(); cerrarPago(); } });
}

// Animación suave al hacer scroll
let io;
export function observar() {
  if (!("IntersectionObserver" in window)) { $$(".aparece").forEach(e => e.classList.add("visto")); return; }
  io ||= new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visto"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -40px 0px" });
  $$(".aparece:not(.visto)").forEach(e => io.observe(e));
}

export async function iniciar() {
  const aj = await ajustes();
  montarComunes();
  const an = $(".anuncio");
  if (an) { if (aj.anuncio) an.textContent = aj.anuncio; else an.remove(); }
  $$("[data-abrir-carrito]").forEach(b => b.onclick = abrirCarrito);
  const menu = $(".menu");
  $(".hamb")?.addEventListener("click", () => menu.classList.toggle("abierto"));
  $$("[data-costo-dom]").forEach(e => e.textContent = pesos(aj.costoDomicilio));
  $$("[data-direccion]").forEach(e => { if (aj.direccion) e.textContent = aj.direccion; });
  $$("[data-horario]").forEach(e => { if (aj.horario) e.textContent = aj.horario; else e.closest("li")?.remove(); });
  // botones "agregar" en cualquier rejilla
  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-agregar]"); if (!b) return;
    e.preventDefault();
    const p = (await productos()).find(x => x.id === b.dataset.agregar); if (!p) return;
    if (p.opciones && p.opciones.length > 1) { location.href = "/producto.html?id=" + encodeURIComponent(p.id); return; }
    Carrito.agregar(p, 1, p.opciones?.[0] || null);
    aviso(`${p.nombre} se agregó al carrito`);
  });
  pintarCarrito();
  observar();
  return aj;
}
