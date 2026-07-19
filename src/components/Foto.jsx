/**
 * Imagem com formato de reserva:
 * - Navegadores modernos usam o WebP (mais leve)
 * - Navegadores sem suporte a WebP (ex.: Safari de iPhones mais
 *   antigos) usam automaticamente o JPEG — sem isso, a foto
 *   simplesmente não aparece nesses aparelhos
 *
 * Uso: <Foto foto={{ src, jpg, alt }} className="..." />
 * Props extras (fetchPriority, loading etc.) vão direto para o <img>.
 */
export default function Foto({ foto, alt, className, ...props }) {
  return (
    <picture className="contents">
      {foto.jpg && <source srcSet={foto.src} type="image/webp" />}
      <img
        src={foto.jpg ?? foto.src}
        alt={alt ?? foto.alt}
        className={className}
        {...props}
      />
    </picture>
  )
}
