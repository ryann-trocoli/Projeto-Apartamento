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
  const [atual, setAtual] = useState(0) // índice do QUADRO (não da foto)

  // Quadros do carrossel: o primeiro mostra as fotos 1 e 2 lado a
  // lado; os demais mostram uma foto por vez.
  const quadros = [[fotos[0], fotos[1]], ...fotos.slice(2).map((f) => [f])]

  /** Em qual quadro está a foto de índice `i`? (0 e 1 → quadro 0) */
  const quadroDaFoto = (i) => (i <= 1 ? 0 : i - 1)

  /** Rótulo do contador: "1-2 / 11" no quadro duplo, "3 / 11" nos demais */
  const rotuloContador =
    atual === 0 ? `1-2 / ${fotos.length}` : `${atual + 2} / ${fotos.length}`

  const anterior = useCallback(
    () => setAtual((i) => (i - 1 + quadros.length) % quadros.length),
    [quadros.length],
  )
  const proxima = useCallback(
    () => setAtual((i) => (i + 1) % quadros.length),
    [quadros.length],
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
                {quadros.map((grupo, i) =>
                  grupo.length === 2 ? (
                    /* Quadro duplo: fotos 1 e 2 lado a lado */
                    <div key={i} className="flex h-full w-full shrink-0 gap-1">
                      {grupo.map((foto) => (
                        <div key={foto.src} className="relative h-full w-1/2 overflow-hidden">
                          <Foto
                            foto={foto}
                            fetchPriority="high"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Quadro simples: uma foto com fundo desfocado.
                        Sem loading="lazy": em alguns navegadores as
                        fotos nunca chegavam a carregar. */
                    <div key={i} className="relative h-full w-full shrink-0">
                      <Foto
                        foto={grupo[0]}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                      />
                      <Foto
                        foto={grupo[0]}
                        className="relative z-10 mx-auto h-full object-contain"
                      />
                    </div>
                  ),
                )}
              </div>

              {/* Setas */}
              <BotaoSeta direcao="left" onClick={anterior} />
              <BotaoSeta direcao="right" onClick={proxima} />

              {/* Contador (ex: 1-2 / 11, 3 / 11) */}
              <span className="absolute bottom-3 left-3 z-20 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white backdrop-blur">
                {rotuloContador}
              </span>
            </div>

            {/* ---- Miniaturas ---- */}
            <div className="scrollbar-none mt-3 flex gap-2.5 overflow-x-auto pb-1.5">
              {fotos.map((foto, i) => (
                <button
                  key={i}
                  onClick={() => setAtual(quadroDaFoto(i))}
                  aria-label={`Foto ${i + 1}: ${foto.alt}`}
                  className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl shadow-sm transition duration-300 sm:h-20 sm:w-24 ${
                    quadroDaFoto(i) === atual
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
