---
name: changelog
description: "Actualiza el changelog de un producto de forma incremental a partir de Git y PRs, y genera JSON listo para mostrar en su frontend."
---

# Novedades de producto

Cuando pidan «actualiza el changelog de X», identifica el repositorio Git exacto de X; no ejecutes Git desde el workspace padre ni mezcles clientes. Si hay más de un producto posible, pregunta. Usa el CLI `@doscientos/changelog` instalado en el repositorio (`pnpm exec changelog`); no mantengas una copia del generador en cada app. Mantén `CHANGELOG.md` y su JSON generado en el mismo commit/PR. No despliegues ni publiques sin pedirlo.

## Contrato

- `CHANGELOG.md` es la única fuente editorial y del cursor SHA. El JSON es un artefacto reproducible para Astro/Next/otras apps. Las vistas importan el JSON, no parsean Markdown en producción.
- Entrada `## AAAA-MM-DD — Título`; categorías `### Nuevas funciones`, `### Mejoras`, `### Correcciones`; cada novedad es `- Texto plano`. Solo aparecen cosas útiles para el usuario final. La fecha es la de actualización del changelog, no prueba un despliegue.
- No incluir información sensible, datos de clientes, roadmap, cambios aún no aprobados para ese público, detalles de seguridad explotables ni afirmaciones de que se ha desplegado sin evidencia de producción.
- El script no escribe entradas generadas por IA: valida y añade exclusivamente el borrador curado por el agente. El texto plano evita HTML inseguro y da libertad visual a cada aplicación.
- `add` usa un lock exclusivo temporal para no pisar otra actualización en curso. Si aparece un lock persistente, revisa qué proceso lo dejó antes de intervenir; no lo borres automáticamente.

## Primera adopción

1. Instala esta skill en la raíz del repositorio como las demás skills de Doscientos. Añade `@doscientos/changelog` como dependencia de desarrollo, configura el destino JSON y documenta `changelog:check` para CI.
2. Si no existe changelog, acuerda un SHA base verificado (`git rev-parse ...`) según el tramo histórico que se desee comunicar. No presupongas que todos los commits están desplegados. Ejecuta `pnpm exec changelog init <sha-completo>`; esta operación no genera entradas.
3. Sigue el flujo normal. Si el historial es demasiado extenso, segmenta por rangos/hitos comprobados; nunca avances el cursor sobre cambios que no revisaste.

## Cada actualización

1. Comprueba estado de Git y cambios locales; no toques modificaciones ajenas. Ejecuta `pnpm exec changelog plan`. Si no hay commits, termina sin reescribir nada.
2. Contrasta **todos** los commits del intervalo con sus PRs fusionados (GitHub MCP/CLI si está disponible), descripción y archivos relevantes. Si GitHub no está disponible, usa Git y di que no pudiste comprobar PRs; no inventes. Si son solo chores, documenta el caso y pide criterio antes de avanzar el cursor sin entrada. Si hay ambigüedad de publicación, pide confirmación antes de anunciar el cambio como publicado.
3. Agrupa por valor y redacta en español en un borrador JSON local: `{"sections":[{"title":"Mejoras","items":["Texto comprensible."]}]}`. No enumeres commits ni afirmes resultados que no se hayan verificado.
4. Ejecuta `pnpm exec changelog add <to-del-plan> <fecha-UTC> <título> <borrador.json>` y `pnpm changelog:sync`. Revisa el diff y ejecuta `pnpm changelog:check` y los checks del proyecto. Si HEAD cambió o el cursor ya no es ancestro, vuelve a planificar; nunca fuerces el marcador.
5. Informa del intervalo cubierto, limitaciones (PRs/despliegue), entrada añadida y rutas del Markdown/JSON. No comitees automáticamente.

El CLI usa Node.js y Git sin dependencias. `npm run release:check` prueba el contrato y que el paquete tarball solo contenga los archivos públicos esperados. Copia la skill al repositorio para que viaje versionada con él.
