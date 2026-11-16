# Miguel Ángel | Pianista — site

Site estático (HTML + CSS + JS, sem framework) com a mesma base de componentes do projeto **amparo**, a direção visual do briefing (marfim e grafite, títulos serifados) e as 6 páginas do mapa do site.

```
miguel/
├─ src/
│  ├─ layout.html          ← cabeçalho, menu, rodapé, modais e <head> comuns
│  └─ pages/*.html         ← conteúdo de cada página (bloco <!--meta--> no topo)
├─ scripts/
│  ├─ build.pl             ← monta site/<página>/index.html e o sitemap.xml
│  └─ serve.mjs            ← servidor local (opcional, precisa de Node)
└─ site/                   ← pasta publicada
   ├─ index.html · sobre-miguel/ · bodas/ · eventos/ · repertorio/ · contacto/ · privacidad/
   └─ assets/ css/style.css · js/main.js · fonts/ · img/
```

## Como editar

- **Textos das páginas**: edite `src/pages/*.html` (ou `src/layout.html`) e rode, no Git Bash, dentro de `miguel/`:
  `perl scripts/build.pl`
  Não edite os `index.html` de `site/` direto, porque o build os sobrescreve.
- **Estilos**: `site/assets/css/style.css` (CSS puro, sem build).
- **Atuações, vídeos, repertório e textos da fita**: arrays no topo de `site/assets/js/main.js`.
- Depois de alterar CSS ou JS em produção, aumente o `?v=1` em `src/layout.html` e rode o build.
- Para testar: abra `site/index.html` no navegador. Vídeos externos e o envio do formulário precisam de http(s): use `npm run dev` (Node) ou a extensão Live Server do VS Code.

## Formulário de contato

Envia para **pianistamiguelangel@gmail.com** via [FormSubmit](https://formsubmit.co) (`FORM_ENDPOINT` no `main.js`).

1. Publique o site e faça um envio de teste.
2. O FormSubmit manda um e-mail de **ativação** para esse endereço. Miguel precisa clicar em “Activate Form”.
3. Na confirmação, o FormSubmit mostra um código aleatório. Troque o e-mail na URL do `FORM_ENDPOINT` por esse código, para não expor o endereço no código.
4. Envie uma consulta real e confirme que ela chegou (critério de aceite do briefing).

Antes da ativação, o envio cai no caminho de erro: o texto preenchido é preservado e aparece o link do WhatsApp já com os dados.

## Pendências (do briefing, “Validação e entrega”)

| Item | Onde trocar |
|---|---|
| **Fotos reais** (as atuais são ilustrações provisórias com a etiqueta “Fotografía pendiente”): hero com Miguel e o piano reconhecíveis no celular, retrato, cerimônia, coquetel, recepção, concerto | `site/assets/img/photos/*.svg`: salve as fotos em `.webp` (lado maior ≈1600 px) e atualize o `src` em `src/pages/` |
| **Vídeos** das atuações (Señorío de Lepanto, Concierto privado, Noche en Blanco, Río Real, La Viñuela) e miniaturas 16:9 | `ACTUACIONES` em `main.js` (`media` e `thumb`) |
| Tipo de evento, cidade e crédito de cada registro | `ACTUACIONES` em `main.js` |
| Lista de repertório aprovada por Miguel | `REPERTORIO` em `main.js` (aparece sozinha na página Repertorio) |
| Nome para os avisos legais, limites de deslocamento, idiomas de atendimento | `src/pages/07-privacidad.html` e textos das páginas |
| Formatos atuais, logística (piano do local, som, ar livre) | `src/pages/03-bodas.html`, `04-eventos.html` |
| Domínio definitivo | `$SITE` em `scripts/build.pl` e `robots.txt`; depois rode o build |
| Analytics (cliques no WhatsApp, envios, reproduções) | eventos já vão para `window.dataLayer`: falta instalar GA4/Plausible e citá-lo na página de privacidade |
| Versão em inglês | fase de evolução, depois de validar o atendimento nesse idioma |
