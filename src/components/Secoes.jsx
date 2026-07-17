import { imovel } from '../data/imovel.js'
import BotaoWhatsApp from './BotaoWhatsApp.jsx'
import Mapa from './Mapa.jsx'
import {
  IconAgua,
  IconAndar,
  IconArea,
  IconCama,
  IconCarro,
  IconCheck,
  IconChuveiro,
  IconPin,
  IconPredio,
  IconSuite,
  IconWhatsApp,
} from './icons.jsx'

/* Mapeia o nome do ícone usado em imovel.js para o componente SVG */
const ICONES_FICHA = {
  area: IconArea,
  quartos: IconCama,
  suite: IconSuite,
  banheiros: IconChuveiro,
  vagas: IconCarro,
  predio: IconPredio,
  andar: IconAndar,
  agua: IconAgua,
}

/** Título padrão das seções, com filete de destaque */
function TituloSecao({ children }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-[1.7rem]">
        {children}
      </h2>
      <span className="mt-2 block h-1 w-12 rounded-full bg-brand-600" aria-hidden="true" />
    </div>
  )
}

/* ============================================================
   BARRA SUPERIOR — marca do imóvel + contato rápido
   ============================================================ */
export function BarraSuperior() {
  return (
    <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-lg font-semibold tracking-tight text-brand-800 sm:text-xl">
            Residencial Mirante do Vale
          </span>
          <span className="hidden text-sm text-stone-500 sm:inline">
            Bananeiras · PB
          </span>
        </div>
        <a
          href="#preco"
          className="hidden shrink-0 rounded-full border border-brand-600 px-4 py-1.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white sm:inline-block"
        >
          {imovel.preco}
        </a>
      </div>
    </header>
  )
}

/* ============================================================
   3. PROPRIETÁRIO — foto redonda + nome + rótulo
   ============================================================ */
export function Corretor() {
  const { corretor } = imovel
  return (
    <div className="flex items-center gap-4">
      <span className="relative inline-block">
        <img
          src={corretor.foto}
          alt={`Foto de ${corretor.nome}`}
          className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-white sm:h-20 sm:w-20"
        />
        <span
          className="absolute right-0.5 bottom-0.5 block h-4 w-4 rounded-full border-2 border-white bg-whats-500"
          title="Disponível no WhatsApp"
        />
      </span>
      <div>
        <p className="text-lg leading-tight font-bold text-stone-900">{corretor.nome}</p>
        <p className="text-sm font-medium text-brand-700">{corretor.rotulo}</p>
        <p className="text-xs text-stone-500">{corretor.registro}</p>
      </div>
    </div>
  )
}

/* ============================================================
   CARTÃO DE PREÇO — fica ao lado do conteúdo no desktop
   (fixo ao rolar) e logo no início da página no mobile.
   ============================================================ */
export function CartaoPreco({ origem = 'cartao-preco' }) {
  return (
    <section
      aria-label="Preço e contato"
      id="preco"
      className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xl shadow-stone-900/8"
    >
      {/* Filete superior de destaque */}
      <div className="h-1.5 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-300" />

      <div className="p-6">
        <div className="text-center">
          <p className="text-sm font-medium tracking-wide text-stone-500">À venda por</p>
          <p className="font-display mt-1 text-[2.6rem] leading-none font-extrabold tracking-tighter text-stone-900">
            {imovel.preco}
          </p>
        </div>

        <BotaoWhatsApp origem={origem} className="mt-6 w-full" />

        <dl className="mt-6 divide-y divide-stone-100 border-t border-stone-200">
          {imovel.precoDetalhes.map((d) => (
            <div
              key={d.rotulo}
              className="flex items-baseline justify-between gap-3 py-2.5 text-sm"
            >
              <dt className="text-stone-500">{d.rotulo}</dt>
              <dd className="text-right font-semibold text-stone-800">{d.valor}</dd>
            </div>
          ))}
        </dl>

        {/* Reforço de confiança — negociação direta */}
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-brand-50 p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <IconWhatsApp className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-sm leading-snug text-brand-900">
            Negociação <strong>direta com o proprietário</strong>, sem
            intermediários — tire suas dúvidas em minutos.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   4. TÍTULO E ENDEREÇO — com selos de destaque
   ============================================================ */
export function TituloEndereco() {
  const selos = ['Apenas 4 unidades', 'Vista para o vale', 'Móveis projetados']
  return (
    <header>
      <div className="mb-4 flex flex-wrap gap-2">
        {selos.map((selo) => (
          <span
            key={selo}
            className="rounded-full bg-brand-100 px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-800"
          >
            {selo}
          </span>
        ))}
      </div>
      <h1 className="text-[1.7rem] leading-[1.18] font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-[2.5rem]">
        {imovel.titulo}
      </h1>
      <p className="mt-4 flex items-start gap-2 text-stone-600">
        <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
        {imovel.endereco}
      </p>
    </header>
  )
}

/* ============================================================
   5. FICHA TÉCNICA — grid de destaques com ícones
   ============================================================ */
export function FichaTecnica() {
  return (
    <section aria-label="Ficha técnica do imóvel">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {imovel.fichaTecnica.map((item) => {
          const Icone = ICONES_FICHA[item.icone] ?? IconCheck
          return (
            <div
              key={item.rotulo}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-stone-200/80 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                <Icone className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold text-stone-900">{item.valor}</span>
              <span className="text-xs font-medium tracking-wide text-stone-500">
                {item.rotulo}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ============================================================
   6. DESCRIÇÃO COMPLETA — primeiro parágrafo em destaque
   ============================================================ */
export function Descricao() {
  const [primeiro, ...resto] = imovel.descricao
  return (
    <section aria-label="Descrição do imóvel">
      <TituloSecao>Sobre o imóvel</TituloSecao>
      <p className="text-lg leading-relaxed font-medium text-stone-800 sm:text-xl">
        {primeiro}
      </p>
      <div className="mt-5 space-y-4 leading-relaxed text-stone-600">
        {resto.map((paragrafo, i) => (
          <p key={i}>{paragrafo}</p>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   7 e 8. LISTAS DE CARACTERÍSTICAS (imóvel e condomínio)
   ============================================================ */
export function ListaCaracteristicas({ titulo, itens }) {
  return (
    <section aria-label={titulo}>
      <TituloSecao>{titulo}</TituloSecao>
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-7">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {itens.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.95rem] text-stone-700">
              <span className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <IconCheck className="h-3.5 w-3.5" strokeWidth="2.4" aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================
   9. O QUE TEM PERTO — pontos próximos com distância/tempo
   ============================================================ */
export function Proximidades() {
  return (
    <section aria-label="O que tem perto">
      <TituloSecao>O que tem perto</TituloSecao>
      <ul className="divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        {imovel.pontosProximos.map((ponto) => (
          <li
            key={ponto.nome}
            className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-brand-50/60"
          >
            <span className="flex items-center gap-3 text-[0.95rem] text-stone-700">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-brand-700">
                <IconPin className="h-4 w-4" aria-hidden="true" />
              </span>
              {ponto.nome}
            </span>
            <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold whitespace-nowrap text-stone-600">
              {ponto.distancia}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ============================================================
   10. MAPA (seção de localização)
   ============================================================ */
export function SecaoMapa() {
  const { latitude, longitude } = imovel.mapa
  return (
    <section aria-label="Localização no mapa" id="mapa">
      <TituloSecao>Localização</TituloSecao>
      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        <div className="h-80 sm:h-96">
          <Mapa />
        </div>
        <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm text-stone-600">
            <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600" aria-hidden="true" />
            {imovel.endereco}
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-semibold text-brand-700 hover:underline"
          >
            Como chegar →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FAIXA FINAL DE CONVERSÃO — fecho da página
   ============================================================ */
export function ChamadaFinal() {
  return (
    <section
      aria-label="Fale com o proprietário"
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 px-6 py-10 text-center shadow-xl shadow-brand-900/20 sm:px-10 sm:py-12"
    >
      <h2 className="mx-auto max-w-md text-2xl leading-snug font-bold tracking-tight text-white sm:text-3xl">
        Gostou? Venha conhecer o apartamento pessoalmente.
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-brand-100">
        Fale direto com {imovel.corretor.nome.split(' ')[0]} e agende uma visita
        no melhor horário para você.
      </p>
      <BotaoWhatsApp
        origem="chamada-final"
        texto="Agendar uma visita"
        className="mt-6 w-full sm:w-auto"
      />
    </section>
  )
}

/* ============================================================
   12. FAQ — só aparece se houver perguntas em imovel.js
   ============================================================ */
export function Faq() {
  if (!imovel.faq.length) return null
  return (
    <section aria-label="Perguntas frequentes">
      <TituloSecao>Perguntas frequentes</TituloSecao>
      <div className="space-y-3">
        {imovel.faq.map((item) => (
          <details
            key={item.pergunta}
            className="group rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-stone-800 transition group-open:text-brand-700">
              {item.pergunta}
            </summary>
            <p className="px-5 pb-4 leading-relaxed text-stone-600">{item.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   13. RODAPÉ — escuro, com marca e dados do responsável
   ============================================================ */
export function Rodape() {
  const { corretor } = imovel
  return (
    <footer className="mt-14 bg-brand-950 pb-28 text-brand-100/80 sm:pb-10">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              Residencial Mirante do Vale
            </p>
            <p className="mt-1 text-sm">{imovel.endereco}</p>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={corretor.foto}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"
            />
            <div className="text-left text-sm">
              <p className="font-semibold text-white">{corretor.nome}</p>
              <p className="text-xs">
                {corretor.rotulo} · {corretor.registro}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-brand-100/50">
          © {new Date().getFullYear()} — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
