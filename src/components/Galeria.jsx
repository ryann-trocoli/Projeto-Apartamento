import { useCallback, useEffect, useRef, useState } from 'react'
import { imovel } from '../data/imovel.js'
import { IconChevron, IconExpandir, IconFechar } from './icons.jsx'
import Foto from './Foto.jsx'
import Mapa from './Mapa.jsx'

/**
 * Galeria de fotos no topo do site:
 * - Abas "Fotos" / "Mapa"
 * - Mosaico: 1 foto principal grande + 4 menores (sem setas —
 *   a navegação foto a foto fica só na tela cheia)
 * - Botão "Ver todas as fotos (N)" e clique em qualquer foto
 *   abrem o modo tela cheia (lightbox) com setas, teclado e swipe
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

  /** Abre a tela cheia já na foto clicada */
  const abrirEm = (indice) => {
    setAtual(indice)
    setTelaCheia(true)
  }

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

  // Swipe (arrastar com o dedo) na tela cheia
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
          /* ---- Mosaico: 1 foto grande + 4 menores ----
              As linhas do grid têm ALTURA FIXA no celular (auto-rows):
              alturas em pixel funcionam em qualquer navegador, ao
              contrário de aspect-ratio/altura percentual, que falham
              no Safari do iPhone e deixam as fotos invisíveis. */
          <div className="relative">
            <div className="grid auto-rows-[110px] grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:h-[420px] sm:grid-cols-4 sm:grid-rows-2 lg:h-[480px]">
              {/* Foto principal (ocupa 2 colunas × 2 linhas) */}
              <button
                onClick={() => abrirEm(0)}
                aria-label={`Ampliar foto 1: ${fotos[0].alt}`}
                className="group relative col-span-2 row-span-2 overflow-hidden"
              >
                <Foto
                  foto={fotos[0]}
                  fetchPriority="high"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                {/* Contador no canto da foto principal */}
                <span className="absolute top-3 left-3 rounded-lg bg-black/65 px-2.5 py-1 text-sm font-semibold text-white backdrop-blur">
                  1 / {fotos.length}
                </span>
              </button>

              {/* 4 fotos menores (sem loading="lazy": ficam na primeira
                  dobra e o lazy atrasava/impedia o carregamento) */}
              {fotos.slice(1, 5).map((foto, i) => (
                <button
                  key={foto.src}
                  onClick={() => abrirEm(i + 1)}
                  aria-label={`Ampliar foto ${i + 2}: ${foto.alt}`}
                  className="group relative overflow-hidden"
                >
                  <Foto
                    foto={foto}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                  />
                </button>
              ))}
            </div>

            {/* Ver todas as fotos */}
            <button
              onClick={() => abrirEm(0)}
              className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-stone-800 shadow-lg transition hover:bg-white"
            >
              <IconExpandir className="h-4 w-4" aria-hidden="true" />
              Ver todas as fotos ({fotos.length})
            </button>
          </div>
        )}
      </div>

      {/* ---- Lightbox em tela cheia (única parte com setas) ---- */}
      {telaCheia && (
        /* ---- Tela cheia SEM coluna flex: cada camada é fixada
                direto na tela (position:fixed + unidades vh/vw).
                A coluna flex anterior (flex-1/min-h-0) tinha a altura
                calculada errada no Safari do iPhone e no Opera GX,
                empurrando a foto para fora da área visível. Camadas
                fixas na tela funcionam igual em todos os navegadores
                (o fundo escuro, que sempre foi fixo, nunca falhou). */
        <div role="dialog" aria-modal="true" aria-label="Fotos em tela cheia">
          {/* Fundo escuro — também recebe o gesto de arrastar (swipe) */}
          <div
            className="fixed inset-0 z-[100] bg-black/95"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />

          {/* Foto no centro da tela. A centralização usa transform
              (-50% do próprio tamanho) e o limite vem da tela do
              aparelho — nada depende de elemento pai. 12rem = espaço
              do cabeçalho + fila de miniaturas. */}
          <div className="pointer-events-none fixed top-[calc(50%-1rem)] left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2">
            <Foto
              foto={fotos[atual]}
              className="max-h-[calc(100vh-12rem)] max-w-[calc(100vw-1rem)] object-contain"
            />
          </div>

          {/* Cabeçalho: contador + botão fechar */}
          <div className="fixed top-0 right-0 left-0 z-[110] flex items-center justify-between p-4 text-white">
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

          {/* Setas de navegação */}
          <BotaoSeta direcao="left" onClick={anterior} />
          <BotaoSeta direcao="right" onClick={proxima} />

          {/* Fila de miniaturas, presa ao pé da tela */}
          <div className="scrollbar-none fixed right-0 bottom-0 left-0 z-[110] flex justify-start gap-2 overflow-x-auto p-4 sm:justify-center">
            {fotos.map((foto, i) => (
              <button
                key={i}
                onClick={() => setAtual(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-14 w-18 shrink-0 overflow-hidden rounded-md transition ${
                  i === atual ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {/* Sem loading="lazy": as miniaturas nunca chegavam a
                    carregar em alguns navegadores (mesmo bug já visto
                    no mosaico e na foto do corretor) */}
                <Foto foto={foto} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

/** Seta de navegação do lightbox (fixada direto na tela) */
function BotaoSeta({ direcao, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direcao === 'left' ? 'Foto anterior' : 'Próxima foto'}
      className={`fixed top-1/2 z-[110] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 ${
        direcao === 'left' ? 'left-3' : 'right-3'
      }`}
    >
      <IconChevron direcao={direcao} className="h-6 w-6" />
    </button>
  )
}
