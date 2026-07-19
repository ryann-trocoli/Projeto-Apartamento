/**
 * Imagem com formato de reserva (WebP ou JPEG) sem alterar o layout:
 * é um <img> comum — a escolha do formato acontece uma única vez,
 * por JavaScript, quando o site carrega.
 *
 * Por que não usar <picture>? O elemento extra em volta do <img>
 * quebrava o cálculo de altura/largura das fotos em alguns
 * navegadores (Safari do iPhone, Opera GX): fotos invisíveis ou
 * gigantes. Um <img> puro se comporta igual em todos.
 *
 * Uso: <Foto foto={{ src, jpg, alt }} className="..." />
 * Props extras (fetchPriority, loading etc.) vão direto para o <img>.
 */

// Detecta (uma única vez) se o navegador entende WebP: navegadores
// sem suporte devolvem "data:image/png..." neste teste. Em caso de
// dúvida, usa o JPEG — sempre funciona, só é um pouco mais pesado.
const suportaWebp =
  typeof document !== 'undefined' &&
  document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp')

export default function Foto({ foto, alt, className, ...props }) {
  return (
    <img
      src={suportaWebp ? foto.src : foto.jpg || foto.src}
      alt={alt !== undefined ? alt : foto.alt}
      className={className}
      {...props}
    />
  )
}
