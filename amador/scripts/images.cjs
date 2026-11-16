// Gera as imagens do site a partir de raw/ (WebP comprimido, nos tamanhos usados no HTML).
// Uso: npm run images   (precisa de "sharp" — ver README.md)
// Fontes: raw/about.jpg = retrato publicado em amadorviolin.com · raw/yt/<id>-max|oar|hq.jpg = quadros dos vídeos
// do canal oficial youtube.com/@amadorviolin (max = 1280x720, oar = vertical 1080x1920, hq = 480x360 com tarjas).
// Quando o David enviar fotos profissionais de eventos, coloque-as em raw/ e acrescente linhas em PHOTOS.
const path = require('path');
const fs = require('fs');
let sharp;
try { sharp = require('sharp'); } catch { sharp = require(process.env.SHARP_PATH); }

const ROOT = path.resolve(__dirname, '..');
const RAW = path.join(ROOT, 'raw');
const OUT = path.join(ROOT, 'site/assets/img');
const { VIDEOS } = require('./data.cjs');

// [saída, origem, largura, altura, foco do recorte]
const PHOTOS = [
  ['hero', 'yt/NNFr4XZT9qk-max.jpg', 1280, 720, 'centre'],          // Montjuïc (Barcelona)
  ['hero-mobile', 'yt/8--TuyT-iLQ-oar.jpg', 540, 960, 'centre'],
  ['about', 'about.jpg', 880, 1100, 'west'],
  ['about-wide', 'yt/d048OehNS20-max.jpg', 1280, 720, 'centre'],
  ['boda-ceremonia', 'yt/Tm3OqASHnKY-oar.jpg', 600, 800, 'centre'],
  ['boda-coctel', 'yt/DkjeREtnxnc-oar.jpg', 600, 800, 'centre'],
  ['boda-recepcion', 'yt/3tqidZjH6o0-oar.jpg', 600, 800, 'centre'],
  ['eventos-hotel', 'yt/dkw0s1E76yY-oar.jpg', 600, 800, 'centre'],
  ['eventos-wide', 'yt/RIA_TDf-ov0-max.jpg', 1280, 720, 'centre'],
  ['violin-detalle', 'yt/Tb4zu849liY-oar.jpg', 720, 720, 'centre'],
  ['mar', 'yt/fk1F9Vlq-d4-oar.jpg', 600, 800, 'centre'],
  ['jardin', 'yt/8MivlHhSNkU-oar.jpg', 600, 800, 'centre'],
  ['castillo', 'yt/S3KkrPxuubY-oar.jpg', 600, 800, 'centre'],
  ['contacto', 'yt/bNyF-S0rXvU-max.jpg', 1280, 720, 'centre'],
];

async function photo([name, src, w, h, pos]) {
  await sharp(path.join(RAW, src)).rotate().resize(w, h, { fit: 'cover', position: pos }).webp({ quality: 74, effort: 6 }).toFile(path.join(OUT, 'photos', `${name}.webp`));
}

// Capas dos vídeos: horizontais 960x540, verticais (Shorts) 405x720.
// "hq" tem tarjas pretas em cima e embaixo: recorta o miolo 16:9 antes de ampliar.
async function cover(v) {
  const out = path.join(OUT, 'videos', `${v.id}.webp`);
  const max = path.join(RAW, 'yt', `${v.id}-max.jpg`);
  const oar = path.join(RAW, 'yt', `${v.id}-oar.jpg`);
  const hq = path.join(RAW, 'yt', `${v.id}-hq.jpg`);
  if (v.vertical) return sharp(oar).resize(405, 720, { fit: 'cover' }).webp({ quality: 72 }).toFile(out);
  if (fs.existsSync(max)) return sharp(max).resize(960, 540, { fit: 'cover' }).webp({ quality: 72 }).toFile(out);
  return sharp(hq).extract({ left: 0, top: 45, width: 480, height: 270 }).resize(960, 540).webp({ quality: 72 }).toFile(out);
}

// Monograma "A" sobre fundo escuro (ícones, favicon)
const mono = (s) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="${s > 64 ? 0 : 18}" fill="#0e0b0a"/>
  <path d="M50 14 L77 86 H66 L59.5 68 H40.5 L34 86 H23 Z M44 58 H56 L50 40 Z" fill="#d4894a"/>
  <line x1="18" y1="77" x2="82" y2="77" stroke="#f0e7da" stroke-width="1.6" opacity=".7"/>
</svg>`);

// ICO com PNG embutido (formato aceito por todos os navegadores atuais)
function ico(pngs) {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(([size, buf], i) => {
    const o = 6 + i * 16;
    head.writeUInt8(size >= 256 ? 0 : size, o); head.writeUInt8(size >= 256 ? 0 : size, o + 1);
    head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6);
    head.writeUInt32LE(buf.length, o + 8); head.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([head, ...pngs.map(([, b]) => b)]);
}

(async () => {
  fs.mkdirSync(path.join(OUT, 'photos'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'videos'), { recursive: true });
  await Promise.all(PHOTOS.map(photo));
  for (const v of VIDEOS) await cover(v);

  // Imagem de compartilhamento 1200x630 com assinatura
  const og = await sharp(path.join(RAW, 'yt/NNFr4XZT9qk-max.jpg')).resize(1200, 630, { fit: 'cover' }).modulate({ brightness: 0.8 }).toBuffer();
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset=".45" stop-color="#0e0b0a" stop-opacity="0"/><stop offset="1" stop-color="#0e0b0a" stop-opacity=".92"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="60" y="540" font-family="Impact, Arial Black, sans-serif" font-size="96" letter-spacing="6" fill="#f0e7da">AMADOR</text>
    <text x="64" y="585" font-family="Georgia, serif" font-style="italic" font-size="34" fill="#d4894a">Violinist · Barcelona · Madrid · Spain</text>
  </svg>`);
  await sharp(og).composite([{ input: label }]).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, 'og-image.jpg'));

  for (const [n, s] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
    await sharp(mono(s)).resize(s, s).png().toFile(path.join(OUT, n));
  }
  const p16 = await sharp(mono(16)).resize(16, 16).png().toBuffer();
  const p32 = await sharp(mono(32)).resize(32, 32).png().toBuffer();
  const p48 = await sharp(mono(48)).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'site/favicon.ico'), ico([[16, p16], [32, p32], [48, p48]]));
  console.log(`Imagens: ${PHOTOS.length} fotos, ${VIDEOS.length} capas, og-image e ícones`);
})().catch((e) => { console.error(e); process.exit(1); });
