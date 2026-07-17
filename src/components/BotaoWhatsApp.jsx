import { linkWhatsApp } from '../data/imovel.js'
import { trackWhatsAppClick } from '../lib/tracking.js'
import { IconWhatsApp } from './icons.jsx'

/**
 * Botão principal de conversão. Abre o WhatsApp com mensagem
 * pré-preenchida e dispara o evento de conversão (Pixel + GA4).
 *
 * @param {string} origem  - identificador do local do clique (para análise)
 * @param {string} texto   - texto do botão
 * @param {string} className - classes extras (largura etc.)
 */
export default function BotaoWhatsApp({
  origem,
  texto = 'Enviar mensagem',
  className = '',
}) {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(origem)}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl bg-whats-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-whats-500/30 transition hover:bg-whats-600 hover:shadow-whats-600/30 active:scale-[0.98] ${className}`}
    >
      <IconWhatsApp className="h-5 w-5 shrink-0" aria-hidden="true" />
      {texto}
    </a>
  )
}

/**
 * Botão flutuante fixo no canto inferior direito — sempre visível
 * ao rolar, principalmente no mobile.
 */
export function BotaoWhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('flutuante')}
      aria-label="Enviar mensagem pelo WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whats-500 text-white shadow-xl shadow-whats-500/40 transition hover:scale-105 hover:bg-whats-600 sm:right-6 sm:bottom-6 sm:h-16 sm:w-16"
    >
      <IconWhatsApp className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      {/* Pulso sutil para chamar atenção sem incomodar */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whats-500 opacity-20 [animation-duration:2.5s]" />
    </a>
  )
}
