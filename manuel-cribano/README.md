# Site · Manuel Cribaño · El Niño de Peñaflor

Site multipágina em espanhol (es-ES), feito a partir do briefing de 16/11/2026 e com a mesma base visual e técnica do site de Amparo (`../proposta pianista/amparo`). A paleta foi trocada para vermelho cravo e dourado albero, e foi acrescentado o itálico Playfair para dar o tom de "cante".

## Estrutura

```
site/                      ← pasta publicada (estática)
  index.html               /                 Inicio
  biografia/               /biografia        Biografía + Prensa y materiales (#prensa)
  actuaciones/             /actuaciones
  musica-y-videos/         /musica-y-videos
  agenda/                  /agenda
  contacto/                /contacto
  privacidad.html
  assets/js/data.js        ← CONTEÚDO EDITÁVEL: agenda, vídeos, gravações, e-mail, endpoint do formulário
  assets/js/main.js        interações (agenda automática, player do YouTube, formulário, consentimento)
src/pages/*.html           fonte de cada página (meta de SEO no topo de cada arquivo)
src/partials/              head, header (menu) e footer comuns
src/input.css              estilos complementares ao Tailwind
build.ps1                  monta as páginas + compila o CSS + gera sitemap.xml
tools/serve.ps1            servidor local (http://localhost:8080)
tools/tailwindcss.exe      Tailwind CLI standalone v3.4.16 (não precisa de Node)
raw/                       imagens originais (não publicar)
```

## Como editar

- **Datas, vídeos, discos e contato:** edite só `site/assets/js/data.js`. Não é preciso rodar o build. As datas futuras aparecem em ordem e as passadas vão sozinhas para o arquivo. Quando não há datas futuras, a página mostra o aviso de ausência de datas.
- **Textos das páginas, menu e rodapé:** edite `src/pages/` ou `src/partials/` e rode o build:

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1          # build completo
powershell -ExecutionPolicy Bypass -File tools\serve.ps1    # testar em http://localhost:8080
```

> Não edite os `.html` dentro de `site/`, porque o build sobrescreve esses arquivos.

## Antes de publicar

1. **Domínio:** troque `$SITE` em `build.ps1`, o endereço em `site/robots.txt` e as URLs do JSON-LD em `src/pages/index.html`. Depois, rode o build.
2. **Formulário:** cole em `formEndpoint` (`data.js`) o endereço do serviço que recebe os pedidos (por exemplo, Formspree). Teste um envio real e um envio com erro. A mensagem de sucesso só aparece quando o servidor confirma o envio. Sem endpoint, o formulário abre o programa de e-mail da pessoa com a mensagem já preparada.
3. **Política de privacidade:** o texto atual é um rascunho e precisa ser revisado com o responsável.

## Pendências com o artista (briefing)

- Confirmar se a caixa **isacripla@gmail.com** está ativa e se ele aprova publicá-la. Ela está em `data.js`, no rodapé e na página de contato. Confirmar também se há WhatsApp e quem responde às consultas.
- **Fotos oficiais autorizadas, com crédito.** Por enquanto, o site usa quadros dos vídeos do próprio canal (`assets/img/photos`, `assets/img/videos`). Para trocá-las, substitua os arquivos mantendo os mesmos nomes.
- **Capas dos discos autorizadas.** Coloque cada uma em `assets/img/covers/` e preencha `capa` em `data.js`. Sem capa, o site desenha um disco no lugar.
- **Formatos de recital:** formação, duração, território, cachê e rider técnico. Quando aprovados, criar uma ficha por formato em `actuaciones`.
- **Agenda futura** e links oficiais de ingressos.
- Antes de citar outros marcos na biografia, validar os discos «A mi padre» e «Con su permiso», os resultados de TV e o prêmio em Hornachos.
- **Dossiê artístico em PDF:** o botão "Descargar dossier artístico" entra na seção `#prensa` quando o arquivo existir.
- Links da Amazon Music: o briefing traz `music.amazon.in` e `music.amazon.com`. Avaliar se há versões em `.es`.
