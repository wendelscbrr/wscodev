---
name: Wscodev
description: Estúdio que faz sites sob medida; vitrine monocromática de topo claro e corpo preto.
colors:
  accent: "#3B5BDB"
  accent-hover: "#4C6EF5"
  paper: "#ececec"
  paper-2: "#e1e1e3"
  ink: "#0e0e10"
  ink-2: "#4f5056"
  line-l: "#d0d0d3"
  night: "#0b0b0c"
  night-2: "#080809"
  media-black: "#050506"
  card: "#151517"
  card-2: "#1b1b1e"
  chip: "#222225"
  line-d: "#27272b"
  line-strong: "#3a3a40"
  ink-hover: "#2a2a2e"
  fg: "#f2f2f3"
  fg-2: "#a6a6ad"
  fg-3: "#85858c"
  signal-error: "#ff6b81"
typography:
  display:
    fontFamily: "Urbanist, Manrope, Segoe UI, sans-serif"
    fontSize: "clamp(46px, 6.6vw, 96px)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Urbanist, Manrope, Segoe UI, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 60px)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Urbanist, Manrope, Segoe UI, sans-serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Manrope, Segoe UI, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.01em"
  label-caps:
    fontFamily: "Manrope, Segoe UI, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  sm: "6px"
  icon: "10px"
  md: "12px"
  lg: "16px"
  xl: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  wrap: "1240px"
  header: "76px"
  section: "clamp(80px, 10vw, 140px)"
  grid-gap: "16px"
  card-pad: "22px"
  head-gap: "clamp(36px, 4vw, 56px)"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "48px"
  button-dark-hover:
    backgroundColor: "{colors.ink-hover}"
  button-light:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "48px"
  button-light-hover:
    backgroundColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
    height: "48px"
  pill-button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "42px"
  pill-button-hover:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.ink}"
  tag:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.fg-2}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.fg-2}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  filter-chip-on:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.ink}"
  icon-box:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.fg}"
    rounded: "{rounded.icon}"
    size: "44px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.fg}"
    rounded: "{rounded.lg}"
    padding: "22px"
  card-hover:
    backgroundColor: "{colors.card-2}"
  contact-row:
    backgroundColor: "{colors.card}"
    textColor: "{colors.fg}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  input:
    backgroundColor: "{colors.night}"
    textColor: "{colors.fg}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
    height: "48px"
  hero-panel:
    backgroundColor: "{colors.media-black}"
    rounded: "{rounded.xl}"
---

# Design System: Wscodev

## Overview

**Creative North Star: "A Vitrine em Preto e Branco"**

O site da Wscodev é uma vitrine silenciosa: um topo cinza-claro, como papel de estúdio, que desce por um corte diagonal para um corpo quase preto onde os trabalhos e a oferta ficam expostos em cartões grafite. Uma única cor de destaque, o azul #3B5BDB, marca os detalhes que pedem ação: botões, ícones, setas, abas ativas, números das etapas e a órbita do título. Todo o resto continua em claro e escuro, e o contraste, a espessura das linhas e o peso fino dos títulos seguem fazendo a maior parte do trabalho. A oferta e o botão de WhatsApp aparecem antes de qualquer efeito; o movimento existe para acompanhar a leitura, nunca para disputar com ela.

A densidade é baixa e generosa: seções com muito respiro vertical, títulos grandes em maiúsculas com traço fino, texto de apoio curto em cinza. Os elementos de assinatura são poucos e reconhecíveis: a órbita elíptica de traço fino em volta de uma palavra do título, a linha cinza grossa em degrau que atravessa o topo, o retrato recortado (sem fundo) apoiado na base do topo claro, com a linha em degrau passando por trás e a linha ondulada atrás das etapas. As imagens (os projetos e o retrato) aparecem nas cores de origem: a interface é monocromática para que a cor de cada cliente e da foto fique em primeiro plano.

O mundo foi fixado pelo dono a partir de uma referência (topo claro, corpo preto, monocromático, títulos finos em maiúsculas, botões retangulares e tags em pílula). Ele substitui por completo o mundo anterior de azul elétrico e cromados, que não deve voltar.

**Key Characteristics:**
- Duas superfícies: topo claro (#ececec) com tinta quase preta; corpo preto (#0b0b0c) com cartões grafite.
- Monocromático de ponta a ponta; nenhum acento de cor, inclusive no foco.
- Títulos em Urbanist 300, maiúsculas, tracking negativo; texto em Manrope.
- Botões retangulares de canto 6px; tags, filtros e navegação em pílula.
- Cartões de canto 16px, borda de 1px, sem sombra; profundidade por tom.
- Linhas como ornamento: órbita fina, degrau grosso, onda grossa, filetes de 1px.

## Colors

Uma escala de cinzas neutros em dois mundos (claro e escuro) e um único azul de destaque para os detalhes.

### Primary
- **Tinta Quase Preta** (ink): a "cor de marca" do topo claro. Títulos, botão principal escuro, órbita, filetes e foco sobre fundo claro. Também é a cor do texto dentro de botões e chips claros no corpo escuro.
- **Branco Gelo** (fg): o par invertido da tinta no corpo escuro. Texto principal, botão claro, estado ativo de filtros e chips, fundo do botão fixo de WhatsApp no celular e anel de foco sobre fundo escuro.

### Neutral
- **Papel de Estúdio** (paper): fundo do topo e dos cabeçalhos dos estudos de caso; texto de botões escuros.
- **Papel Sombreado** (paper-2): a linha grossa em degrau que atravessa o topo (traço de 18px).
- **Grafite Médio** (ink-2): texto de apoio no topo claro (parágrafo do hero, metadados dos estudos de caso).
- **Filete Claro** (line-l): bordas e divisórias no topo claro e no cabeçalho translúcido.
- **Noite** (night): fundo do corpo, das seções e dos campos de formulário.
- **Noite Funda** (night-2): fundo do rodapé, um degrau abaixo do corpo.
- **Preto de Mídia** (media-black): fundo do cartão de chamada, onde o retrato recortado se apoia.
- **Cartão Grafite** (card): todos os cartões e linhas de contato em repouso.
- **Cartão Aceso** (card-2): o mesmo cartão sob o mouse.
- **Chip** (chip): tags, caixas de ícone e números das etapas.
- **Filete Escuro** (line-d): borda de 1px de cartões, campos, divisórias e chips.
- **Filete Forte** (line-strong): borda de botões fantasma, links circulares e cartões sob o mouse.
- **Tinta Acesa** (ink-hover): botão escuro sob o mouse.
- **Cinza Prata** (fg-2): texto de apoio no corpo escuro.
- **Cinza Névoa** (fg-3): legendas, numeração e rótulos de menor peso.
- **Azul de Destaque** (accent): botões principais, ícones em caixa ou círculo, setas, abas e chips ativos, números das etapas e órbita do título. No hover, accent-hover. Texto e ícones por cima sempre em branco.
- **Sinal de Erro** (signal-error): somente para borda de campo inválido e mensagem de erro do formulário. Não é acento.

### Named Rules
**The Azul Só nos Detalhes Rule.** O azul #3B5BDB é a única cor com matiz da interface (além do vermelho de erro, restrito a validação) e vive só nos detalhes de ação: botões, ícones, setas, aba ou chip ativo, números das etapas e órbita do título. Sobre fundo escuro ele entra sempre como preenchimento com ícone ou texto branco (traço fino azul sobre preto fica em 3,5:1, pouco para ícones pequenos); sobre o topo claro pode aparecer como traço. Nunca como fundo de seção nem em texto corrido.

**The Foco Segue o Fundo Rule.** O anel de foco é de 2px, com 3px de afastamento, em branco gelo sobre fundo escuro e em tinta sobre fundo claro. Nunca colorido.

**The Duas Superfícies Rule.** Toda página começa no papel claro e desce para a noite. Não intercalar seções claras no meio do corpo escuro.

## Typography

**Display Font:** Urbanist (com Manrope, Segoe UI, sans-serif)
**Body Font:** Manrope (com Segoe UI, system-ui, sans-serif)

**Character:** Urbanist no peso 300, em maiúsculas e com tracking apertado, dá títulos altos, finos e calmos, quase arquitetônicos. Manrope sustenta o texto com uma voz clara e próxima, sem enfeite.

### Hierarchy
- **Display** (Urbanist 300, clamp(46px, 6.6vw, 96px), 0.98): o título do hero e dos estudos de caso, em duas linhas, maiúsculas. O mesmo traço aparece no nome gigante "WSCODEV" do rodapé (até 250px, cor quase igual ao fundo).
- **Headline** (Urbanist 300, clamp(34px, 4.2vw, 60px), 1.02): títulos de seção, maiúsculas, `text-wrap: balance`. Variante maior até 72px para a chamada final.
- **Title** (Urbanist 400, 22–28px, 1.2): títulos de cartões, serviços e projetos. Mantém caixa normal.
- **Body** (Manrope 400, 16px, 1.6): parágrafos, em cinza prata no escuro e grafite médio no claro; linhas curtas (até ~470px nos blocos de apoio, 640px nos estudos de caso).
- **Label** (Manrope 600, 13–14px): botões, links de texto, rótulos de campo, chamadas de cartão.
- **Label Caps** (Manrope 600, 12px, 0.18em, maiúsculas): apenas cabeçalhos de coluna do rodapé.

### Named Rules
**The Fino em Cima, Firme Embaixo Rule.** Títulos grandes nunca passam do peso 300; o peso 400 fica para títulos de cartão. A firmeza vem do Manrope 600 nos botões e rótulos, não de títulos pesados.

**The Maiúsculas Só no Display Rule.** Maiúsculas são reservadas aos títulos Urbanist e aos cabeçalhos do rodapé. Texto corrido, botões e tags ficam em caixa normal.

## Layout

Conteúdo numa coluna de até 1240px, com margem lateral fluida de 16px a 40px. O hero ocupa a altura da tela (até 920px) em duas colunas (texto à esquerda, retrato recortado à direita, apoiado na base, ocupando quase metade da largura) e termina com um corte diagonal escuro que puxa o leitor para o corpo. As seções têm respiro vertical de 80px a 140px e um cabeçalho que, quando há texto de apoio, alinha título à esquerda e parágrafo à direita na mesma base.

Ritmo das grades: 16px entre cartões; grades de duas colunas com espaçamento grande (até 96px) entre texto e mídia. Padrões recorrentes: trilho horizontal com rolagem e encaixe (necessidades), grade de três colunas (serviços), seletor de projetos em lista + imagem + texto, introdução fixa à esquerda com etapas empilhadas à direita, alternando recuo como degraus.

Responsivo: até 1100px o painel de projeto vira uma coluna; até 960px a navegação vira menu de tela cheia, o hero empilha (painel encostando nas bordas) e a lista de projetos vira pílulas roláveis; até 640px tudo é uma coluna, os botões do hero ocupam a largura e um botão fixo de WhatsApp em pílula aparece no rodapé da tela.

## Elevation & Depth

O sistema é plano. Profundidade vem de camadas de tom (noite, cartão grafite, cartão aceso, chip) e de bordas de 1px, não de sombras. O cabeçalho fixo fica translúcido com desfoque de 14px quando o conteúdo passa por baixo. Sombras existem apenas em três peças que imitam objetos físicos ou flutuam sobre o conteúdo.

### Shadow Vocabulary
- **Moldura de navegador** (`box-shadow: 0 30px 80px rgba(0,0,0,.35)`): capturas de tela dos projetos nos estudos de caso.
- **Moldura de celular** (`box-shadow: 0 30px 80px rgba(0,0,0,.45)`): a versão móvel dos projetos.
- **Botão flutuante** (`box-shadow: 0 10px 30px rgba(0,0,0,.45)`): o botão fixo de WhatsApp no celular.

### Named Rules
**The Tom Antes de Sombra Rule.** Cartões, campos e botões não têm sombra. Sob o mouse, o cartão clareia um degrau de tom e a borda fica mais forte; no máximo sobe 4px.

## Shapes

Duas famílias de forma convivem com papéis fixos. Ações principais são retângulos de canto pequeno (6px), firmes e sóbrios. Tudo que é escolha, filtro ou rótulo é pílula. Cartões têm canto médio (16px), mídias e linhas de contato 12px. Ícones vivem em caixas de 10px ou em círculos de 44px com borda fina.

As linhas são o ornamento: a órbita elíptica de traço 1.2px, levemente inclinada, que se desenha em volta de uma palavra do título; a linha em degrau de 18px no topo; a onda de 14px atrás das etapas; e filetes de 1px separando metadados e rodapés de cartão.

### Named Rules
**The Retângulo Age, Pílula Escolhe Rule.** Botão que leva a uma ação (WhatsApp, enviar, ver projetos) é retangular de 6px. Filtro, tag, chip de escolha e navegação são pílula. Não trocar os papéis.

## Components

### Buttons
Diretos e sóbrios; o contraste faz o chamado, não a cor.
- **Shape:** retângulo de canto pequeno (6px), altura mínima de 48px, 22px de lado, Manrope 600 14px, ícone opcional à esquerda com 10px de espaço.
- **Escuro (sobre o papel):** fundo tinta, texto papel; sob o mouse, tinta acesa.
- **Claro (sobre a noite):** fundo branco gelo, texto tinta; sob o mouse, branco puro. É o botão de WhatsApp do corpo.
- **Fantasma:** transparente, borda filete forte, texto branco gelo; sob o mouse a borda vira branco gelo.
- **Pressionado:** desce 1px. **Foco:** anel monocromático da regra "Foco Segue o Fundo".
- **Botão pílula do cabeçalho:** pílula de 42px com borda fina, fundo translúcido (claro no topo, grafite no escuro); sob o mouse inverte para o par de contraste. No celular vira só o ícone, 44px.

### Links
- **Link de texto:** Manrope 600 14px com seta; a seta anda 3px para a direita (ou na diagonal, no escuro) sob o mouse.
- **Link circular:** texto ao lado de um círculo de 44px com borda forte; sob o mouse o círculo enche de branco gelo e o ícone fica tinta.

### Chips
- **Tag:** pílula de chip com texto cinza prata, 12px. Variante grande: transparente com borda fina e texto branco gelo, 13px.
- **Filtro / chip de escolha:** pílula de 44px, borda filete escuro, texto cinza prata; sob o mouse borda forte e texto claro; ligado/marcado inverte para fundo branco gelo e texto tinta.

### Cards / Containers
- **Corner Style:** 16px (cartões), 12px (linha de contato, mídia).
- **Background:** cartão grafite; sob o mouse, cartão aceso e borda forte.
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).
- **Border:** 1px filete escuro.
- **Internal Padding:** 22px (necessidade), 32/26px (serviço), 22/24px (etapa).
- **Cartão de necessidade:** número pequeno no topo, ícone em caixa, título Urbanist 23px empurrado para baixo e um rodapé com filete e seta; sobe 4px sob o mouse.
- **Cartão de serviço:** centralizado, ícone em círculo de 56px, título, texto curto, tag e link; no celular vira linha com ícone à esquerda.
- **Cartão de etapa:** texto à esquerda e número Urbanist num círculo de 60px à direita; os cartões alternam recuo para formar degraus sobre a onda.
- **Cartão de chamada:** foto escura sangrando com degradê preto da esquerda, texto e chips sobre o preto; chips retangulares de 6px translúcidos.

### Inputs / Fields
- **Style:** fundo noite, borda 1px filete escuro, canto 6px, altura mínima 48px, texto 16px; rótulo Manrope 600 13px acima.
- **Focus:** borda passa a cinza prata com halo de 3px quase transparente (branco a 8%); sem contorno colorido.
- **Error:** borda em sinal de erro; mensagem de erro em vermelho claro abaixo do formulário.

### Navigation
- **Cabeçalho fixo** de 76px (64px no celular): logo prateado à esquerda, links em pílula no centro (Manrope 500 14px, 78% de opacidade, página atual com fundo cinza a 14%), botão pílula à direita. Troca de tom (claro/escuro) conforme a seção por baixo, ganha fundo translúcido com desfoque ao rolar e se esconde ao descer.
- **Menu do celular:** tela cheia na noite, links em Urbanist 300 maiúsculo de 30–44px; o ícone de duas linhas vira X.

### Seletor de projetos (assinatura)
Lista de nomes à esquerda (marcador de filete que cresce de 8px para 12px no selecionado), imagem 16:10 ao centro, nas cores originais, que perde o leve zoom sob o mouse, e texto com metadados à direita. A troca é por crossfade de 0,5s. No celular a lista vira pílulas roláveis.

### Retrato recortado (assinatura)
Foto sem fundo, nas cores originais, apoiada na base do topo claro e centrada na coluna direita (90% da altura do topo; 74% entre 961px e 1180px). A linha cinza em degrau passa por trás. Ao lado, um número solto em Urbanist ("100%") com legenda curta em cinza e um filete fino, como o "47.2% Reality" da referência. Ao rolar, o retrato se aproxima levemente a partir da base. No cartão de chamada, a mesma foto se apoia na base à direita sobre uma luz radial suave.

### Motion
Uma só curva para tudo: `cubic-bezier(.16, 1, .3, 1)`. Entradas sobem 20px e aparecem em 0,8s; hovers entre 0,25s e 0,4s; rolagem suave com Lenis; a órbita se desenha em 1,6s ao carregar. Cortina preta entre páginas. Com movimento reduzido, tudo aparece sem animação.

## Do's and Don'ts

### Do:
- **Do** começar toda página no papel claro (#ececec) e descer para a noite (#0b0b0c), com o corte diagonal ou a capa dividida.
- **Do** escrever títulos grandes em Urbanist 300, maiúsculas, tracking -0.02em.
- **Do** usar o botão claro (branco gelo com texto tinta) para o WhatsApp no corpo escuro e o botão escuro no topo claro.
- **Do** dar a todo cartão canto de 16px, fundo grafite e borda de 1px, e responder ao mouse clareando o tom.
- **Do** mostrar fotos e capas de projeto sempre nas cores de origem; a cor vem só das imagens, nunca da interface.
- **Do** manter alvos de toque com no mínimo 44px.
- **Do** mostrar o logotipo prateado "Wscodev" nas versões clara e escura, trocando conforme o fundo.

### Don't:
- **Don't** introduzir azul elétrico, cromados, gradientes metálicos ou qualquer acento colorido; o mundo antigo foi descartado.
- **Don't** usar cor no anel de foco.
- **Don't** colocar sombra em cartões, campos ou botões.
- **Don't** usar títulos em peso acima de 300 nem maiúsculas em texto corrido e botões.
- **Don't** fazer botões de ação em pílula nem tags em retângulo.
- **Don't** intercalar seções claras no meio do corpo escuro.
