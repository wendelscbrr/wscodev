// ==========================================================
// AMADOR • Violinist — dados do site (fonte única)
// Editar aqui e rodar "npm run build": as 14 páginas ES/EN são regeradas.
// ==========================================================

// Endereço da prévia. Ao mover para o domínio do artista, troque só aqui (canonical, hreflang, sitemap, JSON-LD)
const SITE = 'https://wscodev.vercel.app/amador/site/';

const CONTACT = {
  whatsapp: '34647697892',            // +34 647 697 892 (briefing e site atual)
  phone: '+34 647 697 892',
  email: 'amadorviolinist@gmail.com', // e-mail publicado para reservas
  instagram: 'https://www.instagram.com/amadorviolin/',
  instagramHandle: '@amadorviolin',
  youtube: 'https://www.youtube.com/@amadorviolin',
};

// Categorias do briefing: Clásica · Romántica · Cine · Cóctel
const CATS = {
  clasica: { es: 'Clásica', en: 'Classical' },
  romantica: { es: 'Romántica', en: 'Romantic' },
  cine: { es: 'Cine', en: 'Film' },
  coctel: { es: 'Cóctel', en: 'Drinks reception' },
};

// Vídeos do canal oficial youtube.com/@amadorviolin (títulos conferidos no canal, nov/2026).
// vertical = Short (9:16) · cats = filtros · moment = momento sugerido (briefing: cada vídeo identifica momento, música e formato)
// Local só aparece quando é um ponto público reconhecível (briefing). Capa: assets/img/videos/<id>.webp (npm run images)
// A APROVAR COM O DAVID: seleção final de 4 a 6 vídeos em destaque (featured) e créditos.
const VIDEOS = [
  { id: 'NNFr4XZT9qk', t: 'Experience × Interstellar', a: 'Ludovico Einaudi · Hans Zimmer', cats: ['cine', 'clasica'], featured: 1, moment: 'ceremony', place: 'Montjuïc, Barcelona' },
  { id: 'RIA_TDf-ov0', t: 'Palladio', a: 'Karl Jenkins', cats: ['clasica'], featured: 2, moment: 'ceremony', place: 'Barcelona' },
  { id: 'bNyF-S0rXvU', t: 'Sarà perché ti amo', a: 'Ricchi e Poveri', cats: ['coctel'], featured: 3, moment: 'drinks', place: 'Barceloneta, Barcelona' },
  { id: 'd048OehNS20', t: 'Janam Janam', a: 'Pritam · «Dilwale»', cats: ['romantica', 'cine'], featured: 4, moment: 'ceremony' },
  { id: 'T3UoqGRTbqc', t: 'Don’t Stop Me Now', a: 'Queen', cats: ['coctel'], featured: 5, moment: 'party' },
  { id: 'M_tJdHg9GeM', t: 'Caruso', a: 'Lucio Dalla', cats: ['romantica'], moment: 'dinner' },
  { id: 'IrDNlSTihJU', t: 'Felicità', a: 'Al Bano & Romina Power', cats: ['coctel'], moment: 'drinks' },
  { id: 'JVJ4mch24ZY', t: 'Concierto de Aranjuez', a: 'Joaquín Rodrigo', cats: ['clasica'], vertical: true, moment: 'ceremony' },
  { id: '8MivlHhSNkU', t: 'Mariage d’amour', a: 'Paul de Senneville', cats: ['romantica', 'clasica'], vertical: true, moment: 'ceremony', place: 'Laberint d’Horta, Barcelona' },
  { id: 'hjQIFZuAQjY', t: 'Only Time', a: 'Enya', cats: ['romantica'], vertical: true, moment: 'ceremony' },
  { id: '4U4tYtzJRIY', t: 'Until I Found You', a: 'Stephen Sanchez', cats: ['romantica'], vertical: true, moment: 'ceremony' },
  { id: 'Bt2tTdOwdIo', t: 'I Have Nothing', a: 'Whitney Houston', cats: ['romantica'], vertical: true, moment: 'dinner' },
  { id: 'dkw0s1E76yY', t: 'Right Here Waiting', a: 'Richard Marx', cats: ['romantica'], vertical: true, moment: 'dinner' },
  { id: 'qRJBvpYNID8', t: 'Mon Amour', a: 'Slimane', cats: ['romantica'], vertical: true, moment: 'drinks' },
  { id: 'DkjeREtnxnc', t: 'Beauty and the Beast', a: 'Alan Menken', cats: ['cine', 'romantica'], vertical: true, moment: 'ceremony' },
  { id: '3tqidZjH6o0', t: 'Now We Are Free', a: 'Hans Zimmer · «Gladiator»', cats: ['cine'], vertical: true, moment: 'ceremony' },
  { id: 'kFrcpXk8bps', t: 'Conquest of Paradise', a: 'Vangelis', cats: ['cine'], vertical: true, moment: 'ceremony' },
  { id: '6RtNh5QBJPM', t: 'Game of Thrones', a: 'Ramin Djawadi', cats: ['cine'], vertical: true, moment: 'party' },
  { id: 'wdv0IFseeXo', t: 'Pure Imagination', a: '«Willy Wonka»', cats: ['cine'], vertical: true, moment: 'drinks' },
  { id: '8OFNwYz4fr4', t: 'Corazón partío', a: 'Alejandro Sanz', cats: ['coctel'], vertical: true, moment: 'drinks' },
  { id: 'Tm3OqASHnKY', t: 'Sway', a: 'Pablo Beltrán Ruiz', cats: ['coctel'], vertical: true, moment: 'drinks' },
  { id: 'NrulO39cCEw', t: 'Paradise', a: 'Coldplay', cats: ['coctel'], vertical: true, moment: 'party' },
  { id: 'fk1F9Vlq-d4', t: 'Fix You', a: 'Coldplay', cats: ['coctel', 'romantica'], vertical: true, moment: 'dinner' },
  { id: 'Tb4zu849liY', t: 'All You Need Is Love', a: 'The Beatles', cats: ['coctel'], vertical: true, moment: 'drinks' },
  { id: 'X2h4v1H_OtE', t: 'Non, je ne regrette rien', a: 'Édith Piaf', cats: ['coctel'], vertical: true, moment: 'drinks' },
];

// Depoimentos publicados em amadorviolin.com/booking (texto original, sem tradução).
// Briefing: "Ling Pham para pedidos musicais e Nohely Hernández para a passagem da cerimônia ao coquetel".
// A CONFIRMAR: autorização de uso de nome e texto com cada casal antes de publicar (briefing, prioridade alta).
const TESTIMONIALS = [
  {
    name: 'Nohely Hernández', lang: 'es', topic: { es: 'De la ceremonia al aperitivo', en: 'From ceremony to drinks' },
    text: 'Contratamos a Amador para nuestra boda y ha sido maravilloso!!! Le dio el toque romántico a la ceremonia y luego animó e hizo bailar a todos en el aperitivo. Sin duda ha sido todo un acierto y lo recomendamos muchísimo!',
  },
  {
    name: 'Ling Pham', lang: 'en', topic: { es: 'Canciones a medida', en: 'Song requests' },
    text: 'We absolutely loved having David play at our wedding! From the moment he started, he brought such incredible energy to the day and had our guests smiling, clapping, and even dancing along. He went above and beyond by learning new songs just for us — including a special Pokémon theme tune.',
  },
  {
    name: 'Sven & Shannon', lang: 'en', topic: { es: 'Boda internacional en Barcelona', en: 'Destination wedding in Barcelona' },
    text: 'David did our ceremony with his beautiful violin music. Our ceremony started late due to external circumstances and he was able to play and improvise and make it very nice. He was also always friendly and nice to communicate with.',
  },
];

module.exports = { SITE, CONTACT, CATS, VIDEOS, TESTIMONIALS };
