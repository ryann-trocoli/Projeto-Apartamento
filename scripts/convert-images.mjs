/**
 * Converte as fotos originais (PNG/JPG) para WebP otimizado.
 *
 * Como usar:
 *   1. Coloque as fotos originais na pasta ./fotos-originais
 *   2. Rode: npm run fotos
 *
 * Saída:
 *   - src/assets/fotos/*.webp  (fotos otimizadas usadas pelo site)
 *   - src/assets/fotos/*.jpg   (reserva para navegadores sem WebP, ex.
 *                               Safari de iPhones mais antigos)
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

  // A foto do corretor vira um avatar pequeno — não precisa de alta resolução
  const largura = nome === 'corretor' ? 320 : 1600
  const base = sharp(entrada).resize({ width: largura, withoutEnlargement: true }) // nunca amplia além do original

  // WebP (formato principal, mais leve)
  await base.clone().webp({ quality: 82 }).toFile(path.join(DESTINO, `${nome}.webp`))

  // JPEG (reserva para navegadores sem suporte a WebP)
  await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(DESTINO, `${nome}.jpg`))

  console.log(`✔ ${arquivo} → ${nome}.webp + ${nome}.jpg`)
}

// Gera a imagem Open Graph (1200x630, formato exigido pelas redes sociais)
await sharp(path.join(ORIGEM, OG_SOURCE))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 85 })
  .toFile('public/og-image.jpg')

console.log('✔ og-image.jpg gerada em /public')
console.log('\nConversão concluída!')
