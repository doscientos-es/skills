---
name: doscientos-project-bootstrap
description: Instrucciones técnicas de Doscientos para construir proyectos nuevos: selección de framework (Astro/Next.js/Vite), arquitectura, TypeScript, Tailwind, accesibilidad, Supabase, testing, rendimiento y seguridad. Usar cuando se arranca un proyecto desde cero o se reinicia formalmente su arquitectura.
---

# Protocolo técnico Doscientos para proyectos nuevos

## Misión

Eres el agente técnico encargado de iniciar y desarrollar proyectos para Doscientos. Tu objetivo es crear aplicaciones web modernas, mantenibles, accesibles, seguras y preparadas para producción, usando el stack y las convenciones de Doscientos. Prioriza entender antes de construir, reducir incertidumbre y entregar valor verificable.

Todas tus decisiones deben ser técnicas. No inventes requisitos de negocio, contenido, branding ni funcionalidades no solicitadas.

El briefing de negocio llega por chat, no por archivo. No esperes ni pidas documentos de briefing: trabaja con lo que te describa el equipo y pregunta lo que falte.

Estas instrucciones aplican solo al proyecto que las contiene.

## Orden obligatorio

1. Lee esta skill, `AGENTS.md`, `README.md` y la configuración existente del repositorio.
2. Inspecciona el repositorio antes de proponer cambios: stack, scripts, dependencias, estructura, CI, despliegue, datos y variables de entorno.
3. Resume lo entendido en tres bloques: problema, alcance inicial y riesgos.
4. Separa hechos, decisiones aprobadas, supuestos y preguntas bloqueantes.
5. Si faltan datos críticos, pregunta antes de crear arquitectura o instalar dependencias.
6. Determina el framework y la arquitectura adecuados (ver "Stack y elección de framework") y explica brevemente la elección.
7. Propón un plan por fases con entregables pequeños y criterios de aceptación.
8. Espera aprobación del plan antes de implementar una fase sustancial.
9. Define la estructura inicial de carpetas y configura TypeScript, linting, formato, estilos y variables de entorno.
10. Instala únicamente las dependencias necesarias para la fase.
11. Implementa la fase más pequeña que produzca valor; no construyas funcionalidades imaginadas.
12. Valida cada fase con los comandos reales del proyecto: lint, typecheck, tests y build.
13. Añade o actualiza el README (instalación, desarrollo, testing, build) y `.env.example`.
14. Documenta las decisiones técnicas relevantes y resume los siguientes pasos.

Cuando falte información no bloqueante, elige la opción técnicamente más simple, segura, accesible y mantenible. No cambies de stack ni añadas dependencias importantes sin justificarlo.

## Reglas de comunicación

- Responde en español salvo que el equipo pida otro idioma.
- Sé directo: interpreta el briefing en lenguaje natural, toma las decisiones técnicas razonables y pregunta únicamente por lo que bloquee una decisión relevante.
- No inventes requisitos, credenciales, nombres de tablas, endpoints, usuarios, integraciones, contenido ni branding.
- Si una decisión tiene impacto de coste, seguridad, datos o arquitectura, pide confirmación.
- Antes de editar, indica archivos, objetivo y posibles efectos.
- Después de editar, resume cambios y validaciones; incluye los fallos pendientes sin ocultarlos.

## Briefing

El contexto de negocio (empresa, problema, usuarios, alcance) te lo da el equipo en la conversación. No bloquees por detalles menores: haz una lista de preguntas y avanza solo con lo reversible y seguro. Bloquea si falta cualquiera de estos datos:

- Usuario y problema principal.
- Alcance de la primera entrega.
- Requisitos de autenticación, permisos o datos sensibles.
- Integraciones que condicionen la arquitectura.
- Criterio mínimo de aceptación.

## Stack y elección de framework

Selecciona el framework según el tipo de proyecto y explica brevemente la elección antes de implementar:

- **Astro**: sitios principalmente estáticos, corporativos, landing pages, blogs y proyectos orientados a SEO y rendimiento.
- **Next.js (App Router)**: aplicaciones React, productos SaaS, dashboards, autenticación, contenido dinámico, Server Components, Server Actions o APIs integradas. Es el estándar de Doscientos para CRM, backoffice y paneles con datos y usuarios.
- **Vite**: SPAs, herramientas internas, prototipos funcionales y aplicaciones cliente sin necesidades específicas de SSR o routing avanzado.

Usa siempre la versión estable más reciente compatible con el proyecto. No mezcles frameworks sin una justificación técnica clara. Si el repositorio ya tiene un framework instalado, respétalo salvo decisión explícita de reiniciar la arquitectura.

## Lenguaje y configuración base

- TypeScript en todo el proyecto, con `strict: true`; evita `any`.
- Gestor de paquetes: `pnpm`, salvo que el proyecto ya utilice otro. Node >= 22.
- Lint y formato: Biome en proyectos Next.js (convención actual de `backoffice`); oxlint + Prettier en proyectos Astro y Vite (convención actual de `landing`). No uses ESLint: prioriza herramientas modernas y rápidas (Biome u oxlint) sobre ESLint/Prettier tradicionales.
- Aliases de importación, preferiblemente `@/*`.
- Estructura de carpetas clara y escalable; evita archivos monolíticos y componentes excesivamente grandes.
- Mantén las dependencias actualizadas y elimina las innecesarias.

## Arquitectura

- Aplica los principios SOLID y prioriza composición sobre herencia.
- Separa responsabilidades de presentación, dominio, infraestructura y acceso a datos.
- Mantén los componentes pequeños, cohesivos y reutilizables; evita duplicación de lógica.
- Encapsula la lógica de negocio fuera de los componentes visuales.
- Define interfaces y tipos explícitos para los contratos entre capas.
- Evita el acoplamiento innecesario entre componentes, servicios y proveedores externos.
- Usa funciones puras siempre que sea posible.
- No introduzcas abstracciones prematuras; abstrae cuando exista una responsabilidad repetida o claramente independiente.

## UI y estilos

- Tailwind CSS v4 como solución principal de estilos.
- Define tokens de diseño mediante variables CSS: colores, tipografías, espaciado, radios y sombras.
- Evita estilos inline salvo que sean estrictamente necesarios, y valores arbitrarios repetidos en Tailwind.
- Crea componentes visuales reutilizables para patrones repetidos.
- Usa CSS normal o CSS Modules únicamente cuando Tailwind no sea adecuado.
- No utilices componentes visuales prefabricados si limitan la accesibilidad o la flexibilidad del diseño.

## Accesibilidad

- Cumple WCAG 2.2 AA siempre que sea posible.
- Usa HTML semántico antes que elementos genéricos.
- Asegura navegación completa mediante teclado.
- Gestiona correctamente focus, focus-visible, estados de carga, errores y elementos modales.
- Incluye labels, descripciones y mensajes de error accesibles.
- No dependas únicamente del color para comunicar estados. Respeta `prefers-reduced-motion`.
- Usa React Aria o React Aria Components para interacciones complejas y accesibles, y Base UI cuando se necesiten componentes headless, composables y accesibles compatibles con Tailwind (en Next.js, shadcn/ui sobre Radix/Base UI cubre la mayoría de casos).
- No construyas manualmente diálogos, menús, comboboxes, tooltips, tabs o popovers complejos si React Aria, Base UI o shadcn/ui resuelven correctamente el problema.
- No mezcles React Aria y Base UI para el mismo componente sin una razón técnica documentada.

## Iconos

- Usa `lucide-react` (o `@lucide/astro` en Astro) o Phosphor Icons; elige una única librería por proyecto salvo necesidad justificada.
- No uses emojis como iconos de interfaz.
- Los iconos decorativos deben ocultarse de los lectores de pantalla (`aria-hidden`).
- Los iconos interactivos deben tener nombre accesible o `aria-label`.
- No dependas exclusivamente de un icono para comunicar una acción importante.

## Datos, backend y Supabase

- Usa Supabase para autenticación, base de datos, almacenamiento y funcionalidades backend cuando el proyecto lo requiera. Tipos generados con `supabase gen types`.
- Separa los clientes de Supabase para navegador, servidor y middleware según el framework.
- Nunca expongas claves privadas ni secretos en el cliente.
- Activa Row Level Security en todas las tablas expuestas, con políticas explícitas y mínimas.
- Valida los datos en cliente y servidor con Zod (u otra librería equivalente) en todos los límites del sistema. Trata los datos externos como no confiables.
- Define modelos y contratos antes de conectar pantallas a datos reales. Para cada operación sensible, define quién puede ejecutarla y dónde se comprueba el permiso.
- Gestiona correctamente estados de carga, vacío, error, permisos y reintento.
- No accedas directamente a la base de datos desde componentes de presentación.
- Usa migraciones versionadas, reversibles cuando sea razonable, pequeñas y probadas. No mezcles entornos ni uses datos reales para pruebas sin autorización.
- No almacenes tokens sensibles en `localStorage`.

## Next.js (App Router)

- Prefiere Server Components por defecto. Usa Client Components únicamente cuando sean necesarios para interactividad, estado local, APIs del navegador o hooks; coloca `"use client"` en el límite más pequeño posible.
- Usa Server Actions o Route Handlers cuando sean apropiados.
- Define correctamente estrategias de caché, revalidación y renderizado.
- Usa `next/image`, `next/font` y `next/link` cuando corresponda.
- Implementa `loading` y `error` boundaries cuando mejoren la experiencia.
- No conviertas toda la aplicación en un Client Component sin una justificación clara.
- Componentes: shadcn/ui sobre Radix/Base UI. Formularios: `react-hook-form` + `@hookform/resolvers` con Zod. Estado cliente: `zustand` solo cuando el estado local no baste. Tablas: `@tanstack/react-table`. Email transaccional: Resend con `@react-email/components`. Logs: `pino`. IA, si aplica: SDK `ai` con `@ai-sdk/*`, salida validada con Zod.

## Astro

- Prefiere HTML estático y generación en build. Usa islands únicamente para interactividad real; minimiza el JavaScript enviado al navegador.
- Usa integraciones oficiales cuando sean necesarias.
- Optimiza metadatos, sitemap, canonical URLs, Open Graph y datos estructurados (`@astrojs/sitemap`, `@astrojs/rss`, `schema-dts`).
- Usa Content Collections y MDX para contenido.
- Usa componentes React solo cuando aporten interactividad o reutilización justificada.

## Vite

- Usa una arquitectura de SPA clara y modular.
- Usa React Router u otra solución de routing solo si el proyecto lo necesita.
- Gestiona el estado global únicamente cuando el estado local o derivado no sea suficiente; evita incluir librerías de estado global por defecto.
- Configura correctamente variables de entorno, builds y paths públicos, y verifica que assets y rutas funcionen en producción.

## Estado y formularios

- Prefiere estado local para UI local.
- Usa Zustand, TanStack Query u otra librería únicamente cuando exista una necesidad real; separa estado de servidor y estado de interfaz.
- Usa React Hook Form y validación con Zod para formularios complejos.
- Gestiona estados `idle`, `loading`, `success`, `error` y `empty`.
- No dupliques en el cliente datos que ya pertenecen al servidor.

## Hosting y despliegue

- Despliegue en Vercel y base de datos/almacenamiento en Supabase, salvo indicación contraria.
- Entornos separados (local, preview/staging, producción) con credenciales independientes. Nunca mezcles bases de datos ni claves entre entornos.

## Calidad, testing y rendimiento

- Escribe tests unitarios (Vitest) para lógica de negocio y utilidades, y tests de integración para flujos importantes.
- Usa Playwright o una herramienta equivalente para flujos end-to-end críticos.
- Comprueba accesibilidad básica y responsive en los componentes principales.
- Ejecuta lint, typecheck, tests y build antes de considerar terminado el trabajo. Corrige los errores reales; no desactives reglas para ocultarlos.
- No dejes código muerto, imports sin usar, logs de depuración ni TODOs innecesarios.
- Prioriza el rendimiento percibido y el tamaño reducido del bundle: evita JavaScript innecesario en el cliente, usa lazy loading, code splitting y carga diferida cuando proceda, y optimiza imágenes, fuentes, scripts y dependencias.
- Evita renders innecesarios y efectos con dependencias incorrectas. No optimices prematuramente sin evidencia, pero corrige problemas claros de rendimiento.

## Seguridad

- Nunca hardcodees secretos. Crea `.env.example` con nombres y descripciones, nunca con valores reales; verifica que secretos y archivos locales estén ignorados por Git.
- Valida y sanitiza entradas. Protege endpoints y mutaciones.
- Aplica permisos en servidor y base de datos, no solo en la interfaz.
- Evita XSS, CSRF, inyección SQL y exposición accidental de información sensible.
- Revisa dependencias con vulnerabilidades conocidas.
- No muestres errores internos, stack traces ni credenciales al usuario final.
- No añadas ni cambies dependencias externas, proveedores, planes o versiones sin autorización explícita; usa primero lo que ya existe en el proyecto.
- No ejecutes despliegues, migraciones destructivas ni acciones irreversibles sin confirmación.

## Scripts esperados

Todo proyecto nuevo debe exponer, como mínimo:

```json
{
  "dev": "...",
  "build": "...",
  "lint": "...",
  "typecheck": "...",
  "test": "..."
}
```

Usa estos comandos para validar cada fase.

## Definición de terminado

Una fase está terminada cuando:

- Cumple sus criterios de aceptación.
- El código está integrado en la estructura existente.
- Los tests relevantes pasan; lint, typecheck y build pasan o sus fallos están explicados.
- No quedan secretos, TODOs críticos ni supuestos ocultos.
- El README y `.env.example` reflejan cómo instalar, desarrollar, testear y construir el proyecto.
- Se indica claramente qué queda fuera de alcance.

## Primera respuesta esperada

Tras inspeccionar el repositorio, no empieces programando. Devuelve:

1. Resumen del problema y usuarios.
2. Alcance de la primera versión.
3. Estado del repositorio, stack a usar y cualquier desviación del stack por defecto.
4. Decisiones técnicas propuestas, supuestos relevantes y riesgos.
5. Preguntas bloqueantes, únicamente si existen.
6. Plan de fases con criterios de aceptación.
7. Comandos de validación previstos.

Solo después de recibir aprobación explícita debes implementar.