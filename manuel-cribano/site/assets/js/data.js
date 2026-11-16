/* ==========================================================
   Manuel Cribaño · El Niño de Peñaflor — CONTEÚDO EDITÁVEL
   Agenda, vídeos, gravações e contato ficam aqui: corrigir um
   texto, um link ou acrescentar uma data NÃO exige mexer no layout.
   Textos públicos em espanhol (es-ES). Comentários em português.
   Fontes de cada item: referências numeradas do briefing [n].
   ========================================================== */

window.MC = {
  // ---------- CONTATO ----------
  // E-mail declarado no YouTube do artista como contato de contratação [8].
  // PENDENTE: confirmar com o artista que a caixa segue ativa e que aprova a publicação.
  email: 'isacripla@gmail.com',
  instagram: 'https://www.instagram.com/manuel_cribano/',
  youtube: 'https://www.youtube.com/channel/UCxmcFiyQAkpSCjx8dxdPVCA',
  threads: 'https://www.threads.com/@manuel_cribano',

  // Formulário de contratação. Cole aqui o endereço do serviço que recebe os pedidos
  // (ex.: Formspree "https://formspree.io/f/xxxx", Web3Forms, Netlify, endpoint próprio).
  // O envio é feito em JSON e a mensagem de sucesso só aparece quando o servidor confirma (resposta 2xx).
  // Vazio = o formulário prepara o e-mail no programa de correio da pessoa (nada é enviado pelo site).
  formEndpoint: '',

  // ---------- AGENDA ----------
  // Campos: titulo · estado (confirmado | aplazado | cancelado | realizado) · fecha 'AAAA-MM-DD' (ou 'AAAA-MM' se só houver o mês)
  //         hora 'HH:MM' (hora local do recinto; vazio = "Horario por confirmar") · ciudad · region · recinto
  //         acceso (ex.: 'Entrada libre', 'Entrada con invitación') · url (página do organizador) · urlLabel
  //         entradas (URL da bilheteria OFICIAL, se houver) · nota (ex.: 'Fecha según prensa')
  // Datas futuras aparecem em "Próximas actuaciones" em ordem de data; as passadas vão sozinhas para o arquivo.
  // ANTES de cadastrar datas futuras: pedir a programação ao artista e validar o link de cada organizador.
  eventos: [
    {
      titulo: 'Noche de fandangos en Ronda', estado: 'realizado', fecha: '2020-01-13', hora: '',
      ciudad: 'Ronda', region: 'Málaga', recinto: 'Peña Flamenca de Ronda', acceso: '',
      url: 'https://www.andaluciainformacion.es/articulo/ronda/francisco-hurtado-morilito-actuo-en-la-pena-flamenca/202001131700392247494.amp.html',
      urlLabel: 'Leer en Andalucía Información', nota: 'Fecha de la noticia', // [17]
    },
    {
      titulo: 'Circuito Andaluz de Peñas · Martos', estado: 'realizado', fecha: '2026-06-06', hora: '',
      ciudad: 'Martos', region: 'Jaén', recinto: 'Peña Flamenca de Martos', acceso: '',
      url: 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/el-cantaor-nino-de-penaflor-en-martos',
      urlLabel: 'Ver programa', nota: '', // [2]
    },
    {
      titulo: 'Circuito Andaluz de Peñas · Lentejí', estado: 'realizado', fecha: '2026-10-16', hora: '',
      ciudad: 'Lentejí', region: 'Granada', recinto: 'Peña Flamenca El Cantor', acceso: '',
      url: 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/el-cantaor-nino-de-penaflor-en-lenteji',
      urlLabel: 'Ver programa', nota: '', // [1]
    },
    {
      titulo: 'Otoño Flamenco · Mancha Real', estado: 'realizado', fecha: '2026-10', hora: '',
      ciudad: 'Mancha Real', region: 'Jaén', recinto: 'Peña Cultural Flamenca El Trillo', acceso: '',
      url: 'https://lacontradejaen.eldiario.es/penaflor-mancha-real-flamenco-jaen/',
      urlLabel: 'Leer en La Contra de Jaén', nota: 'Fecha según prensa', // [18]
    },
  ],

  // ---------- VÍDEOS ----------
  // youtube = id do vídeo (carrega no próprio site, só ao clicar) · url = link externo (emissora: sem incorporar)
  // img = capa em assets/img/videos/ (quadro do próprio vídeo do canal do artista)
  // destacado: true = aparece em destaque na página inicial e no topo de "Música y vídeos"
  videos: [
    {
      titulo: 'Marianas', etiqueta: 'Videoclip oficial · 2025', youtube: '-bFQLDr8fyU', img: 'marianas.jpg',
      desc: 'Con Javi Santiago a la guitarra y Tamara Vargas en los coros.',
      creditos: 'Manuel Cribaño (cante) · Javi Santiago (guitarra) · Tamara Vargas (coros)',
      cta: 'Ver el videoclip', destacado: true, // [7]
    },
    {
      titulo: 'Actuación completa en Don Benito', etiqueta: 'En directo', youtube: 'epaeQcJOpkY', img: 'don-benito-wide.jpg',
      desc: 'Un concierto completo de El Niño de Peñaflor, publicado en su canal.',
      cta: 'Ver la actuación completa', // [12]
    },
    {
      titulo: 'El Cristo de los Faroles', etiqueta: 'Tierra de talento · Canal Sur',
      url: 'https://www.canalsur.es/television/tierra-de-talento/nino-penaflor-pasa-fase-gracias_1_1269142.html',
      plataforma: 'Canal Sur', desc: 'La interpretación con la que Manuel Cribaño pasó de fase en Tierra de talento.',
      cta: 'Ver en Canal Sur', // [3] — link externo: incorporar/usar miniatura depende de autorização da emissora
    },
  ],

  // ---------- GRAVAÇÕES ----------
  // titulo exatamente como na plataforma · links: um por plataforma (o botão diz "Escuchar en <plataforma>")
  // capa: arquivo em assets/img/covers/ SOMENTE com capa autorizada; sem capa, o site desenha um disco
  grabaciones: [
    { titulo: 'Marianas (feat. Tamara Vargas)', anio: 2025, tipo: 'Single', capa: '',
      links: [{ plataforma: 'Apple Music', url: 'https://music.apple.com/us/album/marianas-feat-javi-santiago-tamara-vargas-single/1845872300' }] }, // [13]
    { titulo: 'En Navidad por Fandangos', anio: 2025, tipo: 'Single', capa: '',
      links: [{ plataforma: 'Amazon Music', url: 'https://music.amazon.in/albums/B0G2G7P9HV' }] }, // [14]
    { titulo: 'Mi compás y mi razón', anio: 2026, tipo: 'Single', capa: '',
      links: [{ plataforma: 'Amazon Music', url: 'https://music.amazon.com/albums/B0G6VKNG35' }] }, // [15]
    { titulo: 'Mi Jaca', anio: 2026, tipo: 'Single', capa: '',
      links: [{ plataforma: 'Apple Music', url: 'https://music.apple.com/us/album/mi-jaca-single/1895547525' }] }, // [16]
  ],

  // Fitas inclinadas (marquee) da página inicial
  marquee: ['Cante flamenco', 'Copla', 'Peñaflor · Sevilla', 'Fandangos', 'Tangos', 'Soleá', 'Malagueñas', 'Colombianas', 'Peñas y festivales', 'Canal Sur'],
};
