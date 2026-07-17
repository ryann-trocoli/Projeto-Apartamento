import { imovel } from '../data/imovel.js'

/**
 * Mapa do Google (iframe embed) centralizado nas coordenadas do imóvel.
 * Usado tanto na aba "Mapa" da galeria quanto na seção de localização.
 * `loading="lazy"` evita que o mapa atrase o carregamento da página.
 */
export default function Mapa({ titulo = 'Mapa da localização do imóvel' }) {
  const { latitude, longitude, zoom } = imovel.mapa
  const src = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`

  return (
    <iframe
      src={src}
      title={titulo}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full w-full border-0"
    />
  )
}
