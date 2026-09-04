# Starter operativo React + Supabase

Plantilla de referencia para que un agente inicie un CRM, portal autenticado,
aplicación de facturación o demo operativa. No es un producto listo para
producción ni un CRM genérico: demuestra una única feature de clientes con
fixtures y los límites de arquitectura que deben conservarse al adaptar el
dominio.

## Uso

1. Copia el contenido de esta carpeta a un **repositorio nuevo**, no a
   `@doscientos/ui` ni a un cliente existente.
2. Cambia el nombre del paquete, el título de `index.html` y la feature
   `customers` por el primer vertical aprobado.
3. Ejecuta `pnpm install` y después `pnpm quality` y `pnpm build`.
4. Mantén las fixtures mientras se valida el flujo. Sustituye únicamente el
   adaptador en `src/features/customers/infrastructure/list-customers.ts` al
   conectar Supabase.
5. Añade una migración y políticas RLS antes de leer datos reales. Las
   mutaciones privilegiadas se implementan en `supabase/functions/`.

No instales TanStack Start, Next.js, un servidor Node ni una librería de estado
global por defecto. No reutilices las entidades, nombres, datos ni textos de
este ejemplo como requisitos de un cliente.

## Contrato de la plantilla

| Área | Propósito |
| --- | --- |
| `src/app` | Inicialización de Query, router y shell; compone las features. |
| `src/routes` | Rutas de TanStack Router y validación de URL; `routeTree.gen.ts` es generado. |
| `src/features/customers` | UI, aplicación e infraestructura del vertical de ejemplo. |
| `src/shared/lib/supabase` | Constructor del cliente de navegador; no lo invoques desde componentes. |
| `src/demos` | Fixtures sintéticas reutilizables por los adaptadores y tests. |
| `supabase/migrations` | Migraciones pequeñas y versionadas, tras aprobar el modelo de datos. |
| `supabase/functions` | Operaciones con secretos, permisos adicionales o efectos externos. |

La URL pertenece a TanStack Router, la caché remota a TanStack Query y las
primitivas visuales a `@doscientos/ui`. La feature conserva la lógica de
filtrado y su adaptador; las rutas no conocen Supabase.

## Variables de entorno

`.env.example` sólo contiene nombres de variables públicas. En una SPA de Vite,
`VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` son visibles en el
navegador; es correcto porque RLS sigue siendo obligatoria. Nunca añadas service
role, certificados, claves de firma ni secretos de proveedores a una variable
`VITE_*`.

El modo de fixtures no necesita variables de entorno. `createBrowserSupabaseClient`
falla explícitamente si alguien intenta conectar datos reales sin configurarlas.

## Validación

- `pnpm format:check`: formato compartido.
- `pnpm lint`: reglas de React/Vite y capas de features.
- `pnpm structure:check`: estructura y nombres.
- `pnpm typecheck`: contrato TypeScript estricto.
- `pnpm test`: pruebas de lógica de URL y dominio.
- `pnpm quality`: todos los checks anteriores.
- `pnpm build`: compilación estática de Vite y generación del árbol de rutas.

Antes de añadir una nueva feature, replica los escenarios `default`, `loading`,
`empty`, `error` y contenido largo usando fixtures; conecta backend real sólo
cuando modelo, tenant, permisos y políticas estén aprobados.