// Servidor local para testar o site em http://localhost:8080 (sem dependências).
// Os vídeos do YouTube só carregam em páginas http(s): abrindo os HTML direto do disco (file://) não carregam.
// O formulário precisa de PHP (api/enquiry.php): aqui ele responde com um envio simulado para testar a interface.
// Uso: npm run dev   (porta opcional: PORT=3000 npm run dev)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve('site');
const PORT = Number(process.env.PORT) || 8080;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
};

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (path.endsWith('enquiry.php') && req.method === 'POST') {
    // Simulação: ?fail no endereço da página de contato força o erro (para testar a mensagem de falha)
    const fail = (req.headers.referer || '').includes('fail');
    res.writeHead(fail ? 500 : 200, { 'Content-Type': 'application/json' }).end(JSON.stringify(fail ? { ok: false, error: 'simulated' } : { ok: true }));
    return;
  }
  let file = join(ROOT, path);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404');
  }
}).listen(PORT, () => console.log(`AMADOR • Violinist em http://localhost:${PORT}`));
