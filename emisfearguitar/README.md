# Emiliano Bonanomi — EmisFearGuitar (site oficial)

Site estático em inglês britânico (en-GB), mesma base técnica do projeto AFTERAll: HTML + Tailwind compilado e inline, um `main.js` sem dependências e o AOS.

## Estrutura

| Rota | Fonte | Público |
|---|---|---|
| `/` | `src/pages/home.html` | Todos (entrada dupla: aulas × palco) |
| `/guitar-lessons/` | `src/pages/guitar-lessons.html` | Pais e alunos (preços, exames, FAQ, formulário) |
| `/live-session/` | `src/pages/live-session.html` | MDs, agências, bandas (EPK + showreel) |
| `/guitar-tabs/` | `src/pages/guitar-tabs.html` | Seguidores do YouTube/Instagram (captura de leads) |
| `/about/` | `src/pages/about.html` | Bio, formação, pesquisa, galeria |
| `/contact/` | `src/pages/contact.html` | Formulário segmentado + WhatsApp |
| `/privacy/` | `src/pages/privacy.html` | UK GDPR / cookies |

- `src/layout.html`: head (SEO, OG, schema.org), header, footer, modais e aviso de cookies, tudo comum às páginas.
- `src/partials/`: blocos reutilizados (credenciais, formulário, depoimentos, logos, contatos).
- `site/assets/js/main.js`: vídeos (`VIDEOS`, `FEATURED_HOME`), galeria (`GALLERY`), formulários e endpoints.
- `site/`: a pasta publicada. Os `index.html` são **gerados**: edite em `src/` e rode o build.

## Comandos

```bash
npm install
npm run build   # compila o Tailwind e gera site/**/index.html + sitemap.xml
npm run dev     # http://localhost:8080
```

## Antes de publicar

- **Domínio:** trocar `SITE` em `scripts/build.mjs` e em `main.js`, e o endereço no `site/robots.txt`.
- **Formulário de contato:** hoje ele abre o app de e-mail ou o WhatsApp do visitante. Para receber direto na caixa de entrada, preencher `FORM_ENDPOINT` (Formspree ou similar).
- **Tablaturas (RF02):** preencher `TABS_ENDPOINT` com o formulário da ferramenta de e-mail (MailerLite, Kit ou Mailchimp) e configurar nela a automação que envia o link dos PDFs.

## Pendências com o cliente (briefing, seção 13)

- [ ] Preço da aula avulsa de 30 min: **£33** (site atual, valor usado) ou £35 (MusicTeacher.com).
- [ ] Manter a Taster de 20 min por £20.
- [ ] Exibir os valores de 60 min (£65 avulsa / £550 pacote; hoje exibidos) e decidir se há valor para 45 min.
- [ ] Confirmar +44 7565 016969 e os horários de atendimento.
- [ ] Mostrar os anos de conclusão na linha do tempo do About (hoje exibidos; para ocultar, remover os `<span data-year>`).
- [ ] Lista completa de créditos de teatro; permissão para usar avaliações do Encore Musicians.
- [ ] Materiais: logotipo em vetor, fotos em alta (estúdio, palco, 1–2 ensinando), logos dos parceiros em HD, PDFs das tablaturas.
