# Doscientos Skills

Catálogo de skills reutilizables de Doscientos para Codex y Augment. `technical-details` define el proceso técnico, arquitectura, accesibilidad, seguridad, Supabase y calidad; `doscientos-ecosystem` decide qué módulos reutilizables evaluar en cada proyecto.

No es una plantilla de proyecto y no incorpora código ni historial Git al repositorio de destino.

## Modelo de distribución

Las skills se distribuyen **por repositorio**, no por ordenador:

1. La fuente canónica es este repositorio, `doscientos-es/skills`.
2. La persona que crea o adopta un proyecto instala el preset adecuado desde la
   **raíz de ese repositorio** con `--copy`.
3. Revisa y commitea los archivos que cree la CLI junto al proyecto.
4. Cualquier miembro, CI o equipo nuevo solo necesita clonar el repositorio:
   las instrucciones ya viajan versionadas con él.

No ejecutes estos comandos desde la carpeta personal, ni cada miembro debe
repetirlos tras clonar. Ejecuta **un único preset** por proyecto; todos incluyen
la base técnica y el catálogo de ecosistema.

## Instalar o adoptar un proyecto

Desde la raíz del repositorio en el que vayas a trabajar:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details,doscientos-ecosystem --agent augment,codex --copy --yes
```

El comando copia las skills en la ubicación reconocida por los agentes para ese
proyecto. Tras ejecutarlo, confirma los archivos creados con `git status`,
revísalos y añádelos al commit inicial o a un PR de adopción. No ignores ni
elimines ese directorio: forma parte de la configuración versionada del proyecto.

Para un proyecto de cliente con una identidad visual aprobada:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details,doscientos-ecosystem,brand-implementation --agent augment,codex --copy --yes
```

Para un CRM, portal autenticado, facturación o demo operativa con Supabase:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details,doscientos-ecosystem,operational-react-supabase --agent augment,codex --copy --yes
```

Si la decisión es SPA Vite/Router, genera primero el repositorio y después instala
el preset anterior dentro de él. La CLI actual no genera TanStack Start:

```bash
pnpm dlx @doscientos/create-operational-app mi-crm --title "CRM Acme"
```

La CLI crea el stack, `@doscientos/ui`, configuraciones compartidas y pruebas,
pero no instala dependencias salvo que se añada `--install`; nunca sobrescribe
un directorio no vacío. Revisa su salida, ejecuta los checks y confirma el
modelo, RLS e integraciones antes de conectar datos reales.

Para servidor integrado, seguir la [decisión Start/Node](./skills/operational-react-supabase/references/stack-decision.md):
es un piloto que necesita aprobación y validación, no un flag alternativo del generador.

Para ese mismo tipo de aplicación de cliente con una identidad visual aprobada:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details,doscientos-ecosystem,operational-react-supabase,brand-implementation --agent augment,codex --copy --yes
```

Para un producto, web o herramienta interna de Doscientos:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details,doscientos-ecosystem,doscientos-internal-brand --agent augment,codex --copy --yes
```

Para generar una demo comercial escalable desde el contexto de un lead del MCP:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details,doscientos-ecosystem,operational-react-supabase,lead-demo-generation --agent augment,codex --copy --yes
```

| Tipo de repositorio                               | Preset que se ejecuta                                       |
| ------------------------------------------------- | ----------------------------------------------------------- |
| Proyecto estándar                                 | Base técnica y ecosistema                                   |
| Proyecto de cliente con marca aprobada            | Añade `brand-implementation`                                |
| CRM, billing o portal Supabase                    | Añade `operational-react-supabase`                          |
| CRM, billing o portal Supabase con marca aprobada | Añade `operational-react-supabase` y `brand-implementation` |
| Producto, web o herramienta interna               | Añade `doscientos-internal-brand`                           |
| Demo comercial basada en un lead                  | Añade `operational-react-supabase` y `lead-demo-generation` |

Ejecuta el comando que corresponda al repositorio, incluido el preset compuesto
para una aplicación operativa de cliente. No combines una skill de marca interna
y una de cliente salvo una decisión explícita y documentada.

## Empezar una demo comercial en dos pasos

Desde la raíz de un repositorio nuevo o del repositorio de la iniciativa, instala
una sola vez el preset de demo:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details,doscientos-ecosystem,operational-react-supabase,lead-demo-generation --agent augment,codex --copy --yes
```

Revisa y commitea los archivos creados. Después, abre el agente en esa misma raíz
y pide: «Genera una demo para el lead <nombre o identificador> siguiendo las
skills de Doscientos». El agente resolverá el lead en el MCP, separará hechos y
supuestos, usará el catálogo para elegir solo los módulos necesarios y creará una
demo local con datos sintéticos, validaciones y una ruta de evolución a producto.

No debes decidir ni instalar UI, PWA, billing o VERI*FACTU antes de la petición:
la skill los evalúa según el problema confirmado. Consulta el
[`contrato detallado de la skill de demo`](./skills/lead-demo-generation/SKILL.md)
para sus límites de datos, alcance y entregables.

## Al clonar o cambiar de ordenador

Si las skills se commitearon al adoptar el repositorio, no hay nada que instalar:

1. Clona el repositorio y realiza su instalación habitual de dependencias.
2. Abre Augment o Codex desde la raíz del proyecto.
3. El agente leerá las skills y `AGENTS.md` que ya están en el árbol versionado.

Solo usa un comando de instalación si el repositorio todavía no contiene las
skills. En ese caso, usa el preset correspondiente, revisa el diff y crea un PR;
no lo trates como configuración local de una persona.

## Actualizar un proyecto de forma controlada

Actualiza cada skill ya instalada desde la raíz del proyecto:

```bash
pnpm dlx skills update technical-details --project --yes
```

Repite el comando sustituyendo el nombre por cada skill instalada, por ejemplo
`doscientos-ecosystem`. Revisa el diff y actualiza mediante un PR normal. Las
skills no se actualizan automáticamente al clonar o abrir un proyecto: así una
regla nueva nunca cambia el comportamiento de un repositorio sin revisión humana.

## Catálogo de módulos para humanos y agentes

La fuente de navegación única es
[`skills/doscientos-ecosystem/SKILL.md`](./skills/doscientos-ecosystem/SKILL.md).
Sirve a humanos y agentes: indica cuándo evaluar UI, configuración, PWA,
facturación, VERI*FACTU y acciones, y enlaza a la documentación canónica de cada
módulo. Los contratos y recetas permanecen junto al código del módulo para evitar
duplicación y divergencias.

## Manual técnico para proyectos operativos

Punto de entrada: [`operational-react-supabase`](./skills/operational-react-supabase/SKILL.md).
Sus referencias se distribuyen dentro de la propia skill, también al instalar con `--copy`:

- [Elegir stack](./skills/operational-react-supabase/references/stack-decision.md): Router frente a Start/Node, runtime y requisitos del piloto.
- [Pipeline de entrega](./skills/operational-react-supabase/references/delivery-pipeline.md): alcance → base → vertical → seguridad → integración → entrega, con evidencia por fase.
- [Patrones de implementación](./skills/operational-react-supabase/references/implementation-patterns.md): archivos, loaders/Query, server functions, auth/RLS, caché y errores.
- [Reutilizar módulos](./skills/operational-react-supabase/references/reusable-modules.md): UI/billing/fiscalidad, responsabilidades y pruebas de adaptadores.

`docs/` conserva enlaces para humanos, no otra versión de las reglas. No confundir
conocimiento documentado con un piloto implementado ni con una versión publicada.
Actualizar las copias de clientes requiere un PR de adopción; editar esta fuente no
las modifica automáticamente. En herramientas internas operativas, añadir también
`operational-react-supabase` al preset interno.

### Validar cambios en las guías

Desde este repositorio, sin nuevas dependencias ni servicios externos:

<augment_code_snippet mode="EXCERPT">
````bash
node --test test/operational-docs.test.mjs skills/operational-react-supabase/test/create-operational-app.test.mjs
````
</augment_code_snippet>

Verifica enlaces locales, cierre de referencias dentro de la skill, presets y regresiones
del generador. No certifica el build del proyecto generado ni ejecuta la CLI externa de skills.

## Uso con la IA

Después de clonar o instalar el preset, abre Codex o Augment en la raíz del
proyecto y describe el lead con lenguaje normal. Por ejemplo:

> Desarrolla una web para Acme. Necesitan un CRM para gestionar contratos, clientes y renovaciones. Sigue las skills técnica y de ecosistema de Doscientos. Analiza el repositorio y propón un plan por fases antes de escribir código.

Las skills obligan al agente a elegir el stack adecuado, no inventar requisitos de negocio y preguntar solo por bloqueos reales. `lead-demo-generation` permite avanzar con una demo solicitada explícitamente, pero mantiene confirmación humana para decisiones irreversibles.

## Estructura

```text
skills/
├── doscientos-ecosystem/
│   └── SKILL.md
├── technical-details/
│   └── SKILL.md
├── operational-react-supabase/
│   ├── SKILL.md
│   └── references/       # decisión, pipeline, implementación y reutilización
├── brand-implementation/
│   └── SKILL.md
├── doscientos-internal-brand/
│   └── SKILL.md
└── lead-demo-generation/
    └── SKILL.md
```

## Publicación

El repositorio público canónico es `doscientos-es/skills`. Añade cada nueva skill como una carpeta independiente dentro de `skills/`.
