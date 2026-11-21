// /api/img/:id — entrega una foto guardada
export async function onRequestGet({ env, params }) {
  if (!env.TIENDA) return new Response("No encontrado", { status: 404 });
  const id = String(params.id || "").replace(/[^a-z0-9-]/gi, "");
  const { value, metadata } = await env.TIENDA.getWithMetadata("img:" + id, "arrayBuffer");
  if (!value) return new Response("No encontrado", { status: 404 });
  return new Response(value, {
    headers: { "Content-Type": metadata?.tipo || "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" },
  });
}
