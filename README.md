# 🏠 Landing Page — Apartamento em Bananeiras-PB

Site de página única para venda de um apartamento, otimizado para conversão
via WhatsApp e pronto para campanhas de tráfego pago (Meta Ads / Google Ads).

**Stack:** React + Vite + Tailwind CSS · 100% estático (sem backend).

---

## ▶️ Como rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

## ✏️ Como editar os dados do imóvel

**Tudo** fica em um único arquivo: [`src/data/imovel.js`](src/data/imovel.js)

Lá você altera: título, endereço, preço, condomínio/IPTU, ficha técnica,
descrição, listas de características, pontos próximos, coordenadas do mapa,
dados do corretor, número/mensagem do WhatsApp e o FAQ (deixe `faq: []`
para esconder a seção).

## 🖼️ Como trocar as fotos

1. Coloque as fotos originais (PNG/JPG) na pasta `fotos-originais/`.
2. Rode:
   ```bash
   npm run fotos
   ```
   Isso converte tudo para WebP otimizado em `src/assets/fotos/` e gera a
   imagem de compartilhamento `public/og-image.jpg` (1200×630).
3. Ajuste os imports e a ordem no array `fotos` de `src/data/imovel.js`.

A foto do corretor (`corretor.png`) é convertida junto e usada na seção do
responsável — não na galeria.

## 📈 Rastreamento (Meta Pixel + GTM/GA4)

Abra [`src/lib/tracking.js`](src/lib/tracking.js) e preencha:

```js
export const PIXEL_ID = 'SEU_PIXEL_ID'   // Meta Pixel (Facebook/Instagram Ads)
export const GTM_ID   = 'GTM-XXXXXXX'    // Google Tag Manager
```

Com os IDs preenchidos, os scripts são carregados automaticamente e **todo
clique nos botões de WhatsApp dispara**:

- Meta Pixel → evento padrão **`Contact`** (use como evento de conversão da campanha);
- GTM/GA4 → evento **`whatsapp_click`** no `dataLayer` (crie no GTM uma tag GA4
  acionada por esse evento e marque-a como conversão).

Cada clique envia também a `origem` (`cartao-topo`, `cartao-lateral` ou
`flutuante`) para você saber qual botão converte mais.

## 🔍 SEO e compartilhamento (Open Graph)

As meta tags estão em [`index.html`](index.html). Após o deploy, **troque
`https://www.seudominio.com.br` pelo seu domínio real** nas tags `og:url`,
`og:image` e `twitter:image` (precisam ser URLs absolutas).

## 🚀 Deploy (Vercel ou Netlify)

O build gera arquivos estáticos na pasta `dist/`:

```bash
npm run build
```

**Vercel:** importe o repositório em [vercel.com](https://vercel.com) — ela
detecta Vite automaticamente (build `npm run build`, output `dist`). Depois
adicione seu domínio próprio em *Settings → Domains*.

**Netlify:** arraste a pasta `dist/` em [app.netlify.com/drop](https://app.netlify.com/drop)
ou conecte o repositório (build `npm run build`, publish `dist`).

## 📁 Estrutura

```
├── fotos-originais/        # fotos em alta (fonte)
├── public/                 # favicon e og-image.jpg
├── scripts/convert-images.mjs  # conversão PNG/JPG → WebP
└── src/
    ├── data/imovel.js      # ⭐ TODOS os dados do imóvel
    ├── lib/tracking.js     # ⭐ IDs do Pixel e GTM + evento de conversão
    ├── components/         # Galeria, Seções, Botões de WhatsApp, ícones
    ├── App.jsx             # ordem das seções da página
    └── index.css           # tema (cores/fontes) do Tailwind
```
