import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../../../LICENSE', import.meta.url))
const target = fileURLToPath(new URL('../LICENSE', import.meta.url))

if (!existsSync(source)) throw new Error('No se encuentra la licencia Apache del repositorio')
if (existsSync(target)) {
  if (readFileSync(source, 'utf8') !== readFileSync(target, 'utf8')) {
    throw new Error('La licencia del paquete no coincide con la licencia canónica')
  }
} else {
  copyFileSync(source, target)
}