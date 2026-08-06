---
name: brand-implementation
description: "Implementa de forma accesible y consistente una identidad visual aprobada por un cliente usando el contrato de tokens semánticos de Doscientos y Tailwind CSS v4. Usar en proyectos de cliente con marca propia."
---

# Implementación de marca para proyectos de cliente

## Objetivo

Convierte la identidad visual aprobada de un cliente en un sistema de tokens técnico, accesible y mantenible. Mantén el mismo contrato semántico y el mismo mapeo de Tailwind CSS v4 que utiliza Doscientos para que todos los proyectos resulten familiares de implementar y mantener.

Esta skill no proporciona colores, logos, fuentes ni contenido de marca. No uses la marca, logo ni tokens internos de Doscientos en un proyecto de cliente salvo autorización explícita.

## Información necesaria

Antes de fijar valores definitivos, localiza en el repositorio o solicita solo los elementos que falten:

- Logo y variantes aprobadas, con origen o archivos de uso permitido.
- Colores primario, accent, fondos, texto y estados semánticos.
- Tipografías, pesos, licencias y método de carga.
- Radios, espaciado u otras reglas de diseño ya aprobadas.
- Reglas de uso, tono visual, modo oscuro y restricciones de accesibilidad.

No inventes una identidad visual definitiva. Si falta marca, crea una base temporal neutra y accesible solo si el equipo lo autoriza, y documenta los valores pendientes.

## Contrato de tokens

Usa estos nombres en todos los proyectos, sustituyendo únicamente los valores por los aprobados para el cliente:

| Token | Finalidad |
| --- | --- |
| `--primary` / `--primary-foreground` | Acción y superficie principal, con texto contrastado. |
| `--accent` / `--accent-foreground` | Énfasis secundario y su texto contrastado. |
| `--background` / `--foreground` | Fondo y texto base. |
| `--destructive` | Error o acción destructiva. |
| `--success` | Éxito. |
| `--warning` | Advertencia. |
| `--info` | Información. |
| `--radius` | Radio base del sistema. |
| `--font-sans` | Fuente principal y fallbacks del cliente. |

Define estos valores en `:root` o en la capa de tokens existente. No introduzcas valores hexadecimales repetidos directamente en componentes cuando corresponda un token semántico.

## Tailwind CSS v4

Mantén este mapeo en el CSS global. Es idéntico para todos los clientes: solo cambian los valores de los tokens base.

```css
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

Usa las utilidades resultantes (`bg-primary`, `text-primary-foreground`, `rounded-lg`) en componentes, en lugar de recrear escalas locales.

## Tipografía, logos y assets

- Carga fuentes con el mecanismo nativo del framework cuando sea viable, por ejemplo `next/font` en Next.js.
- No dependas de fuentes remotas bloqueantes ni uses una fuente sin licencia o aprobación.
- Conserva proporción, contraste, zona de seguridad y legibilidad de los logos aprobados.
- No deformes, recolorees ni uses el logo como sustituto de un nombre accesible.
- Configura dominios de imágenes remotas o almacena assets según la arquitectura y autorización existentes.

## Accesibilidad y validación

- Comprueba contraste de texto, iconos, bordes de foco y estados interactivos con los valores finales.
- No comuniques error, éxito o advertencia solamente mediante color; añade texto, icono o ambos.
- Implementa estados hover, active, disabled, loading, error y focus-visible coherentes.
- Revisa la interfaz en móvil y escritorio, y respeta `prefers-reduced-motion`.
- Documenta en el README o sistema de diseño los tokens finales, la fuente y el origen de los assets.

## Primera respuesta esperada

Antes de aplicar la identidad visual, indica:

1. Qué activos y decisiones de marca están disponibles.
2. Qué tokens semánticos se definirán y qué información falta.
3. Riesgos de contraste, licencias de fuentes, logos o configuración de imágenes.

Implementa la identidad solo después de que los valores de marca estén aprobados o sean verificables en el repositorio.