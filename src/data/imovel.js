/**
 * ============================================================
 * DADOS DO IMÓVEL — edite tudo por aqui!
 * ============================================================
 * Este é o ÚNICO arquivo que você precisa alterar para mudar
 * qualquer informação do site: preço, textos, listas, fotos,
 * corretor, WhatsApp etc.
 */

// ---- FOTOS DA GALERIA (a ordem aqui é a ordem no site) ----
// Para trocar as fotos: coloque as novas na pasta /fotos-originais,
// rode "npm run fotos" e ajuste os imports abaixo.
import fotoFachada from '../assets/fotos/image1.webp'
import fotoVaranda from '../assets/fotos/image3.webp'
import fotoVista from '../assets/fotos/image.webp'
import fotoQuartoPanoramico from '../assets/fotos/image7.webp'
import fotoCozinhaBancada from '../assets/fotos/image5.webp'
import fotoSalaIntegrada from '../assets/fotos/image2.webp'
import fotoQuartoArmarios from '../assets/fotos/image10.webp'
import fotoAmbienteVidro from '../assets/fotos/image4.webp'
import fotoBanheiro from '../assets/fotos/image8.webp'
import fotoCorredor from '../assets/fotos/image9.webp'
import fotoSalaAngulo from '../assets/fotos/image6.webp'
import fotoCorretor from '../assets/fotos/corretor.webp'

export const imovel = {
  // ---- IDENTIFICAÇÃO ----
  titulo:
    'Apartamento Exclusivo com Vista Definitiva para o Vale e a Cidade de Bananeiras',
  endereco: 'Rua Severino Pereira de Sousa, 120 - Bananeiras - PB, CEP 58220-000',
  cidade: 'Bananeiras',

  // ---- GALERIA (ordem de exibição) ----
  fotos: [
    { src: fotoFachada, alt: 'Fachada do edifício com apenas 4 apartamentos' },
    { src: fotoVaranda, alt: 'Varanda com cortina europeia e vista para o vale' },
    { src: fotoVista, alt: 'Vista definitiva para a cidade de Bananeiras e o vale' },
    { src: fotoQuartoPanoramico, alt: 'Quarto com janela panorâmica e vista para o vale' },
    { src: fotoCozinhaBancada, alt: 'Cozinha americana com bancada e móveis projetados' },
    { src: fotoSalaIntegrada, alt: 'Sala ampla integrada à cozinha americana' },
    { src: fotoQuartoArmarios, alt: 'Quarto com armários projetados' },
    { src: fotoAmbienteVidro, alt: 'Ambiente amplo com porta de vidro' },
    { src: fotoBanheiro, alt: 'Banheiro com box de vidro e móveis projetados' },
    { src: fotoCorredor, alt: 'Corredor de acesso aos quartos' },
    { src: fotoSalaAngulo, alt: 'Sala integrada — outro ângulo' },
  ],

  // ---- VALORES ----
  preco: 'R$ 499.000',
  precoDetalhes: [
    { rotulo: 'Condomínio', valor: 'R$ 250/mês' },
    { rotulo: 'IPTU', valor: 'R$ 41,67/mês (R$ 500/ano)' },
    { rotulo: 'Valor por m²', valor: 'R$ 4.495,50/m²' },
  ],

  // ---- FICHA TÉCNICA (ícones: veja src/components/icons.jsx) ----
  fichaTecnica: [
    { icone: 'area', rotulo: 'Área privativa', valor: '111 m²' },
    { icone: 'quartos', rotulo: 'Quartos', valor: '3' },
    { icone: 'banheiros', rotulo: 'Banheiros', valor: '2' },
    { icone: 'vagas', rotulo: 'Vaga de garagem', valor: '1' },
  ],

  // ---- DESCRIÇÃO COMPLETA (cada item vira um parágrafo) ----
  descricao: [
    'Apartamento Residencial Mirante do Vale exclusivo em Bananeiras-PB, localizado em um edifício com apenas quatro unidades, oferecendo privacidade, tranquilidade e uma vista definitiva para a cidade e para o vale. São 111 m² de área privativa distribuídos em varanda, sala ampla integrada à cozinha americana, três quartos (sendo uma suíte), banheiro social, área de serviço e uma vaga de garagem.',
    'O imóvel já conta com móveis projetados na cozinha, quartos e banheiros, além de varanda equipada com cortina europeia, proporcionando conforto, praticidade e excelente aproveitamento dos espaços.',
    'A área de lazer oferece piscina, espaço coberto com churrasqueira e banheiro de apoio, ideal para reunir familiares e amigos. Outro grande diferencial é o reservatório de água de 10.000 litros do edifício, garantindo maior segurança no abastecimento em uma região onde a falta d\'água pode ocorrer com frequência.',
    'Localizado em uma área tranquila e de fácil acesso, este apartamento é uma excelente opção tanto para moradia quanto para investimento em uma das cidades mais valorizadas do Brejo Paraibano.',
  ],

  // ---- O QUE TEM NESTE IMÓVEL ----
  caracteristicasImovel: [
    '111 m² privativos',
    '3 quartos',
    '1 suíte',
    'Banheiro social',
    'Sala ampla',
    'Cozinha americana',
    'Área de serviço',
    'Varanda',
    'Vista definitiva',
    'Móveis projetados na cozinha',
    'Móveis projetados nos quartos',
    'Móveis projetados nos banheiros',
    'Cortina europeia na varanda',
    'Excelente ventilação',
    'Excelente iluminação natural',
    '1 vaga de garagem',
  ],

  // ---- O QUE TEM NO CONDOMÍNIO ----
  caracteristicasCondominio: [
    'Apenas 4 apartamentos',
    '1 apartamento por andar',
    'Piscina',
    'Área gourmet coberta',
    'Churrasqueira',
    'Banheiro de apoio',
    "Caixa d'água de 10.000 litros",
    'Baixo custo de condomínio (R$ 250/mês)',
  ],

  // ---- O QUE TEM PERTO ----
  pontosProximos: [
    { nome: 'Centro de Bananeiras', distancia: '≈ 3 min de carro' },
    { nome: 'Igreja Matriz de Nossa Senhora do Livramento', distancia: '≈ 4 min' },
    { nome: 'Restaurantes e cafés do centro', distancia: '≈ 3 a 5 min' },
    { nome: 'Supermercados', distancia: '≈ 4 min' },
    { nome: 'Farmácias', distancia: '≈ 4 min' },
    { nome: 'Bancos e comércio local', distancia: '≈ 4 min' },
    { nome: 'Acesso à rodovia para Solânea', distancia: '≈ 1 min' },
  ],

  // ---- MAPA ----
  mapa: {
    latitude: -6.7580229,
    longitude: -35.6443329,
    zoom: 16,
  },

  // ---- CORRETOR / PROPRIETÁRIO ----
  corretor: {
    nome: 'Rômulo Carvalho',
    rotulo: 'Corretor do imóvel',
    registro: 'CRECI-PB 10429',
    foto: fotoCorretor,
  },

  // ---- WHATSAPP ----
  whatsapp: {
    // Somente números, com DDI 55 + DDD + número
    numero: '5583988420045',
    mensagem:
      'Olá! Tenho interesse no apartamento em Bananeiras. Poderia me passar mais informações?',
  },

  // ---- FAQ (opcional) ----
  // Deixe o array vazio [] para esconder a seção.
  // Para ativar, adicione itens no formato:
  // { pergunta: 'Aceita financiamento?', resposta: 'Sim, ...' },
  faq: [],
}

/** Monta o link do WhatsApp com a mensagem pré-preenchida */
export function linkWhatsApp() {
  return `https://wa.me/${imovel.whatsapp.numero}?text=${encodeURIComponent(imovel.whatsapp.mensagem)}`
}
