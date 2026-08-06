# Doscientos Skills

Catálogo de skills reutilizables de Doscientos para Codex y Augment. La primera skill define el proceso técnico, arquitectura, accesibilidad, seguridad, Supabase y calidad de los proyectos.

No es una plantilla de proyecto y no incorpora código ni historial Git al repositorio de destino.

## Instalar en el proyecto actual

Desde la raíz del repositorio en el que vayas a trabajar:

```bash
pnpm dlx skills add doscientos-es/skills --skill technical-details --agent augment,codex --copy --yes
```

El comando copia la skill en la ubicación reconocida por los agentes para ese proyecto. Solo debes ejecutarlo una vez por repositorio.

Para actualizarla más adelante:

```bash
pnpm dlx skills update technical-details --project --yes
```

## Uso con la IA

Después de instalarla, abre Codex o Augment en la raíz del proyecto y describe el lead con lenguaje normal. Por ejemplo:

> Desarrolla una web para Acme. Necesitan un CRM para gestionar contratos, clientes y renovaciones. Sigue la skill técnica de Doscientos. Analiza el repositorio y propón un plan por fases antes de escribir código.

La skill obliga al agente a elegir el stack adecuado, no inventar requisitos de negocio, preguntar solo por bloqueos reales y esperar la aprobación del plan antes de implementar.

## Estructura

```text
skills/
└── technical-details/
    └── SKILL.md
```

## Publicación

El repositorio público canónico es `doscientos-es/skills`. Añade cada nueva skill como una carpeta independiente dentro de `skills/`.
