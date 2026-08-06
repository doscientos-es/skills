# Doscientos Technical Skill

Instrucciones técnicas reutilizables de Doscientos para Codex y Augment: elección de framework, arquitectura, accesibilidad, seguridad, Supabase, calidad y proceso de desarrollo.

No es una plantilla de proyecto y no incorpora código ni historial Git al repositorio de destino.

## Instalar en el proyecto actual

Desde la raíz del repositorio en el que vayas a trabajar:

```bash
pnpm dlx skills add PolGubau/doscientos-tech-skill --skill doscientos-project-bootstrap --agent augment,codex --copy --yes
```

El comando copia la skill en la ubicación reconocida por los agentes para ese proyecto. Solo debes ejecutarlo una vez por repositorio.

Para actualizarla más adelante:

```bash
pnpm dlx skills update doscientos-project-bootstrap --project --yes
```

## Uso con la IA

Después de instalarla, abre Codex o Augment en la raíz del proyecto y describe el lead con lenguaje normal. Por ejemplo:

> Desarrolla una web para Acme. Necesitan un CRM para gestionar contratos, clientes y renovaciones. Sigue la skill técnica de Doscientos. Analiza el repositorio y propón un plan por fases antes de escribir código.

La skill obliga al agente a elegir el stack adecuado, no inventar requisitos de negocio, preguntar solo por bloqueos reales y esperar la aprobación del plan antes de implementar.

## Estructura

```text
skills/
└── doscientos-project-bootstrap/
    └── SKILL.md
```

## Publicación

El repositorio público se publica como `PolGubau/doscientos-tech-skill`. Cuando la organización conceda permisos de creación, puede transferirse a `doscientos/doscientos-tech-skill` sin cambiar el contenido de la skill.
