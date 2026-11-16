# AMADOR • Violinist — site de David Amador

Site bilíngue (ES/EN) feito a partir do briefing `../briefing/Briefing_AMADOR_Violinist.docx`, com a mesma base técnica e visual do projeto de referência Amparo (Tailwind, grão de filme, fitas, lista de repertório que acende, linha do tempo, cartão picotado). Identidade própria: acento cor de verniz de violino + bordô, itálico Cormorant Garamond na assinatura "Violinist" e as quatro cordas (Sol · Re · La · Mi) vibrando no hero.

## Estrutura

| Página | ES | EN |
|---|---|---|
| Início | `/es/` | `/en/` |
| Casamentos | `/es/bodas/` | `/en/weddings/` |
| Eventos | `/es/eventos/` | `/en/events/` |
| Artista | `/es/sobre-david/` | `/en/about-david/` |
| Vídeos e repertório | `/es/videos-repertorio/` | `/en/videos-repertoire/` |
| Contato + FAQ | `/es/contacto/` | `/en/contact/` |
| Privacidade | `/es/privacidad/` | `/en/privacy/` |

`/` (raiz) redireciona pelo idioma do navegador (es/ca/gl/eu → ES; resto → EN) e lembra a escolha manual.

```
scripts/data.cjs         ← vídeos, repertório, depoimentos, contatos e URL do site (EDITAR AQUI)
scripts/build-pages.cjs  ← layout e textos ES/EN de todas as páginas
scripts/images.cjs       ← gera os WebP a partir de raw/
src/input.css            ← estilos complementares ao Tailwind
site/                    ← o que vai para a hospedagem
site/api/enquiry.php     ← recebe o formulário e envia ao e-mail de reservas
raw/                     ← imagens originais (não publicar)
```

## Comandos

```bash
npm install
npm run build     # gera as 14 páginas + sitemap/robots e compila o CSS
npm run images    # regenera as imagens a partir de raw/
npm run dev       # http://localhost:8080 (simula o envio do formulário; ?fail na URL simula erro)
```

Nesta máquina não há Node instalado: os comandos foram rodados com o Node embutido no VS Code
(`ELECTRON_RUN_AS_NODE=1 "D:/Program/Microsoft VS Code/Code.exe" scripts/build-pages.cjs`).

Ao alterar `main.js` ou o CSS, aumente `VERSION` em `scripts/build-pages.cjs` (cache longo no `.htaccess`).

## Formulário (briefing R03)

O site envia para `site/api/enquiry.php` (Apache/cPanel com PHP). Antes de publicar:
1. Em `enquiry.php`, ajuste `FROM` para um e-mail do domínio do site (ex.: `web@amadorviolin.com`).
2. Faça um envio de teste e confirme a chegada em amadorviolinist@gmail.com com data e cidade.
3. Em hospedagem estática (Vercel), o PHP não roda: a pessoa vê a mensagem de erro com o atalho de WhatsApp já preenchido. Para a prévia em Vercel, troque o `action` do formulário por um serviço de formulários (Formspree, Web3Forms…) ou por uma função serverless.

## Material usado

- **Fotos:** retrato de amadorviolin.com (`raw/about.jpg`) e quadros dos vídeos do canal oficial youtube.com/@amadorviolin. As fotos do Bodas.net não puderam ser baixadas (proteção do site).
- **Vídeos:** 25 vídeos do canal oficial, com momento, música e formato (briefing R04). Carregam só no clique, em `youtube-nocookie.com`.
- **Depoimentos:** Nohely Hernández e Ling Pham (curadoria do briefing) e Sven & Shannon (casal internacional), copiados de amadorviolin.com/booking no idioma original.
- **Não usado de propósito:** pacotes, depoimentos, FAQ e fotos de banco de imagens do template de fotografia (@Elarisse) do site atual.

## A validar com o David antes de publicar

- [ ] Assinatura visual, cidade-base, área de atuação, regras de deslocamento e e-mail que recebe as consultas
- [ ] Serviços, duração das apresentações, formatos solo/ensemble, som e montagem, plano para chuva, preço público ou não
- [ ] Seleção final de 4–6 vídeos em destaque (`featured` em `data.cjs`), retrato e **fotos profissionais em eventos reais** (cerimônia e coquetel)
- [ ] Autorização de uso de nome e texto dos depoimentos
- [ ] Nomes dos festivais; incluir ou não as orquestras da bio atual
- [ ] Ensemble: formação, número de músicos e vídeo (Schubertiades)
- [ ] Titular, NIF e endereço para a Política de Privacidade e para criar o Aviso Legal (LSSI)
- [ ] Ao trocar o domínio: `SITE` em `data.cjs`, `npm run build` e os redirecionamentos 301 comentados no `.htaccess`
- [ ] Medição (cliques no WhatsApp, envios, idioma, página de origem): eventos já estão no `dataLayer`; falta escolher GA4/Plausible e citá-lo na privacidade
