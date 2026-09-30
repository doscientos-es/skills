# @doscientos/changelog

CLI sin dependencias para llevar un changelog incremental desde Git y exportarlo
a JSON para Astro, Next.js u otra aplicación. Incluye la skill `changelog`
para usar el flujo con Augment o Codex.

## Requisitos

- Node.js 20 o posterior.
- Git y un repositorio con al menos un commit.
- El changelog y el JSON generado se versionan junto con el proyecto.

## Instalar

Cuando el paquete esté publicado:

```bash
npm install --save-dev @doscientos/changelog
```

O úsalo directamente sin añadirlo al manifiesto:

```bash
npx --yes @doscientos/changelog plan
```

Instala además la skill desde el repositorio de skills, en la raíz del proyecto:

```bash
pnpm dlx skills add doscientos-es/skills --skill product-changelog --agent augment,codex --copy --yes
```

El paquete contiene el CLI y `SKILL.md`; la instalación por `skills` copia las
instrucciones del agente al proyecto para que viajen versionadas con el código.
El identificador de la skill en este repositorio conserva temporalmente el slug
de su carpeta fuente.

## Primera adopción

Elige explícitamente el commit más antiguo que quieras cubrir. Ese SHA debe ser
ancestro de `HEAD`; `init` solo crea el marcador, no redacta entradas:

```bash
git rev-parse <commit-base>
npx changelog init <sha-completo>
```

Configura el destino JSON que importará tu frontend y añade scripts al
`package.json` de la aplicación. Sustituye `src/data/changelog.json` si usas otra
ruta:

```json
{
  "scripts": {
    "changelog:sync": "changelog sync src/data/changelog.json",
    "changelog:check": "changelog sync src/data/changelog.json --check"
  }
}
```

Ejecuta `changelog:sync` una vez para generar el JSON y `changelog:check` en CI.
El frontend importa ese JSON; no necesita analizar Markdown en producción.

## Actualizar

1. Inspecciona el estado del repositorio y ejecuta `npx changelog plan`.
2. Revisa los commits incluidos y sus PRs si tienes acceso. Git no demuestra que
   un cambio haya llegado a producción.
3. Redacta y revisa un borrador `draft.json` con este formato:

```json
{
  "sections": [
    { "title": "Mejoras", "items": ["Descripción útil para quien usa el producto."] }
  ]
}
```

4. Añade la entrada y actualiza el artefacto:

```bash
npx changelog add <sha-de-plan> <AAAA-MM-DD> "Título" draft.json
npx changelog sync src/data/changelog.json
npx changelog sync src/data/changelog.json --check
```

`add` solo acepta el `HEAD` actual, exige commits pendientes y usa un lock
exclusivo. Si un lock queda tras una interrupción, comprueba el proceso antes de
retirarlo. El equipo debe revisar el diff y no afirmar despliegues sin evidencia.

## Contrato y privacidad

`CHANGELOG.md` es la fuente editorial y guarda el cursor Git. El JSON solo
proyecta las entradas para la aplicación. Las categorías admitidas son `Nuevas
funciones`, `Mejoras` y `Correcciones`; usa texto plano, sin enlaces ni HTML.
No incluyas datos de clientes, información sensible, roadmap ni cambios no
aprobados para el público del changelog.

## Desarrollo y publicación

Desde esta carpeta, ejecuta `npm run release:check` antes de empaquetar. La
comprobación prueba el CLI y el contenido del paquete generado. Para una
publicación manual, tras revisar el nombre en npm, la versión y el repositorio:

```bash
npm publish --access public
```

La publicación requiere permisos npm para el ámbito `@doscientos`; no se ejecuta
automáticamente desde este repositorio.