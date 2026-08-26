---
name: lead-demo-generation
description: "Genera demos comerciales visuales desde un lead de Doscientos usando el MCP, sin filtrar datos del CRM y dejando una base técnica que pueda evolucionar a producto."
---

# Demo comercial escalable desde un lead

## Objetivo

Cuando el equipo pida “genera una demo para el lead X”, crea una demostración visual centrada en el problema confirmado, útil en la segunda llamada y reutilizable como primera fase del proyecto. No construyas una maqueta decorativa ni afirmes funcionalidades no evidenciadas.

Esta skill complementa `technical-details`. Una petición explícita de demo aprueba el alcance reversible de la demo descrito aquí; siguen requiriendo confirmación las integraciones reales, costes, datos sensibles y decisiones de arquitectura irreversibles.

## Flujo obligatorio

1. Resuelve el lead con `search_leads`. Si hay más de una coincidencia, pide que se elija una; nunca adivines.
2. Consulta `get_lead_demo_brief` con el ID. Empieza sin evidencia privada.
3. Lee `unknowns`, separa hechos, supuestos y preguntas. Si no hay problema, usuario o flujo principal confirmados, pregunta antes de construir.
4. Si una nota o transcripción es imprescindible, vuelve a consultar con `includePrivateContent: true`. Esa autorización sirve solo para fundamentar el trabajo interno: no copies datos personales, notas, cantidades ni transcripciones a la demo.
5. Localiza si ya existe un repositorio del cliente. Amplíalo si es la misma iniciativa; si no, crea `clients/<slug-cliente>/`.
6. Presenta un plan breve: recorrido de la demo, alcance excluido, stack, módulos y riesgos. Avanza sin esperar aprobación solo para una demo explícitamente solicitada; bloquea ante una integración real, dato sensible, coste o arquitectura irreversible.
7. Implementa y valida. Entrega una guía de demostración y una ruta concreta de promoción a producción.

## Qué debe demostrar

- Un flujo principal respaldado por el contexto comercial.
- Como máximo, un flujo de apoyo que haga visible el valor.
- Datos semilla sintéticos, coherentes y deterministas para contar la historia en menos de cinco interacciones por flujo.
- Estados reales de producto: vacío, carga, éxito, error o revisión cuando apliquen.

No uses un dashboard genérico, KPIs inventados, integraciones falsas presentadas como reales ni módulos que el lead no haya pedido.

## Arquitectura reutilizable

- Para un producto interactivo futuro, usa Next.js App Router, TypeScript estricto y módulos de dominio. Usa Astro solo para una demo/landing realmente estática.
- Usa `@doscientos/ui` como fuente por defecto de tokens, estilos y primitivos de interfaz. Importa sus estilos globales una sola vez, compón en la demo únicamente los componentes de dominio necesarios y no recrees ni modifiques localmente un primitivo que ya exista en el paquete.
- La demo debe arrancar sin servicios externos con `DEMO_MODE=true` y datos semilla locales.
- Define contratos de proveedor y adaptadores mock para cada integración futura. Los mocks no deben enviar emails, crear cobros ni modificar servicios externos.
- Separa dominio, UI, datos semilla y adaptadores. Nunca concentres toda la demo en una página o archivo.
- No diseñes una base de datos de producción sin requisitos validados. Si hacen falta datos persistentes, usa un modelo mínimo, migraciones y RLS, pero conserva el modo demo aislado.
- Añade una ruta `docs/demo-to-production.md` que indique qué se conserva, qué mock se sustituye y qué decisiones continúan pendientes.

## Protección de datos y marca

- No muestres email, teléfono, notas, presupuestos, transcripciones, facturas ni adjuntos del CRM.
- No copies documentos o logos del cliente sin autorización verificable. Si faltan activos, usa una identidad temporal neutra y marca el pendiente.
- No uses credenciales reales, producción, pagos, envíos ni integraciones irreversibles durante una demo.
- No infieras que una integración existe porque el lead la mencionó: muéstrala como simulada o exclúyela.

## Entregables mínimos

- `DEMO_BRIEF.md`: hechos confirmados, supuestos, preguntas y flujo de la llamada.
- `README.md`: arranque, modo demo, comandos de calidad y límites.
- `docs/demo-to-production.md`: plan de evolución sin reescritura.
- Datos semilla y adaptadores mock explícitos.
- Lint, typecheck, tests y build ejecutados según el proyecto.

## Criterio de calidad

La demo está terminada cuando puede enseñarse sin red ni credenciales, hace evidente el valor para ese lead, no filtra datos comerciales y permite conservar al menos el dominio, los componentes, los contratos y los tests al abrir el proyecto real.
