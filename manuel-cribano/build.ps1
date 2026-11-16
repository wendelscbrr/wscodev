<#
  Manuel Cribaño · El Niño de Peñaflor — build do site (sem Node)

  O que faz:
    1. Compila o Tailwind (src/input.css → site/assets/css/style.css)
    2. Monta cada página de src/pages/ com os blocos de src/partials/ (head, header, footer)
       e grava em site/<rota>/index.html
    3. Marca a página atual no menu e gera site/sitemap.xml

  Uso (PowerShell, na pasta do projeto):
    powershell -ExecutionPolicy Bypass -File build.ps1
    powershell -ExecutionPolicy Bypass -File build.ps1 -Watch     # recompila o CSS ao salvar (Ctrl+C para sair)

  Tailwind: usa "tailwindcss" do PATH ou, se não houver, tools/tailwindcss.exe
  (CLI standalone oficial v3.4.16 — github.com/tailwindlabs/tailwindcss/releases).

  Para mudar o endereço do site (domínio do artista), troque $SITE abaixo e em site/robots.txt.
#>
param([switch]$Watch)
$ErrorActionPreference = 'Stop'
$ROOT = $PSScriptRoot
$SITE = 'https://wscodev.com/manuel-cribano/site/'
$utf8 = New-Object System.Text.UTF8Encoding $false

function Read-Text($p) { [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8) }
function Write-Text($p, $s) { New-Item -ItemType Directory -Force (Split-Path $p) | Out-Null; [IO.File]::WriteAllText($p, $s, $utf8) }

# ---------- 1. CSS ----------
$tw = (Get-Command tailwindcss -ErrorAction SilentlyContinue).Source
if (-not $tw) { $tw = Join-Path $ROOT 'tools\tailwindcss.exe' }
if (-not (Test-Path $tw)) { throw "Tailwind CLI não encontrado. Baixe tailwindcss-windows-x64.exe (v3.4.16) para tools\tailwindcss.exe" }

# ---------- 2. Páginas ----------
function Build-Pages {
  $partials = @{}
  Get-ChildItem (Join-Path $ROOT 'src\partials') -Filter *.html | ForEach-Object { $partials[$_.BaseName] = Read-Text $_.FullName }
  $v = (Get-Date).ToString('yyMMddHHmm')
  $urls = @()

  foreach ($f in Get-ChildItem (Join-Path $ROOT 'src\pages') -Filter *.html) {
    $src = Read-Text $f.FullName
    # Cabeçalho da página: <!--@meta chave=valor ... @-->
    $m = [regex]::Match($src, '(?s)<!--@meta(.*?)@-->')
    if (-not $m.Success) { throw "Bloco <!--@meta ... @--> ausente em $($f.Name)" }
    $meta = @{}
    foreach ($line in $m.Groups[1].Value -split "`n") { if ($line -match '^\s*([\w-]+)\s*=\s*(.+?)\s*$') { $meta[$Matches[1]] = $Matches[2] } }
    $body = $src.Remove($m.Index, $m.Length)
    # Trecho extra para o <head> (dados estruturados, preload): <!--@head ... @-->
    $head = ''
    $h = [regex]::Match($body, '(?s)<!--@head(.*?)@-->')
    if ($h.Success) { $head = $h.Groups[1].Value.Trim(); $body = $body.Remove($h.Index, $h.Length) }

    $route = $meta['route']                       # '' para a página inicial, 'biografia/' etc.
    $out = if ($meta['file']) { $meta['file'] } else { "$($route)index.html" }
    $depth = ($out.Split('/').Count - 1)
    $rootRel = '../' * $depth
    $canonical = if ($meta['file']) { "$SITE$($meta['file'])" } else { "$SITE$route" }

    $html = $partials['head'] + "`n" + $partials['header'] + "`n" + $body.Trim() + "`n" + $partials['footer']
    $html = $html.Replace('{{head}}', $head)
    foreach ($k in 'title', 'description', 'key') { $html = $html.Replace("{{$k}}", [string]$meta[$k]) }
    $html = $html.Replace('{{canonical}}', $canonical).Replace('{{site}}', $SITE).Replace('{{root}}', $rootRel).Replace('{{v}}', $v)
    $html = $html.Replace('{{home}}', $(if ($rootRel) { $rootRel } else { './' }))
    # Página atual no menu
    $html = $html.Replace("data-nav=""$($meta['key'])""", "data-nav=""$($meta['key'])"" aria-current=""page""")
    if ($html -match '\{\{\w+\}\}') { throw "Marcador não substituído em $($f.Name): $($Matches[0])" }

    Write-Text (Join-Path $ROOT "site\$out") $html
    if ($meta['sitemap'] -ne 'no') { $urls += $canonical }
    Write-Host ("  {0,-26} → site/{1}" -f $f.Name, $out)
  }

  # ---------- 3. Sitemap ----------
  $today = (Get-Date).ToString('yyyy-MM-dd')
  $xml = "<?xml version=""1.0"" encoding=""UTF-8""?>`n<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">`n"
  foreach ($u in $urls) { $xml += "  <url><loc>$u</loc><lastmod>$today</lastmod></url>`n" }
  Write-Text (Join-Path $ROOT 'site\sitemap.xml') ($xml + "</urlset>`n")
}

Push-Location $ROOT
try {
  Write-Host 'Páginas:'
  Build-Pages
  Write-Host 'CSS:'
  if ($Watch) { & $tw -c tailwind.config.js -i src/input.css -o site/assets/css/style.css --watch }
  else {
    & $tw -c tailwind.config.js -i src/input.css -o site/assets/css/style.css --minify
    if ($LASTEXITCODE) { throw 'Falha ao compilar o Tailwind' }
    Write-Host ("  style.css: {0:N1} KB" -f ((Get-Item site/assets/css/style.css).Length / 1KB))
  }
} finally { Pop-Location }
