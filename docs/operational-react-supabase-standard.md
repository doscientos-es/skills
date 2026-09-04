# Estándar de aplicaciones operativas

## Decisión

Los CRM, aplicaciones de facturación, portales autenticados y demos operativas de Doscientos se inician con **Vite, React, TypeScript, TanStack Router, TanStack Query, Tailwind v4, `@doscientos/ui` y Supabase**.

El objetivo es un frontend estático, rápido y de bajo coste, con datos y autenticación en Supabase. La lógica privilegiada vive en Supabase Edge Functions. Esta decisión evita añadir SSR, caché de servidor, Server Components o un backend Node cuando el producto no los necesita.

## Excepciones explícitas

| Caso                                                             | Tecnología                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------- |
| Landing, web corporativa, blog o SEO                             | Astro                                                   |
| Repositorio existente con Next o requisito confirmado de SSR/BFF | Mantener o elegir Next.js                               |
| Webhook, cron, integración sensible o proceso de fondo           | Edge Function; Worker sólo si el requisito lo justifica |

## Contrato de capas

| Capa                  | Responsabilidad                                         | No contiene                                 |
| --------------------- | ------------------------------------------------------- | ------------------------------------------- |
| `@doscientos/ui`      | primitives, accesibilidad y composición visual genérica | rutas, Supabase, entidades ni lógica fiscal |
| `shared/ui` de la app | patrones del producto repetidos en dos contextos        | queries, permisos ni secretos               |
| `features/*`          | UI, queries, mutaciones y schemas por vertical          | imports internos de otras features          |
| Supabase              | auth, RLS, datos, storage y funciones                   | secretos en el navegador                    |
| `@doscientos/billing` | reglas y contratos de facturación                       | UI y persistencia concreta                  |

## Primer vertical de un starter

No copies un CRM completo. El starter debe demostrar sólo estos flujos con fixtures:

1. Shell autenticado con navegación.
2. Listado de recursos con búsqueda, filtro en URL y estados loading/empty/error.
3. Ficha rápida con `DetailDrawer` y detalles semánticos.
4. Facturación como vertical opcional: KPIs, listado y acción privilegiada modelada como Edge Function.

Cada flujo debe tener una story o fixture de demo y pruebas de su contrato principal. Las tablas, nombres, roles e importes son datos sintéticos hasta que haya un modelo de datos aprobado.

## Adopción

1. Instala las skills `technical-details`, `doscientos-ecosystem` y `operational-react-supabase` en el repositorio nuevo.
2. Parte del [starter incluido en la skill](../skills/operational-react-supabase/starter/README.md) o replica su estructura; no copies sus entidades ni datos sintéticos como requisitos.
3. El agente revisa requisitos, operaciones privilegiadas, tenants y políticas RLS antes de crear tablas.
4. Crea primero shell, una ruta y una feature vertical; valida build, tipos y tests.
5. Extrae un patrón a `shared/ui` sólo tras su segundo uso real.
6. Evalúa publicar un patrón únicamente cuando ya sea estable y transversal en aplicaciones distintas.
