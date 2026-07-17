/**
 * ============================================================
 * SEO — dados estruturados (JSON-LD) e otimização de carregamento
 * ============================================================
 * Tudo é gerado a partir de src/data/imovel.js — nada para editar aqui.
 */
import { imovel } from '../data/imovel.js'

/**
 * Injeta o preload da primeira foto da galeria (a imagem principal
 * da página). O navegador começa a baixá-la imediatamente, antes do
 * React montar a galeria — melhora o LCP, métrica que o Google Ads
 * usa na avaliação da página de destino.
 */
export function preloadFotoPrincipal() {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = imovel.fotos[0].src
  link.fetchPriority = 'high'
  document.head.appendChild(link)
}

/**
 * Injeta a marcação JSON-LD (schema.org) do anúncio imobiliário.
 * Ajuda o Google a entender a página: tipo de imóvel, preço,
 * endereço, coordenadas e características.
 * As URLs usam o domínio em que o site estiver publicado,
 * automaticamente — nada a ajustar após o deploy.
 */
export function injetarJsonLd() {
  const origem = window.location.origin
  const precoNumerico = Number(imovel.preco.replace(/\D/g, ''))

  const dados = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: imovel.titulo,
    description: imovel.descricao[0],
    url: window.location.href,
    image: imovel.fotos.map((f) => new URL(f.src, origem).href),
    offers: {
      '@type': 'Offer',
      price: precoNumerico,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Person',
        name: imovel.corretor.nome,
      },
    },
    about: {
      '@type': 'Apartment',
      name: imovel.titulo,
      numberOfRooms: 3,
      numberOfBathroomsTotal: 2,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: 111,
        unitCode: 'MTK', // metros quadrados
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Severino Pereira de Sousa, 120',
        addressLocality: 'Bananeiras',
        addressRegion: 'PB',
        postalCode: '58220-000',
        addressCountry: 'BR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: imovel.mapa.latitude,
        longitude: imovel.mapa.longitude,
      },
      amenityFeature: imovel.caracteristicasCondominio.map((c) => ({
        '@type': 'LocationFeatureSpecification',
        name: c,
        value: true,
      })),
    },
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(dados)
  document.head.appendChild(script)
}
