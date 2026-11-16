# Manuel Cribaño · El Niño de Peñaflor — site

Usa a mesma base do projeto **amparo**, como o site do Miguel:

- página única;
- Tailwind 3.4.16 compilado e colocado inline no HTML;
- paleta e fontes do Amparo (Anton, Inter e Space Mono, servidas localmente);
- AOS para as animações;
- conteúdo em arrays no `site/assets/js/main.js`.

Os textos seguem o briefing de 16/11/2026, e o conteúdo foi completado com o canal oficial do YouTube e o Instagram do artista.

Endereço publicado: https://wscodev.com/manuel-cribano/site/

## Seções

Inicio · Biografía · Actuaciones · Cantes · Música y vídeos (15 vídeos, singles e fotos) · Agenda · Prensa · FAQ · Contacto

## Como editar o conteúdo

O conteúdo fica nos arrays do `main.js`. Nenhuma dessas edições precisa de build:

- **Cantes:** `CANTES`.
- **Trajetória:** `MOMENTOS`.
- **Vídeos:** `VIDEOS`. A capa de cada vídeo é `assets/img/videos/<id>.jpg`, em 400x500.
- **Singles:** `GRABACIONES`.
- **Fotos:** `GALERIA`.
- **Agenda:** `EVENTOS`. As datas futuras aparecem sozinhas em "Próximas actuaciones" e as passadas vão para o arquivo.

## Build

Rode o build depois de mudar classes ou textos no HTML. Ele compila `src/input.css` e coloca o CSS dentro de `<style id="site-css">` em `index.html` e `privacidad.html`.

- **Com Node:** `npm run build`. Para servir em localhost: `npm run dev`.
- **Sem Node:** `powershell -ExecutionPolicy Bypass -File build.ps1`. Ele usa `tools/tailwindcss.exe`, o CLI standalone oficial v3.4.16, que não vai para o Git. Para servir em localhost: `tools/serve.ps1`.

## Formulário

Envia para `manuelsellamacopla@gmail.com` via FormSubmit (`FORM_ENDPOINT` no `main.js`).

1. No primeiro envio, chega um e-mail de ativação e Manuel precisa clicar em **Activate Form**.
2. Depois, troque o e-mail na URL do `FORM_ENDPOINT` pelo código aleatório que o FormSubmit mostra.

A mensagem de sucesso só aparece com a confirmação do servidor.

## Pendências com o artista

- **E-mail:** o site usa o e-mail da bio do Instagram ("Abierta Contratación"). O briefing citava isacripla@gmail.com, que aparece na descrição do YouTube. Confirmar qual fica.
- **Instagram:** a página pública do perfil não mostra os códigos dos reels. Para incorporar reels específicos, pegar os links (`instagram.com/reel/…`) com o artista.
- **Datas tiradas do Instagram:**
  - Riogordo: só o mês (nov/2026), sem o dia.
  - Fuente Palmera e Aguilar de la Frontera: sem data.
  - Confirmar as datas e preencher `fecha` em `EVENTOS`.
- **Agenda futura:** pedir as próximas datas ao artista, com os links dos organizadores.
- **Fotos e formatos:** fotos oficiais com crédito. Por enquanto, as imagens são quadros dos vídeos do canal. Também faltam formatos de recital, cachê e rider técnico.
- **Biografia:** validar os discos «A mi padre» e «Con su permiso», os resultados de TV e o prêmio em Hornachos antes de citá-los.
- **Privacidade:** revisar `privacidad.html` com o responsável.
