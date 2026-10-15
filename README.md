# Restaurante Kristal

Sitio independiente del restaurante de comida china de Hipermercado Kristal. La página pública y el panel de administración comparten Supabase; el panel requiere una cuenta con `app_metadata.role = admin`.

## Configurar Supabase

1. Abre el SQL Editor del proyecto Supabase que ya usa Kristal y ejecuta `supabase-restaurante.sql` una sola vez. Crea tablas, categorías, bucket de fotos, políticas RLS y eventos Realtime separados de la tienda del hipermercado. Se puede volver a ejecutar sin duplicar las categorías iniciales.
2. `supabase-config.js` contiene la URL del proyecto y la clave pública necesaria para el navegador. Nunca agregues una clave `service_role` o secreta.
3. Publica este repositorio con GitHub Pages. El workflow de `.github/workflows/pages.yml` despliega la raíz del repositorio.
4. El menú estará en la raíz del sitio y el panel privado en `/admin/`. Usa el usuario administrador existente de Supabase.

No se incluyen platos de ejemplo ni precios inventados. Agrégalos desde el panel para que aparezcan en el menú público y se puedan pedir por WhatsApp.
