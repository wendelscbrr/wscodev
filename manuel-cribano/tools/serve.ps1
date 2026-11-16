<#
  Servidor local para testar o site em http://localhost:8080 (sem dependências).
  Os vídeos do YouTube só carregam em páginas http(s): abrindo os .html direto do disco (file://) eles não tocam.
  Uso:  powershell -ExecutionPolicy Bypass -File tools\serve.ps1 [-Port 8080]
#>
param([int]$Port = 8080)
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\site')).Path
$types = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.json'='application/json'; '.xml'='application/xml'; '.txt'='text/plain; charset=utf-8'; '.webp'='image/webp'; '.png'='image/png'; '.jpg'='image/jpeg'; '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.woff2'='font/woff2'; '.webmanifest'='application/manifest+json'; '.pdf'='application/pdf' }
$l = New-Object Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Host "Site de Manuel Cribaño em http://localhost:$Port  (Ctrl+C para sair)"
try {
  while ($l.IsListening) {
    $ctx = $l.GetContext(); $res = $ctx.Response
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    $file = [IO.Path]::GetFullPath((Join-Path $root $path.TrimStart('/')))
    if (-not $file.StartsWith($root)) { $res.StatusCode = 403; $res.Close(); continue }
    if (Test-Path $file -PathType Container) {
      if (-not $path.EndsWith('/')) { $res.Redirect($path + '/'); $res.Close(); continue }
      $file = Join-Path $file 'index.html'
    }
    if (Test-Path $file -PathType Leaf) {
      $bytes = [IO.File]::ReadAllBytes($file)
      $res.ContentType = $types[[IO.Path]::GetExtension($file).ToLower()]
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else { $res.StatusCode = 404 }
    $res.Close()
  }
} finally { $l.Stop() }
