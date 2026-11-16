# Miguel Ángel | Pianista — site

Mesma base do projeto **amparo**: página única, Tailwind 3.4.16 compilado e inline, fontes locais (Anton, Inter, Space Mono), AOS e `assets/js/main.js` com os conteúdos em arrays. Os textos seguem o briefing.

## Build

- Com Node: `npm run build` (compila `src/input.css` → `build/style.css` e coloca o CSS dentro de `<style id="site-css">` em `site/index.html` e `site/privacidad.html`).
- Sem Node: use o executável standalone do Tailwind 3.4.16 (`tailwindcss-windows-x64.exe`) com os mesmos argumentos de `build:css` e depois copie o CSS para o bloco `<style id="site-css">`, trocando `../fonts/` por `assets/fonts/` e `../img/` por `assets/img/`.

## Formulário

Envia para pianistamiguelangel@gmail.com via FormSubmit (`FORM_ENDPOINT` no `main.js`). No primeiro envio chega um e-mail de ativação: Miguel precisa clicar em “Activate Form”. Depois, troque o e-mail na URL pelo código aleatório que o FormSubmit mostra.

## Pendências

- **Fotos**: os arquivos `.svg` em `site/assets/img/photos/` e `site/assets/img/videos/` são provisórios (“Foto pendiente”). Fontes possíveis: Instagram @el_pianista_miguel e o portfólio dele no bodas.net (2 fotos com crédito de Javier del Pino Photo).
- **Vídeos**: preencher `media` em `ACTUACIONES` (`main.js`) com o código de cada reel.
- Confirmar com o artista: tipo de evento de cada atuação, deslocamento, nome para o aviso legal e repertório aprovado.
