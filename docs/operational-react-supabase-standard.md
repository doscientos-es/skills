# Estándar de aplicaciones operativas

La fuente canónica se mantiene dentro de la skill para que viaje al instalarla con
`--copy`. Esta página es un punto de navegación, no otra política de arquitectura.

## Orden de lectura

1. [Skill operativa](../skills/operational-react-supabase/SKILL.md): decisiones y límites obligatorios.
2. [Decisión de stack](../skills/operational-react-supabase/references/stack-decision.md): cuándo Router, Start/Node, Astro o conservar Next.
3. [Pipeline técnico](../skills/operational-react-supabase/references/delivery-pipeline.md): fases, criterios de salida y handoff.
4. [Implementación](../skills/operational-react-supabase/references/implementation-patterns.md): capas, rutas, Query, auth y servidor.
5. [Módulos reutilizables](../skills/operational-react-supabase/references/reusable-modules.md): UI, billing y contratos de integración.

El generador implementado sigue siendo Vite/Router. Start/Node es una recomendación
sujeta a piloto aprobado y comprobado. Ni una demo con shell ni los tests de copia
demuestran autenticación, RLS o un build de producción correcto.

Para instalación y actualización por repositorio, consultar el [README](../README.md).
