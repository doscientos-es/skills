import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'
import { promisify } from 'node:util'

const runFile = promisify(execFile)
const packageDirectory = resolve(import.meta.dirname, '..')
const command = join(packageDirectory, 'bin', 'create-operational-app.mjs')

async function withTemporaryDirectory(run) {
  const directory = await mkdtemp(join(tmpdir(), 'create-operational-app-'))
  try {
    await run(directory)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
}

function runCli(argumentsList) {
  return runFile(process.execPath, [command, ...argumentsList])
}

test('creates a personalized operational project from the single starter template', async () => {
  await withTemporaryDirectory(async (directory) => {
    const target = join(directory, 'acme-crm')
    const result = await runCli([target, '--name', '@acme/crm', '--title', 'CRM Acme'])
    const packageJson = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'))
    const html = await readFile(join(target, 'index.html'), 'utf8')
    const appFrame = await readFile(join(target, 'src', 'app', 'app-frame.tsx'), 'utf8')

    assert.match(result.stdout, /Created @acme\/crm/)
    assert.equal(packageJson.name, '@acme/crm')
    assert.equal(packageJson.dependencies['@doscientos/ui'], '^0.1.31')
    assert.equal(packageJson.devDependencies['@doscientos/configs'], '^0.1.9')
    assert.equal(packageJson.scripts.test, 'vitest run')
    assert.match(html, /<title>CRM Acme<\/title>/)
    assert.match(appFrame, />CRM Acme</)
    assert.doesNotMatch(html, /__APP_TITLE__/)
    assert.doesNotMatch(appFrame, /__APP_TITLE__/)
    await readFile(join(target, '.env.example'), 'utf8')
    await readFile(join(target, '.gitignore'), 'utf8')
    await readFile(
      join(target, 'src', 'features', 'customers', 'application', 'customer-search.test.ts'),
      'utf8',
    )
  })
})

test('reports a dry run without creating the destination', async () => {
  await withTemporaryDirectory(async (directory) => {
    const target = join(directory, 'dry-run-crm')
    const result = await runCli([target, '--dry-run'])

    assert.match(result.stdout, /Dry run: would create/)
    await assert.rejects(readFile(join(target, 'package.json'), 'utf8'), { code: 'ENOENT' })
  })
})

test('refuses to overwrite a non-empty directory', async () => {
  await withTemporaryDirectory(async (directory) => {
    const target = join(directory, 'existing-crm')
    const existingFile = join(target, 'keep.txt')
    await mkdir(target)
    await writeFile(existingFile, 'do not overwrite', { encoding: 'utf8' })

    await assert.rejects(runCli([target]), /Destination directory must be empty/)
    assert.equal(await readFile(existingFile, 'utf8'), 'do not overwrite')
  })
})
