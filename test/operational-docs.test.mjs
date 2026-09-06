import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import test from 'node:test'

const repository = resolve(import.meta.dirname, '..')
const skill = join(repository, 'skills', 'operational-react-supabase')
const referenceNames = [
  'stack-decision.md',
  'delivery-pipeline.md',
  'implementation-patterns.md',
  'reusable-modules.md',
]

const read = (path) => readFile(path, 'utf8')

// These guides use inline Markdown links. Remote URLs and fragment-only links
// are intentionally not fetched; this test needs neither network nor credentials.
function localLinks(markdown) {
  return [...markdown.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)]
    .map((match) => match[1])
    .filter((href) => !/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(href))
    .map((href) => decodeURIComponent(href.split(/[?#]/)[0]))
}

function staysInside(root, target) {
  const path = relative(root, target)
  return !isAbsolute(path) && path !== '..' && !path.startsWith(`..${sep}`)
}

async function referenceFiles() {
  const entries = await readdir(join(skill, 'references'), { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(skill, 'references', entry.name))
}

test('operational skill exposes every canonical guide inside its copyable directory', async () => {
  const entrypoint = await read(join(skill, 'SKILL.md'))
  const links = localLinks(entrypoint)
  for (const name of referenceNames) {
    assert.ok(links.includes(`./references/${name}`), `SKILL.md must link ${name}`)
    await access(join(skill, 'references', name))
  }

  const files = [join(skill, 'SKILL.md'), ...(await referenceFiles())]
  for (const file of files) {
    for (const href of localLinks(await read(file))) {
      const target = resolve(dirname(file), href)
      assert.ok(staysInside(skill, target), `${relative(skill, file)} escapes skill: ${href}`)
      await access(target)
    }
  }
})

test('human docs and related skill entrypoints have existing repository-local links', async () => {
  const files = [
    'README.md',
    'docs/operational-react-supabase-standard.md',
    'docs/operational-stack-decision.md',
    'skills/operational-react-supabase/README.md',
    'skills/operational-react-supabase/starter/README.md',
    'skills/technical-details/SKILL.md',
    'skills/doscientos-ecosystem/SKILL.md',
    'skills/lead-demo-generation/SKILL.md',
  ]
  for (const file of files) {
    const path = join(repository, file)
    for (const href of localLinks(await read(path))) {
      const target = resolve(dirname(path), href)
      assert.ok(staysInside(repository, target), `${file} escapes repository: ${href}`)
      await access(target)
    }
  }
})

test('every lead-demo installation preset includes the operational guidance', async () => {
  const readme = await read(join(repository, 'README.md'))
  const presets = readme.split('\n').filter((line) =>
    line.includes('skills add') && line.includes('lead-demo-generation'),
  )
  assert.ok(presets.length > 0, 'expected a documented demo installation preset')
  for (const preset of presets) {
    const names = preset.match(/--skill ([^ ]+)/)?.[1].split(',') ?? []
    for (const name of ['technical-details', 'doscientos-ecosystem', 'operational-react-supabase']) {
      assert.ok(names.includes(name), `demo preset must include ${name}`)
    }
    assert.match(preset, /--copy(?:\s|$)/)
  }
})

test('legacy documentation points readers to the distributed canonical references', async () => {
  const pages = [
    'docs/operational-react-supabase-standard.md',
    'docs/operational-stack-decision.md',
  ]
  for (const page of pages) {
    const links = localLinks(await read(join(repository, page)))
    for (const name of referenceNames) {
      assert.ok(
        links.includes(`../skills/operational-react-supabase/references/${name}`),
        `${page} must point to the canonical ${name}`,
      )
    }
  }
})