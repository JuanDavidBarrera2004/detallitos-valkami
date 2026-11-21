# Detallitos Valkami — página web

Tienda de detalles con catálogo, carrito, **domicilio (+$3.000) o recoger en tienda**, y pedido que llega listo al WhatsApp **322 261 2304**. Incluye panel de administrador para subir productos.

## Archivos
- `index.html` inicio · `tienda.html` catálogo · `producto.html` ficha de cada detalle
- `admin.html` panel de administrador (no aparece en Google)
- `estilos.css`, `tienda.js` diseño y lógica (carrito, pedido por WhatsApp)
- `functions/` el "servidor" que guarda productos, fotos y ajustes en Cloudflare
- `assets/` logo e íconos

## Publicar en Cloudflare Pages (gratis)
1. Sube **todo el contenido** de esta carpeta a un repositorio nuevo de GitHub (ej. `detallitos-valkami`).
2. Cloudflare → **Workers y Pages → Crear → Pages → Conectar a Git** → elige el repositorio.
   - Build command: *(vacío)* · Output directory: `/`
   - Nombre del proyecto: `detallitosvalkami` (así queda en detallitosvalkami.pages.dev)
3. **Workers y Pages → KV → Crear namespace** con el nombre `valkami-tienda`.
4. Proyecto de Pages → **Configuración → Enlaces (Bindings) → Agregar → KV namespace**: nombre `TIENDA`, namespace `valkami-tienda`.
5. **Configuración → Variables y secretos → Agregar**: `ADMIN_PASSWORD` (tipo Secreto) con la contraseña del panel.
6. **Implementaciones → Reintentar implementación**.
7. Entra a `detallitosvalkami.pages.dev/admin.html`.

Si usas otro nombre de proyecto o un dominio propio, cambia `detallitosvalkami.pages.dev` en `robots.txt` y `sitemap.xml`.

## Usar el panel
**Ajustes de la tienda** (hazlo primero):
- Dirección para recoger y horario: salen en el pedido cuando el cliente elige "Recoger en tienda" y en el pie de página.
- Costo del domicilio (viene en $3.000), zona de domicilios, mensaje de la franja superior.
- Categorías (una por línea) y foto de portada del inicio (si no hay, se ve el logo).

**Productos**: nombre, categoría, precio, precio antes (para ofertas), tamaños con precio (ej. Mini / Mediana / Grande), qué incluye, fotos (se reducen solas), Visible, Favorito (sale en el inicio), Agotado y Orden.

## Cómo llega un pedido
El cliente elige domicilio o recoger, llena nombre, celular, dirección (si es domicilio), fecha, hora, para quién es, si es sorpresa, mensaje para la tarjeta y forma de pago. Se abre WhatsApp con todo el pedido y el total ya calculado.
