/**
 * Converte as fotos originais (PNG/JPG) para WebP otimizado.
 *
 * Como usar:
 *   1. Coloque as fotos originais na pasta ./fotos-originais
 *   2. Rode: npm run fotos
 *
 * Saída:
 *   - src/assets/fotos/*.webp  (fotos otimizadas usadas pelo site)
 *   - public/og-image.jpg      (imagem de compartilhamento, 1200x630)
 */
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const ORIGEM = 'fotos-originais'
const DESTINO = 'src/assets/fotos'
const OG_SOURCE = 'image1.png' // foto usada no og-image (fachada)

await mkdir(DESTINO, { recursive: true })

const arquivos = (await readdir(ORIGEM)).filter((f) => /\.(png|jpe?g)$/i.test(f))

for (const arquivo of arquivos) {
  const nome = path.parse(arquivo).name
  const entrada = path.join(ORIGEM, arquivo)
  const saida = path.join(DESTINO, `${nome}.webp`)

  await sharp(entrada)
    .resize({ width: 1600, withoutEnlargement: true }) // nunca amplia além do original
    .webp({ quality: 82 })
    .toFile(saida)

  console.log(`✔ ${arquivo} → ${saida}`)
}

// Gera a imagem Open Graph (1200x630, formato exigido pelas redes sociais)
await sharp(path.join(ORIGEM, OG_SOURCE))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 85 })
  .toFile('public/og-image.jpg')

console.log('✔ og-image.jpg gerada em /public')
console.log('\nConversão concluída!')
