import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initTracking } from './lib/tracking.js'
import { injetarJsonLd, preloadFotoPrincipal } from './lib/seo.js'

// Começa a baixar a foto principal antes de a galeria montar (LCP)
preloadFotoPrincipal()

// Marcação schema.org do anúncio imobiliário (SEO)
injetarJsonLd()

// Injeta Meta Pixel / GTM (só carrega se os IDs estiverem preenchidos
// em src/lib/tracking.js)
initTracking()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
