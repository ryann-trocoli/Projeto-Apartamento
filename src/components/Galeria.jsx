import { useCallback, useEffect, useRef, useState } from 'react'
import { imovel } from '../data/imovel.js'
import { IconChevron, IconExpandir, IconFechar } from './icons.jsx'
import Mapa from './Mapa.jsx'

/**
 * Galeria de fotos no topo do site, com:
 * - Abas "Fotos" / "Mapa"
 * - Carrossel deslizante com setas, contador e swipe (toque)
 * - Fila de miniaturas clicáveis
 * - Botão "Ver todas as fotos" + modo tela cheia (lightbox)
 */
export default function Galeria() {
  const { fotos } = imovel
  const [aba, setAba] = useState('fotos')
  const [atual, setAtual] = useState(0)
  const [telaCheia, setTelaCheia] = useState(false)

  const anterior = useCallback(
    () => setAtual((i) => (i - 1 + fotos.length) % fotos.length),
    [fotos.length],
  )
  const proxima = useCallback(
    () => setAtual((i) => (i + 1) % fotos.length),
    [fotos.length],
  )

  // Navegação por teclado (setas e Esc) quando em tela cheia
  useEffect(() => {
    if (!telaCheia) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') anterior()
      if (e.key === 'ArrowRight') proxima()
      if (e.key === 'Escape') setTelaCheia(false)
    }
    window.addEventListener('keydown', onKey)
    // Trava o scroll da página enquanto o lightbox está aberto
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [telaCheia, anterior, proxima])

  // Swipe (arrastar com o dedo) no mobile
  const toqueX = useRef(null)
  const onTouchStart = (e) => (toqueX.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (toqueX.current === null) return
    const delta = e.changedTouches[0].clientX - toqueX.current
    if (Math.abs(delta) > 40) (delta > 0 ? anterior : proxima)()
    toqueX.current = null
  }

  return (
    <section aria-label="Galeria de fotos do apartamento">
      {/* ---- Abas Fotos / Mapa (pílulas centralizadas) ---- */}
      <div className="mx-auto flex max-w-5xl justify-center gap-2 px-4 py-4 sm:px-6">
        {[
          { id: 'fotos', rotulo: 'Fotos' },
          { id: 'mapa', rotulo: 'Mapa' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setAba(t.id)}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              aba === t.id
                ? 'bg-brand-700 text-white shadow-md shadow-brand-900/25'
                : 'border border-stone-300 bg-white text-stone-600 hover:border-brand-600 hover:text-brand-700'
            }`}
          >
            {t.rotulo}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {aba === 'mapa' ? (
          <div className="h-[55vh] max-h-[560px] min-h-[320px] overflow-hidden rounded-2xl shadow-lg shadow-stone-900/10">
            <Mapa titulo="Localização do imóvel (aba Mapa)" />
          </div>
        ) : (
          <>
            {/* ---- Carrossel principal ---- */}
            <div
              className="group relative h-[55vh] max-h-[560px] min-h-[320px] overflow-hidden rounded-2xl bg-stone-900 shadow-lg shadow-stone-900/15 select-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${atual * 100}%)` }}
              >
                {fotos.map((foto, i) => (
                  <div key={i} className="relative h-full w-full shrink-0">
                    {/* Fundo desfocado preenche a tela; a foto fica inteira por cima */}
                    <img
                      src={foto.src}
                      alt=""
                      aria-hidden="true"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                    />
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : 'auto'}
                      className="relative z-10 mx-auto h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Setas */}
              <BotaoSeta direcao="left" onClick={anterior} />
              <BotaoSeta direcao="right" onClick={proxima} />

              {/* Contador (ex: 3 / 11) */}
              <span className="absolute bottom-3 left-3 z-20 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                {atual + 1} / {fotos.length}
              </span>

              {/* Ver todas as fotos */}
              <button
                onClick={() => setTelaCheia(true)}
                className="absolute right-3 bottom-3 z-20 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-stone-800 shadow transition hover:bg-white"
              >
                <IconExpandir className="h-4 w-4" aria-hidden="true" />
                Ver todas as fotos
              </button>
            </div>

            {/* ---- Miniaturas ---- */}
            <div className="scrollbar-none mt-3 flex gap-2.5 overflow-x-auto pb-1.5">
              {fotos.map((foto, i) => (
                <button
                  key={i}
                  onClick={() => setAtual(i)}
                  aria-label={`Foto ${i + 1}: ${foto.alt}`}
                  className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl shadow-sm transition duration-300 sm:h-20 sm:w-24 ${
                    i === atual
                      ? 'scale-[1.03] ring-3 ring-brand-600'
                      : 'opacity-55 hover:scale-[1.03] hover:opacity-100'
                  }`}
                >
                  <img
                    src={foto.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ---- Lightbox em tela cheia ---- */}
      {telaCheia && (
        <div
          className="fixed inset-0 z-100 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Fotos em tela cheia"
        >
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm font-medium">
              {atual + 1} / {fotos.length} — {fotos[atual].alt}
            </span>
            <button
              onClick={() => setTelaCheia(false)}
              aria-label="Fechar tela cheia"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <IconFechar className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-2"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={fotos[atual].src}
              alt={fotos[atual].alt}
              className="max-h-full max-w-full object-contain"
            />
            <BotaoSeta direcao="left" onClick={anterior} />
            <BotaoSeta direcao="right" onClick={proxima} />
          </div>

          <div className="scrollbar-none flex justify-start gap-2 overflow-x-auto p-4 sm:justify-center">
            {fotos.map((foto, i) => (
              <button
                key={i}
                onClick={() => setAtual(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-14 w-18 shrink-0 overflow-hidden rounded-md transition ${
                  i === atual ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img src={foto.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

/** Seta de navegação do carrossel/lightbox */
function BotaoSeta({ direcao, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direcao === 'left' ? 'Foto anterior' : 'Próxima foto'}
      className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 ${
        direcao === 'left' ? 'left-3' : 'right-3'
      }`}
    >
      <IconChevron direcao={direcao} className="h-6 w-6" />
    </button>
  )
}
