# Restaurante Kristal

Sitio independiente del restaurante de comida china de Hipermercado Kristal. La página pública y el panel de administración comparten Supabase; el panel requiere una cuenta con `app_metadata.role = admin`.

## Configurar Supabase

1. Abre el SQL Editor del proyecto Supabase que ya usa Kristal y ejecuta `supabase-restaurante.sql`. Crea tablas, categorías, bucket de fotos, políticas RLS y eventos Realtime separados de la tienda del hipermercado. Se puede volver a ejecutar sin duplicar las categorías iniciales; al actualizarlo se agregan también las categorías de sopas, chop suey, mariscos y especialidades.
2. `supabase-config.js` contiene la URL del proyecto y la clave pública necesaria para el navegador. Nunca agregues una clave `service_role` o secreta.
3. Publica este repositorio con GitHub Pages. El workflow de `.github/workflows/pages.yml` despliega la raíz del repositorio.
4. El menú estará en la raíz del sitio y el panel privado en `/admin/`. Usa el usuario administrador existente de Supabase.

La carta combina productos publicados desde Supabase con un menú editorial de presentación y opciones de ración para platos seleccionados. El carrito se guarda en el dispositivo; para enviar un pedido hay que completar el resumen con los datos del cliente y la entrega. La tasa oficial BCV se consulta en `ve.dolarapi.com` al abrir la página y cada hora, se muestra con su fecha de actualización y se incluye en los subtotales en bolívares. Si la consulta falla, la página identifica cualquier tasa local como desactualizada y no oculta que el equivalente en bolívares no está confirmado.

Los precios editoriales y las opciones de buffet (incluidos los extras de acompañantes) son referenciales hasta confirmar la oferta real del restaurante. Cada producto editorial utiliza una fotografía local diferente. Las fotografías son referenciales (Unsplash y Pexels), no fotografías tomadas en el restaurante.
