import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const packageRoot = fileURLToPath(new URL('..', import.meta.url))

test('el tarball contiene solo los archivos públicos esperados y se instala sin dependencias', (t) => {
  const temp = mkdtempSync(join(tmpdir(), 'changelog-package-'))
  t.after(() => rmSync(temp, { recursive: true, force: true }))

  const packed = spawnSync('npm', ['pack', '--json', '--pack-destination', temp], {
    cwd: packageRoot,
    encoding: 'utf8',
  })
  assert.equal(packed.status, 0, packed.stderr)
  const [archive] = JSON.parse(packed.stdout)
  assert.match(archive.filename, /changelog-0\.1\.0\.tgz$/)
  assert.deepEqual(
    archive.files.map(({ path }) => path).sort(),
    ['LICENSE', 'README.md', 'SKILL.md', 'bin/changelog.mjs', 'package.json'].sort(),
  )
  assert.equal(archive.name, '@doscientos/changelog')
  assert.match(readFileSync(join(packageRoot, 'LICENSE'), 'utf8'), /Apache License/)

  const project = join(temp, 'project')
  mkdirSync(project)
  execFileSync('git', ['init', '-q'], { cwd: project })
  execFileSync('git', ['config', 'user.email', 'test@example.invalid'], { cwd: project })
  execFileSync('git', ['config', 'user.name', 'Test'], { cwd: project })
  writeFileSync(join(project, 'file.txt'), 'base')
  execFileSync('git', ['add', 'file.txt'], { cwd: project })
  execFileSync('git', ['commit', '-qm', 'base'], { cwd: project })

  const tarball = join(temp, archive.filename)
  const install = spawnSync('npm', ['install', '--offline', '--ignore-scripts', '--no-save', '--package-lock=false', tarball], {
    cwd: project,
    encoding: 'utf8',
  })
  assert.equal(install.status, 0, install.stderr)
  const cli = join(project, 'node_modules', '@doscientos', 'changelog', 'bin', 'changelog.mjs')
  const base = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: project, encoding: 'utf8' }).trim()
  const init = spawnSync(process.execPath, [cli, 'init', base], { cwd: project, encoding: 'utf8' })
  assert.equal(init.status, 0, init.stderr)
  const plan = spawnSync('npm', ['exec', '--offline', '--', 'changelog', 'plan'], {
    cwd: project,
    encoding: 'utf8',
  })
  assert.equal(plan.status, 0, plan.stderr)
  assert.deepEqual(JSON.parse(plan.stdout).commits, [])
})