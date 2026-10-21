/* Gera as páginas de estudo de caso em /projetos a partir da lista abaixo.
   Uso: node scripts/gerar-projetos.js
   Também injeta os ícones (scripts/icones.svg) no index.html.
   Para adicionar um projeto: coloque as imagens em assets/img/projetos (<id>-capa.webp,
   <id>-pagina.webp e <id>-celular.webp) e acrescente um item nesta lista. */
const fs = require('fs');
const path = require('path');

const projetos = [
  {
    slug: 'meta-modular', img: 'meta', nome: ['META', 'Modular'],
    segmento: 'Construção modular', local: 'Santa Catarina', tipo: 'Site institucional', ano: '2026',
    servicos: 'Design, desenvolvimento e SEO',
    lead: 'Site institucional para uma construtora de casas modulares de alto padrão no litoral catarinense — feito para ganhar a confiança de quem compra à distância.',
    desafio: [
      'Os clientes da META decidem de longe, muitas vezes de outro estado, e o investimento é alto. Antes do primeiro contato, o site precisava passar solidez técnica e sofisticação.',
      'Ao mesmo tempo, não podia parecer mais uma construtora genérica: o método modular é o grande diferencial e tinha que ficar claro em poucos segundos.',
    ],
    solucao: [
      'Uma página escura e elegante, com tipografia clássica e detalhes em dourado metálico — as cores do próprio logotipo. Cada seção responde a uma dúvida de quem está avaliando: como funciona, quanto tempo leva, o que está incluído.',
      'O caminho para o contato fica sempre à mão: botão de WhatsApp fixo e formulário que já abre a conversa com a mensagem pronta.',
    ],
    entregas: ['Direção de arte a partir da marca', 'Seções de método, diferenciais e soluções', 'Galeria de projetos', 'Formulário integrado ao WhatsApp', 'SEO para as cidades atendidas'],
    cores: [['#0f141d', 'Grafite'], ['#c5a880', 'Dourado'], ['#dfc8a5', 'Champanhe'], ['#faf8f5', 'Off-white']],
    fonte: { nome: 'Cinzel', google: 'Cinzel:wght@400;600', apoio: 'Plus Jakarta Sans' },
  },
  {
    slug: 'reveste-premium', img: 'reveste', nome: ['Reveste', 'Premium'],
    segmento: 'Pedras naturais', local: 'Brasília · DF', tipo: 'Site institucional', ano: '2026',
    servicos: 'Design, desenvolvimento e textos',
    lead: 'Site para uma marca de pedras naturais de alto padrão em Brasília, onde o material é o protagonista e o texto tem ritmo de revista.',
    desafio: [
      'Pedra natural é um produto que se escolhe com os olhos e com as mãos. O desafio era traduzir textura, peso e exclusividade para uma tela.',
      'O público — arquitetos e clientes finais de alto padrão — precisava ver curadoria, não catálogo.',
    ],
    solucao: [
      'Um layout claro, de tons de areia, com uma serifa editorial em itálico para os momentos de destaque e muito respiro entre os blocos. As texturas das pedras aparecem como obras, não como produtos de prateleira.',
      'A navegação conduz do conceito ("a pedra certa muda o caráter do espaço") à curadoria por tipo de material, até o pedido de orçamento.',
    ],
    entregas: ['Conceito e tom de voz', 'Curadoria por tipo de pedra', 'Seção de obras', 'Processo do projeto à instalação', 'Pedido de orçamento simplificado'],
    cores: [['#1d1a16', 'Nanquim'], ['#4a443b', 'Basalto'], ['#e8e1d4', 'Travertino'], ['#f1ece3', 'Areia']],
    fonte: { nome: 'Cormorant Garamond', google: 'Cormorant+Garamond:ital,wght@0,400;1,400', apoio: 'Hanken Grotesk' },
  },
  {
    slug: 'fabiana-pacheco', img: 'fabiana', nome: ['Fabiana', 'Pacheco'],
    segmento: 'Consultoria imobiliária e jurídica', local: 'Brasília · DF', tipo: 'Site institucional', ano: '2026',
    servicos: 'Design e desenvolvimento',
    lead: 'Presença digital para uma consultora imobiliária e advogada que atende os bairros mais disputados de Brasília.',
    desafio: [
      'Fabiana une duas profissões que raramente andam juntas: corretagem de alto padrão e advocacia imobiliária. O site precisava explicar essa vantagem sem soar técnico demais.',
      'Também era importante mostrar os imóveis e as regiões em que ela atua, para quem chega pelo Google procurando o próximo endereço.',
    ],
    solucao: [
      'Uma identidade sóbria, com serifa elegante e detalhes em caramelo dourado. A primeira dobra apresenta a profissional e a promessa — "mais que imóveis, realizamos projetos de vida".',
      'As oportunidades e as regiões (Noroeste, Park Sul, Sudoeste, Asa Sul) ganharam seções próprias, e o agendamento de visita fica a um toque de distância.',
    ],
    entregas: ['Posicionamento da marca pessoal', 'Vitrine de oportunidades', 'Seção por bairro de atuação', 'Apresentação da equipe', 'Agendamento de visita'],
    cores: [['#121619', 'Noite'], ['#b69668', 'Caramelo'], ['#f3efe8', 'Linho'], ['#ffffff', 'Branco']],
    fonte: { nome: 'Cormorant Garamond', google: 'Cormorant+Garamond:wght@500;600', apoio: 'Plus Jakarta Sans' },
  },
  {
    slug: 'voltz', img: 'voltz', nome: ['Voltz'],
    segmento: 'Serviços elétricos', local: 'São Paulo · SP', tipo: 'Landing page', ano: '2026',
    servicos: 'Design, desenvolvimento e textos',
    lead: 'Landing page para uma empresa de instalação e manutenção elétrica — direta, forte e feita para gerar pedido de orçamento.',
    desafio: [
      'No setor de serviços, quem procura um eletricista quer resolver rápido e com segurança. O site tinha poucos segundos para provar competência e passar confiança.',
      'Era preciso fugir do visual amador comum na área, sem perder a linguagem direta que o cliente entende.',
    ],
    solucao: [
      'Contraste alto entre preto e amarelo — as cores de sinalização de segurança —, tipografia condensada e fotos reais de quadros montados pela equipe.',
      'A página segue a lógica do atendimento: o que a Voltz faz, serviços entregues, por que contratar e como funciona do contato ao quadro ligado. Tudo termina em um botão de WhatsApp.',
    ],
    entregas: ['Identidade visual aplicada', 'Textos de venda', 'Galeria de serviços entregues', 'Passo a passo do atendimento', 'Pedido de orçamento pelo WhatsApp'],
    cores: [['#0c0c0b', 'Preto'], ['#141109', 'Carvão'], ['#f5c518', 'Amarelo volt'], ['#f1efe9', 'Gelo']],
    fonte: { nome: 'Barlow Condensed', google: 'Barlow+Condensed:wght@700;800', apoio: 'Barlow' },
  },
  {
    slug: 'dra-amanda-carvalho', img: 'amanda', nome: ['Dra. Amanda', 'Carvalho'],
    segmento: 'Odontologia estética', local: 'Brasília · DF', tipo: 'Landing page', ano: '2026',
    servicos: 'Design, desenvolvimento e textos',
    lead: 'Landing page para uma cirurgiã-dentista especializada em estética do sorriso, pensada para quem compara profissionais pelo celular.',
    desafio: [
      'Quem procura clareamento, lentes ou facetas compara várias profissionais antes de decidir. A página tinha que transmitir confiança e cuidado logo de cara.',
      'O público chega pelo Google e pelo Instagram, quase sempre no celular — a experiência móvel era prioridade.',
    ],
    solucao: [
      'Tons de nude e vinho, serifa delicada com itálico e muito espaço em branco: a página fala baixo, com calma, como a própria consulta. A foto da doutora aparece logo na primeira dobra.',
      'Tratamentos, primeira consulta passo a passo, apresentação da profissional e depoimentos levam naturalmente ao agendamento da avaliação.',
    ],
    entregas: ['Direção de arte', 'Textos com tom acolhedor', 'Seção de tratamentos', 'Jornada da primeira consulta', 'Agendamento pelo WhatsApp'],
    cores: [['#2b1d1c', 'Cacau'], ['#5a2332', 'Vinho'], ['#ead8ce', 'Nude'], ['#f7efe9', 'Pérola']],
    fonte: { nome: 'Cormorant Garamond', google: 'Cormorant+Garamond:ital,wght@0,500;1,500', apoio: 'Jost' },
  },
  {
    slug: 'kza-vivaz', img: 'kza', nome: ['KZA', 'Vivaz'],
    segmento: 'Imóvel à venda', local: 'São Paulo · SP', tipo: 'Landing page', ano: '2026',
    servicos: 'Design e desenvolvimento',
    lead: 'Landing page de venda de um apartamento reformado — uma página só, um imóvel só, todos os argumentos no lugar certo.',
    desafio: [
      'Vender um único imóvel pela internet exige mostrar o que as fotos dos portais não mostram: a reforma, os acabamentos e a vista.',
      'O comprador precisa sentir o espaço e ter todas as informações (metragem, vaga, planta) sem precisar ligar para perguntar.',
    ],
    solucao: [
      'Azul profundo com dourado e uma serifa de impacto no título — "seu novo começo com vista". As fotos dos ambientes ganham espaço de destaque e a planta aparece desenhada.',
      'Os números do imóvel ficam sempre à vista, e o agendamento de visita acompanha o visitante do início ao fim.',
    ],
    entregas: ['Página de venda única', 'Galeria de ambientes', 'Destaques de acabamento', 'Planta e ficha técnica', 'Agendamento de visita'],
    cores: [['#10283f', 'Azul profundo'], ['#c39a58', 'Dourado'], ['#a9793e', 'Bronze'], ['#f5efe6', 'Creme']],
    fonte: { nome: 'Playfair Display', google: 'Playfair+Display:wght@500;600', apoio: 'DM Sans' },
  },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nomeTexto = (p) => p.nome.join(' ');
const ICONES = fs.readFileSync(path.join(__dirname, 'icones.svg'), 'utf8');
const WA = '5500000000000'; // mesmo número do index.html (body data-whatsapp)

const page = (p, i) => {
  const next = projetos[(i + 1) % projetos.length];
  const num = String(i + 1).padStart(2, '0');
  const total = String(projetos.length).padStart(2, '0');
  const titulo = `${nomeTexto(p)} — Estudo de caso | Wscodev`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(p.lead)}">
  <meta name="theme-color" content="#ececec">
  <link rel="canonical" href="https://wscodev.com.br/projetos/${p.slug}.html">
  <link rel="icon" href="../assets/img/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Wscodev">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(p.lead)}">
  <meta property="og:image" content="https://wscodev.com.br/assets/img/projetos/${p.img}-capa.webp">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500&family=Manrope:wght@400;500;600;700&family=${p.fonte.google}&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/style.css?v=6">
  <script>(function(r){r.classList.add('js');try{if(sessionStorage.getItem('ws-curtain'))r.classList.add('from-nav')}catch(e){}})(document.documentElement)</script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": ${JSON.stringify(nomeTexto(p))},
    "description": ${JSON.stringify(p.lead)},
    "genre": ${JSON.stringify(p.tipo)},
    "dateCreated": "${p.ano}",
    "image": "https://wscodev.com.br/assets/img/projetos/${p.img}-capa.webp",
    "creator": { "@type": "Organization", "name": "Wscodev", "url": "https://wscodev.com.br/" }
  }
  </script>
</head>
<body data-whatsapp="${WA}">
${ICONES}
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <div class="curtain" aria-hidden="true"><span></span></div>

  <header class="site-header" data-tone="light">
    <a class="logo" href="../index.html" aria-label="Wscodev, página inicial">
      <img class="logo__dark" src="../assets/img/logo-wscodev-dark.webp" alt="Wscodev" width="642" height="133">
      <img class="logo__light" src="../assets/img/logo-wscodev.webp" alt="" width="642" height="133">
    </a>
    <nav class="main-nav" aria-label="Navegação principal">
      <ul>
        <li><a href="../index.html#servicos">Serviços</a></li>
        <li><a href="../index.html#projetos" aria-current="true">Projetos</a></li>
        <li><a href="../index.html#processo">Como funciona</a></li>
        <li><a href="../index.html#sobre">Sobre</a></li>
        <li><a href="../index.html#contato">Contato</a></li>
      </ul>
    </nav>
    <a class="pill-btn" href="https://wa.me/${WA}" data-wa="Olá! Vi o projeto ${esc(nomeTexto(p))} no site da Wscodev e quero um site assim." target="_blank" rel="noopener">
      <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"/></svg><span>Fale comigo</span>
    </a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu"><span></span><span></span></button>
  </header>

  <div class="menu" id="menu" hidden>
    <nav aria-label="Menu">
      <ul>
        <li><a href="../index.html#servicos">Serviços</a></li>
        <li><a href="../index.html#projetos">Projetos</a></li>
        <li><a href="../index.html#processo">Como funciona</a></li>
        <li><a href="../index.html#sobre">Sobre</a></li>
        <li><a href="../index.html#contato">Contato</a></li>
      </ul>
    </nav>
    <a class="btn btn--light" href="https://wa.me/${WA}" data-wa="Olá! Vim pelo site da Wscodev e quero conversar sobre um site." target="_blank" rel="noopener">
      <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"/></svg> Chamar no WhatsApp
    </a>
  </div>

  <main id="conteudo">
    <article>
      <header class="cs-hero" data-tone="light">
        <div class="wrap">
          <a class="cs-back" href="../index.html#projetos"><svg class="ico" aria-hidden="true"><use href="#i-right"/></svg>Todos os projetos</a>
          <h1 class="cs-title">${p.nome.map((l) => `<span class="ln"><span class="ln__in">${esc(l)}</span></span>`).join('')}</h1>
          <p class="cs-lead">${esc(p.lead)}</p>
          <dl class="cs-meta">
            <div><dt>Segmento</dt><dd>${esc(p.segmento)}</dd></div>
            <div><dt>Local</dt><dd>${esc(p.local)}</dd></div>
            <div><dt>Entrega</dt><dd>${esc(p.tipo)}</dd></div>
            <div><dt>Ano</dt><dd>${esc(p.ano)}</dd></div>
            <div><dt>Estudo de caso</dt><dd>${num} de ${total}</dd></div>
          </dl>
        </div>
      </header>

      <figure class="cs-cover" data-tone="light">
        <div class="wrap">
          <div class="browser">
            <div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(p.slug)}</span></div>
            <div class="browser__view"><img src="../assets/img/projetos/${p.img}-capa.webp" alt="Primeira tela do site ${esc(nomeTexto(p))}" width="1440" height="900"></div>
          </div>
        </div>
      </figure>

      <div class="cs-body" data-tone="dark">
        <div class="wrap">
          <section class="cs-block" aria-labelledby="desafio-${p.slug}">
            <h2 id="desafio-${p.slug}">O desafio</h2>
            <div class="cs-text">${p.desafio.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
          </section>

          <section class="cs-block" aria-labelledby="solucao-${p.slug}">
            <h2 id="solucao-${p.slug}">A solução</h2>
            <div class="cs-text">
              ${p.solucao.map((t) => `<p>${esc(t)}</p>`).join('\n              ')}
              <ol class="cs-list" aria-label="O que foi entregue">
                ${p.entregas.map((e, n) => `<li><span>${String(n + 1).padStart(2, '0')}</span>${esc(e)}</li>`).join('\n                ')}
              </ol>
            </div>
          </section>

          <section class="cs-block" aria-labelledby="sistema-${p.slug}">
            <h2 id="sistema-${p.slug}">Sistema visual</h2>
            <div class="cs-system">
              <ul class="swatches" aria-label="Paleta de cores">
                ${p.cores.map(([hex, nome]) => {
                  const light = parseInt(hex.slice(1, 3), 16) * 0.3 + parseInt(hex.slice(3, 5), 16) * 0.59 + parseInt(hex.slice(5, 7), 16) * 0.11 > 150;
                  return `<li class="swatch" style="background:${hex};color:${light ? '#16181d' : '#f1f2f6'}"><b>${esc(nome)}</b>${hex}</li>`;
                }).join('\n                ')}
              </ul>
              <div class="type-specimen">
                <b style="font-family:'${p.fonte.nome}', serif">Aa</b>
                <span>Títulos: ${esc(p.fonte.nome)}</span>
                <span>Textos: ${esc(p.fonte.apoio)}</span>
              </div>
            </div>
          </section>

          <section class="cs-scroll" aria-labelledby="pagina-${p.slug}">
            <div class="cs-scroll__pin">
              <div class="cs-scroll__head">
                <h2 id="pagina-${p.slug}">A página inteira</h2>
                <p>Continue rolando: a tela fica parada e o site passa por dentro dela, do topo ao rodapé.</p>
                <div class="cs-switch" role="group" aria-label="Ver o site no">
                  <button type="button" data-device="desktop" aria-pressed="false"><svg class="ico" aria-hidden="true"><use href="#i-desktop"/></svg>Computador</button>
                  <button type="button" data-device="phone" aria-pressed="true"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>Celular</button>
                </div>
              </div>
              <div class="cs-scroll__stage" data-view="phone">
                <div class="browser cs-scroll__desktop">
                  <div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(p.slug)}</span><b class="cs-scroll__pct">0%</b></div>
                  <div class="browser__view" data-autoscroll tabindex="0" aria-label="Página completa no computador"><img src="../assets/img/projetos/${p.img}-pagina.webp" alt="Página completa do site ${esc(nomeTexto(p))} no computador" width="1200"></div>
                </div>
                <div class="cs-scroll__phone">
                  <div class="phone" data-autoscroll tabindex="0" aria-label="Página completa no celular"><img src="../assets/img/projetos/${p.img}-celular.webp" alt="Site ${esc(nomeTexto(p))} no celular" width="780"></div>
                </div>
              </div>
              <div class="cs-scroll__progress" aria-hidden="true"><span></span></div>
            </div>
          </section>

          <a class="cs-next" href="${next.slug}.html">
            <span class="cs-next__label">Próximo projeto</span>
            <span class="cs-next__row"><span class="cs-next__title">${esc(nomeTexto(next))}</span><span class="cs-next__arrow" aria-hidden="true"><svg class="ico"><use href="#i-arrow"/></svg></span></span>
            <span class="cs-next__peek" aria-hidden="true"><img src="../assets/img/projetos/${next.img}-capa.webp" alt="" width="1440" height="900" loading="lazy"></span>
          </a>
        </div>
      </div>
    </article>
  </main>

  <footer class="site-footer" data-tone="dark">
    <div class="wrap">
      <div class="footer__top">
        <div class="footer__brand">
          <a class="logo" href="../index.html" aria-label="Wscodev, página inicial"><img src="../assets/img/logo-wscodev.webp" alt="Wscodev" width="642" height="133"></a>
          <p>Sites sob medida para negócios locais, no Brasil e no exterior.</p>
        </div>
        <div class="footer__col">
          <h2>Contato</h2>
          <ul>
            <li><a href="mailto:contato@wscodev.com.br">contato@wscodev.com.br</a></li>
            <li><a href="https://wa.me/${WA}" data-wa="Olá! Vim pelo site da Wscodev." target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
        </div>
        <nav class="footer__col" aria-label="Rodapé">
          <h2>Navegação</h2>
          <ul>
            <li><a href="../index.html#servicos">Serviços</a></li>
            <li><a href="../index.html#projetos">Projetos</a></li>
            <li><a href="../index.html#processo">Como funciona</a></li>
            <li><a href="../index.html#contato">Contato</a></li>
          </ul>
        </nav>
        <div class="footer__col footer__col--wide">
          <h2>Prévia grátis</h2>
          <p>Gostou deste projeto? Veja uma prévia do seu site antes de decidir.</p>
          <a class="btn btn--light" href="https://wa.me/${WA}" data-wa="Olá! Vi o projeto ${esc(nomeTexto(p))} no site da Wscodev e quero uma prévia do meu site." target="_blank" rel="noopener"><svg class="ico" aria-hidden="true"><use href="#i-whatsapp"/></svg> Quero uma prévia</a>
        </div>
      </div>
      <p class="footer__mark" aria-hidden="true">Wscodev</p>
      <div class="footer__bottom">
        <p><small>© <span data-year>2026</span> Wscodev. Todos os direitos reservados.</small></p>
        <a class="text-link text-link--light" href="#conteudo">Voltar ao topo</a>
      </div>
    </div>
  </footer>

  <a class="wa-dock" href="https://wa.me/${WA}" data-wa="Olá! Vi o projeto ${esc(nomeTexto(p))} no site da Wscodev e quero uma prévia do meu site." target="_blank" rel="noopener">
    <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"/></svg> Quero um site assim
  </a>

  <script src="../assets/vendor/gsap.min.js" defer></script>
  <script src="../assets/vendor/ScrollTrigger.min.js" defer></script>
  <script src="../assets/vendor/lenis.min.js" defer></script>
  <script src="../assets/js/main.js?v=6" defer></script>
</body>
</html>
`;
};

const outDir = path.join(__dirname, '..', 'projetos');
fs.mkdirSync(outDir, { recursive: true });
projetos.forEach((p, i) => {
  fs.writeFileSync(path.join(outDir, `${p.slug}.html`), page(p, i));
  console.log('ok', `projetos/${p.slug}.html`);
});

// ícones também no index.html (entre os marcadores)
const indexPath = path.join(__dirname, '..', 'index.html');
const idx = fs.readFileSync(indexPath, 'utf8');
const marked = idx.replace(/<!--icones:inicio-->[\s\S]*?<!--icones:fim-->/, `<!--icones:inicio-->\n${ICONES}\n<!--icones:fim-->`);
if (marked !== idx) { fs.writeFileSync(indexPath, marked); console.log('ok', 'ícones no index.html'); }
