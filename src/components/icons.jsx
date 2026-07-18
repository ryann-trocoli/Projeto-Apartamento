/**
 * Ícones SVG usados no site (sem dependências externas).
 * Todos herdam a cor do texto via `currentColor`.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
}

export function IconArea(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 3v3M16 3v3M3 8h3M3 16h3M21 8h-3M21 16h-3M8 21v-3M16 21v-3" />
    </svg>
  )
}

export function IconCama(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18h18M5 10V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4" />
      <path d="M7 10h4v0" />
    </svg>
  )
}

export function IconSuite(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18" />
      <path d="M12 5l1 2h2l-1.6 1.2.6 2-2-1.3-2 1.3.6-2L9 7h2z" strokeWidth="1.4" />
    </svg>
  )
}

export function IconChuveiro(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l2 2" />
      <path d="M6 6a6 6 0 0 1 8.5 8.5" />
      <path d="M9 9l6 6" />
      <path d="M14 17l-.5 2M17 14l2 .5M16 18l-1 2.5M18 16l2.5 1" />
    </svg>
  )
}

export function IconCarro(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <path d="M4 11h16a1 1 0 0 1 1 1v4h-2M3 16H2v-4a1 1 0 0 1 1-1" />
      <circle cx="7" cy="16.5" r="1.8" />
      <circle cx="17" cy="16.5" r="1.8" />
      <path d="M9 16.5h6" />
    </svg>
  )
}

export function IconPredio(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <path d="M10 7h1M13 7h1M10 11h1M13 11h1M10 15h1M13 15h1M10 21v-3h4v3" />
    </svg>
  )
}

export function IconAndar(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20h4v-4h4v-4h4V8h4" />
      <path d="M4 20V4" strokeDasharray="0" opacity="0" />
    </svg>
  )
}

export function IconAgua(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  )
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

export function IconChevron({ direcao = 'right', ...props }) {
  const d = direcao === 'left' ? 'M14.5 6L8.5 12l6 6' : 'M9.5 6l6 6-6 6'
  return (
    <svg {...base} {...props}>
      <path d={d} />
    </svg>
  )
}

export function IconFechar(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function IconExpandir(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
    </svg>
  )
}

export function IconPrivacidade(props) {
  // Olho "cortado" — privacidade
  return (
    <svg {...base} {...props}>
      <path d="M4 4l16 16" />
      <path d="M10.6 6.3A9.8 9.8 0 0 1 12 6.2c5 0 8.5 4.2 9.5 5.8-.4.6-1.2 1.7-2.4 2.8M6.7 6.9C4.5 8.3 3.1 10.4 2.5 12c1 1.6 4.5 5.8 9.5 5.8 1.2 0 2.3-.2 3.3-.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  )
}

export function IconEconomia(props) {
  // Cofrinho — economia
  return (
    <svg {...base} {...props}>
      <path d="M19 10h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H19l-1.5 2v2.5h-3V17h-3v1.5h-3V15c-1.9-1.1-3-2.9-3-5 0-3.3 2.9-6 6.5-6 3 0 5.6 1.9 6.3 4.5z" />
      <circle cx="15" cy="10.5" r="0.5" fill="currentColor" />
      <path d="M8.5 7.5c.8-.5 1.9-.8 3-.8" />
    </svg>
  )
}

export function IconPraticidade(props) {
  // Raio dentro de círculo — praticidade
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M13 7l-4 6h3l-1 4 4-6h-3z" />
    </svg>
  )
}

export function IconSeguranca(props) {
  // Escudo com check — segurança
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
      <path d="M9 12l2.2 2.2L15.5 9.7" />
    </svg>
  )
}

export function IconCenario(props) {
  // Montanhas com sol — cenário/vista
  return (
    <svg {...base} {...props}>
      <circle cx="17" cy="7" r="2.5" />
      <path d="M2 19l6-9 4.5 6.7L15 13l7 6z" />
    </svg>
  )
}

export function IconPanela(props) {
  // Panela — cozinha americana
  return (
    <svg {...base} {...props}>
      <path d="M5 10h14v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M3 10h18M9 6.5c0-1 .8-1.5 1.5-1.5h3c.7 0 1.5.5 1.5 1.5" />
      <path d="M2.5 12.5H5M19 12.5h2.5" opacity="0.9" />
    </svg>
  )
}

export function IconSofa(props) {
  // Sofá — sala ampla
  return (
    <svg {...base} {...props}>
      <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      <path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M5 18v1.5M19 18v1.5" />
    </svg>
  )
}

export function IconCortina(props) {
  // Janela com cortina — varanda
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4 7h16" />
      <path d="M7 7c0 4 .5 8-1.5 13M17 7c0 4-.5 8 1.5 13" opacity="0" />
      <path d="M8 7v13M12 7v13M16 7v13" strokeDasharray="0" opacity="0.55" />
    </svg>
  )
}

export function IconArmario(props) {
  // Guarda-roupa — móveis projetados
  return (
    <svg {...base} {...props}>
      <rect x="6" y="3" width="12" height="17" rx="1" />
      <path d="M12 3v17M10 11v2M14 11v2M8 20v1.5M16 20v1.5" />
    </svg>
  )
}

export function IconLavanderia(props) {
  // Máquina de lavar — área de serviço
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <circle cx="12" cy="13" r="4" />
      <path d="M9.5 12.2c1 .8 4 .8 5 0" opacity="0.8" />
      <path d="M8 6h1.5M11 6h2" />
    </svg>
  )
}

export function IconSol(props) {
  // Sol com brisa — ventilação e iluminação natural
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 3v1.5M10 15.5V17M3 10h1.5M15.5 10H17M5.2 5.2l1 1M13.8 13.8l1 1M14.8 5.2l-1 1M5.2 14.8l1-1" />
      <path d="M14 19.5h6M12 22h6" opacity="0.85" />
    </svg>
  )
}

export function IconPiscina(props) {
  // Ondas — piscina
  return (
    <svg {...base} {...props}>
      <path d="M2.5 15c1.6-1.6 3.2-1.6 4.8 0s3.2 1.6 4.8 0 3.2-1.6 4.8 0 3.1 1.6 4.6 0" />
      <path d="M2.5 19c1.6-1.6 3.2-1.6 4.8 0s3.2 1.6 4.8 0 3.2-1.6 4.8 0 3.1 1.6 4.6 0" />
      <path d="M8.5 12V6a2 2 0 0 1 4 0M15.5 12V6a2 2 0 0 1 4 0" opacity="0.9" />
    </svg>
  )
}

export function IconGourmet(props) {
  // Talheres sob cobertura — área gourmet
  return (
    <svg {...base} {...props}>
      <path d="M3 10l9-6 9 6" />
      <path d="M9 13v6M9 13c-1.2 0-2-.9-2-2v-1.5M9 13c1.2 0 2-.9 2-2v-1.5M9 9.5V13" />
      <path d="M15 9.5c-1 .5-1.5 1.5-1.5 2.8 0 1 .6 1.7 1.5 1.7v5M15 9.5V19" opacity="0.95" />
    </svg>
  )
}

export function IconChurrasqueira(props) {
  // Grelha com fumaça — churrasqueira
  return (
    <svg {...base} {...props}>
      <path d="M5 11h14a7 7 0 0 1-14 0z" />
      <path d="M8.5 18.5L7 21M15.5 18.5L17 21M12 18v3" opacity="0.9" />
      <path d="M9 8c0-1.2 1-1.4 1-2.5M13 8c0-1.2 1-1.4 1-2.5" opacity="0.7" />
    </svg>
  )
}

export function IconWhatsApp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.38a9.87 9.87 0 0 0 4.69 1.19h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  )
}
