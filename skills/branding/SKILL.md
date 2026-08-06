---
name: branding
description: "Guía de marca de Doscientos: tokens de color, tipografía, radios, logo y aplicación con Tailwind CSS v4. Usar al crear o modificar la interfaz visual de un proyecto de Doscientos."
---

# Guía de marca de Doscientos

## Objetivo

Aplica estos tokens en los proyectos web de Doscientos para mantener una marca coherente, accesible y mantenible. Esta skill define la base visual; no inventes branding, paletas ni estilos alternativos sin aprobación.

Antes de modificar estilos, inspecciona el sistema de diseño y los tokens ya existentes. Si el proyecto pertenece a otra marca o ya tiene tokens aprobados que entran en conflicto, no los sustituyas sin confirmación explícita.

## Tokens de color

| Token | Valor | Uso |
| --- | --- | --- |
| `--primary` | `#2a4227` | Verde oscuro corporativo. Color principal de marca. |
| `--primary-foreground` | `#ffffff` | Texto blanco sobre `primary`. |
| `--accent` | `#bdff7b` | Lime de marca para badges, destacados y CTAs secundarios. |
| `--accent-foreground` | `#1a2e18` | Texto oscuro sobre `accent`. |
| `--background` | `#fafafa` | Fondo base de la aplicación. |
| `--foreground` | `#171717` | Texto principal. |
| `--destructive` | `#ef4444` | Estados de error o acciones destructivas. |
| `--success` | `#16a34a` | Estados de éxito. |
| `--warning` | `#ca8a04` | Estados de advertencia. |
| `--info` | `#2563eb` | Estados informativos. |

## Tipografía y radios

- Fuente sans: `Onest, ui-sans-serif, system-ui, sans-serif`.
- Radio base: `0.625rem`.
- En Next.js, carga Onest con `next/font` cuando sea viable; no dependas de una descarga remota bloqueante para el renderizado.
- No uses colores o radios arbitrarios repetidos cuando exista un token semántico adecuado.

## Logo y assets

- Logo oficial: `https://hnzyllbksqvamqfubhri.supabase.co/storage/v1/object/public/brand-assets/logo/3f8bbbcd-c9da-47df-ad20-f801d397610a/logo.png`
- Conserva la proporción, contraste, zona de seguridad y legibilidad del logo.
- No deformes, recolorees ni uses el logo como sustituto de texto accesible.
- Si se usa con `next/image`, configura el origen remoto permitido o descarga el asset aprobado al proyecto según la política existente.

## Aplicación en Tailwind CSS v4

Para un proyecto nuevo de Doscientos con Tailwind v4, incorpora estos tokens en el CSS global. Antes de pegarlos, integra los valores con los tokens actuales para evitar duplicados.

```css
:root {
  --primary: #2a4227;
  --primary-foreground: #ffffff;
  --accent: #bdff7b;
  --accent-foreground: #1a2e18;
  --background: #fafafa;
  --foreground: #171717;
  --destructive: #ef4444;
  --success: #16a34a;
  --warning: #ca8a04;
  --info: #2563eb;
  --radius: 0.625rem;
  --font-sans: Onest, ui-sans-serif, system-ui, sans-serif;
}

@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-info: var(--info);
  --radius: var(--radius);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
}
```

## Reglas de aplicación

- Usa tokens semánticos (`primary`, `accent`, `destructive`) en lugar de valores hexadecimales en componentes.
- No uses el lime `accent` para texto pequeño si el contraste no es suficiente; usa `accent-foreground` sobre el fondo `accent`.
- Mantén contraste, foco visible y estados hover, active, disabled y loading accesibles.
- No comuniques estados solo mediante color: acompáñalos de texto, icono o ambos.
- Respeta la preferencia de movimiento reducido y no introduzcas animaciones de marca innecesarias.
- Valida el resultado en vista móvil y escritorio, y comprueba los principales contrastes antes de considerar el trabajo terminado.

## Primera respuesta esperada

Cuando el encargo afecte a interfaz o diseño, indica brevemente:

1. Si la guía de marca aplica al proyecto o si existe un sistema aprobado que requiere confirmación.
2. Qué tokens, fuente y assets vas a incorporar o reutilizar.
3. Cualquier riesgo de contraste, carga de fuentes o configuración de imágenes remotas.

No cambies la identidad de marca, el logo o los tokens aprobados sin autorización explícita.