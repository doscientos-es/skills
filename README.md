# Doscientos AI Project Starter

Paquete para iniciar proyectos nuevos con Codex o Augment usando la forma de trabajar de Doscientos.

## Qué contiene

Solo las instrucciones técnicas: stack, convenciones, calidad mínima y proceso de trabajo. El briefing del cliente se lo das a la IA por chat, no en un archivo.

```text
AGENTS.md
README.md
VERSION
.agents/skills/doscientos-project-bootstrap/SKILL.md
```

## Crear un proyecto nuevo

**Recomendado:** en GitHub, abre `doscientos/ai-tech-skill` y usa **Use this template**. Crea el repositorio del cliente desde la plantilla y ábrelo con Codex o Augment.

Alternativa para añadir las instrucciones a un repositorio nuevo ya creado, en PowerShell:

```powershell
git clone --depth 1 --branch v2.1.1 https://github.com/doscientos/ai-tech-skill .starter
Copy-Item -Recurse -Force .starter\* .
Copy-Item -Recurse -Force .starter\.agents .
Remove-Item -Recurse -Force .starter
```

Este repositorio es privado: Git usará tus credenciales de GitHub. Alternativa manual: copia el contenido del paquete al repositorio, incluida la carpeta oculta `.agents/`.

Usa un tag concreto para que cada proyecto conserve una versión estable de las instrucciones:

```bash
git clone --depth 1 --branch v2.1.1 https://github.com/doscientos/ai-tech-skill .starter
```

## Uso

1. Instala el paquete en el repositorio nuevo.
2. Abre Codex o Augment en la raíz.
3. Describe el proyecto y pide que siga las instrucciones. Por ejemplo:

> Desarrolla una web para Acme: necesitan un CRM completo para gestionar sus contratos. Sigue las instrucciones técnicas de Doscientos (`.agents/skills/doscientos-project-bootstrap/SKILL.md`). Analiza el repositorio, señala las preguntas bloqueantes y propón un plan por fases. No escribas código todavía.

4. Revisa el plan y responde:

> Plan aprobado. Ejecuta la siguiente fase. Antes de cada cambio importante, explica qué vas a modificar y valida el resultado con los tests, lint y typecheck disponibles.

`AGENTS.md` ya apunta a la skill, así que Codex y Augment la cargan solos. Mencionar la ruta en el primer mensaje es simplemente una garantía extra.

## Si el repositorio está vacío

La IA debe aplicar el stack por defecto de la skill y preguntar solo por lo que no esté cubierto:

- Tipo de producto y usuarios.
- Restricciones técnicas impuestas por el cliente.
- Dominio y cuentas de hosting ya contratadas.
- Integraciones externas.
- Criterios de éxito y primera entrega.

## Actualizar las instrucciones

La fuente canónica debe vivir en un repositorio independiente. Copia una versión concreta al proyecto y conserva el número de versión en el historial Git. No uses una URL `main` como dependencia obligatoria de ejecución.

Recomendación de distribución:

- Repositorio: `doscientos/ai-tech-skill`.
- Releases: tags como `v2.1.1`.
- Instalación: plantilla de repositorio de GitHub, o `git clone` con tag en un repositorio ya creado.
- HTTP: opcional, como URL de descarga/documentación; no como fuente única.

## Alcance

Este paquete es solo para proyectos nuevos. No modifica ni activa reglas en los proyectos existentes de Doscientos.
