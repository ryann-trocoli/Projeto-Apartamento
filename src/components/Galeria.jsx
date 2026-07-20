import { useCallback, useRef, useState } from 'react'
import { imovel } from '../data/imovel.js'
import { IconChevron } from './icons.jsx'
import Foto from './Foto.jsx'
import Mapa from './Mapa.jsx'

/**
 * Galeria de fotos no topo do site, com:
 * - Abas "Fotos" / "Mapa"
 * - Carrossel deslizante com setas, contador e swipe (toque)
 * - Fila de miniaturas clicáveis
 *
 * Sem modo tela cheia: a sobreposição em tela cheia não renderizava
 * a foto em alguns navegadores (Safari do iPhone, Opera GX). O
 * carrossel na própria página funciona em todos.
 */
export default function Galeria() {
  const { fotos } = imovel
  const [aba, setAba] = useState('fotos')
  const [atual, setAtual] = useState(0)

  const anterior = useCallback(
    () => setAtual((i) => (i - 1 + fotos.length) % fotos.length),
    [fotos.length],
  )
  const proxima = useCallback(
    () => setAtual((i) => (i + 1) % fotos.length),
    [fotos.length],
  )

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
                    {/* Fundo desfocado preenche a tela; a foto fica
                        inteira por cima. Sem loading="lazy": em alguns
                        navegadores as fotos nunca chegavam a carregar. */}
                    <Foto
                      foto={foto}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                    />
                    <Foto
                      foto={foto}
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
                  <Foto foto={foto} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/** Seta de navegação do carrossel */
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
