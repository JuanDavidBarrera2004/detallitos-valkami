// /api/login — verifica la contraseña del panel
import { json, autorizado } from "../lib/comun.js";

export async function onRequestPost({ env, request }) {
  if (!env.ADMIN_PASSWORD) return json({ error: "Falta crear la contraseña ADMIN_PASSWORD en Cloudflare (Configuración → Variables y secretos)." }, 503);
  if (!(await autorizado(request, env))) {
    await new Promise(r => setTimeout(r, 700)); // frena intentos repetidos
    return json({ error: "Contraseña incorrecta." }, 401);
  }
  return json({ ok: true, almacen: !!env.TIENDA });
}
