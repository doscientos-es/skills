---
name: operational-react-supabase
description: 'Estándar de Doscientos para iniciar y mantener CRM, billing, portales autenticados y demos operativas: Vite, React, TanStack Router, TanStack Query, Supabase y @doscientos/ui. Usar antes de crear estructura, rutas, datos o dependencias en este tipo de aplicación.'
---

# Aplicaciones operativas React + Supabase

## Cuándo aplicar esta skill

Úsala para un CRM, ERP ligero, portal de cliente, gestión operativa, facturación o demo con usuarios autenticados y Supabase. No la uses para una landing SEO: usa Astro. No migres un proyecto existente desde Next, React Router u otro stack salvo una decisión explícita.

## Decisión de arquitectura

El estándar es **Vite + React + TypeScript + TanStack Router + TanStack Query + Tailwind v4 + `@doscientos/ui` + Supabase**.

- El frontend es una SPA estática. No añadas SSR, TanStack Start, Next.js ni un backend Node por defecto.
- TanStack Router posee rutas y search params tipados.
- TanStack Query posee datos remotos, caché e invalidación.
- Supabase posee auth, PostgreSQL, storage y Edge Functions.
- `@doscientos/ui` posee primitives accesibles; no copies sus componentes ni mezcles otro sistema de overlays.
- Cloudflare Pages es el destino estático por defecto cuando la cuenta esté aprobada. No despliegues sin autorización.

Lee también `technical-details` y `doscientos-ecosystem`. Antes de instalar paquetes, confirma que no hay un stack o plantilla aprobada ya en el repositorio.

La carpeta [`starter`](./starter/README.md) acompaña esta skill y es una
referencia copiable para un repositorio nuevo. Demuestra el primer vertical con
fixtures, rutas y pruebas; sustituye su dominio sólo después de confirmar el
alcance y no la copies dentro de una aplicación existente.

## Límites de seguridad obligatorios

1. Activa RLS en toda tabla expuesta y escribe políticas mínimas por operación y rol.
2. El navegador solo puede recibir `VITE_SUPABASE_URL` y una clave publishable/anon. Nunca service role, certificados, claves de proveedores ni secretos de firma.
3. Edge Functions validan input, identidad, organización/tenant y permiso para cada mutación privilegiada.
4. Emisión de facturas, numeración, VERI*FACTU, webhooks, pagos, email y WhatsApp son server-side. Evalúa `@doscientos/billing` y `@doscientos/verifactu` con `doscientos-ecosystem`; no reimplementes reglas fiscales en React.
5. Usa migraciones pequeñas y versionadas. No ejecutes migraciones ni escribas datos reales sin autorización.

## Estructura inicial

Mantén capas explícitas y verticales. Adapta los nombres al dominio, pero no conviertas la aplicación en una carpeta global de `components` o `services`.

```text
src/
├── app/                 # proveedor Query, router, shell y rutas raíz
├── features/
│   └── invoices/        # ui, queries, mutations, schemas, types y tests del vertical
├── shared/
│   ├── lib/             # cliente Supabase, utilidades puras y formatos
│   └── ui/              # composición exclusiva del producto, no primitives duplicadas
├── demos/               # fixtures y escenarios default/loading/empty/error
└── routes/              # definiciones de TanStack Router; routeTree.gen.ts es generado
supabase/
├── migrations/
└── functions/
```

- Los componentes de presentación reciben datos y callbacks; no hacen consultas directas.
- Cada feature exporta una API pequeña. No importes sus detalles internos desde otra feature.
- El cliente Supabase de navegador vive en `shared/lib`; la autorización no depende de ocultar botones.
- No edites `routeTree.gen.ts` a mano.

## Patrones de interfaz

Antes de crear un componente, consulta `@doscientos/ui` y Storybook.

- Shell: usa `AppShell` como foundation y conserva navegación, branding y permisos en la app.
- Listados: combina `PageHeader`, `FilterBar`, `SelectionToolbar`, tabla, paginación y `DataViewState`.
- Detalle: usa `DescriptionList`, secciones y `DetailDrawer` cuando una ficha rápida sea adecuada.
- Cada pantalla con datos define `loading`, `empty`, `error`, permisos y reintento.
- Añade un patrón compartido solo después de dos usos reales; colócalo en `shared/ui` primero, no en `@doscientos/ui` ni en un paquete nuevo.

## Datos, rutas y formularios

- Valida search params con TanStack Router. La URL contiene filtros, orden, página y vista enlazable; usa los codecs de `@doscientos/ui` si la app necesita normalizarlos.
- Las queries de una feature tienen keys estables y invalidan únicamente los recursos afectados tras una mutación.
- Usa estado local para UI efímera. No dupliques respuestas de Query en stores globales.
- Para formularios complejos, valida en cliente y en Edge Function con esquemas compartidos o equivalentes. Muestra errores accesibles junto al campo.

## Demos reproducibles

Toda demo debe poder mostrar los mismos escenarios sin depender de datos de producción:

- `default`: flujo representativo con datos sintéticos.
- `loading`: skeleton o estado de carga.
- `empty`: sin registros y CTA apropiada.
- `error`: mensaje recuperable, sin stack traces.
- `long-content`: nombres, descripciones y tablas extensas.

Usa las mismas fixtures para Storybook y tests cuando sea posible. Etiqueta claramente el modo demo y no dejes integraciones externas activas por defecto.

## Calidad mínima

El proyecto expone `dev`, `build`, `lint`, `format:check`, `typecheck` y `test` mediante pnpm. Antes de cerrar una fase ejecuta los checks acotados y finalmente la suite apropiada, build y revisión de secretos.

Documenta en el README: propósito, arranque, scripts, variables por nombre, arquitectura, modo demo, modelo de despliegue y qué operaciones viven en Edge Functions. Añade `.env.example` sin valores sensibles.
