<#
  Manuel Cribaño · El Niño de Peñaflor — build sem Node (equivalente a "npm run build")
  1. Compila o Tailwind: src/input.css → build/style.css
  2. Coloca o CSS dentro do <style id="site-css"> de site/index.html e site/privacidad.html
  Uso:  powershell -ExecutionPolicy Bypass -File build.ps1
  Tailwind: "tailwindcss" do PATH ou tools/tailwindcss.exe (CLI standalone oficial v3.4.16)
#>
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$tw = (Get-Command tailwindcss -ErrorAction SilentlyContinue).Source
if (-not $tw) { $tw = Join-Path $PSScriptRoot 'tools\tailwindcss.exe' }
if (-not (Test-Path $tw)) { throw 'Tailwind CLI não encontrado: baixe tailwindcss-windows-x64.exe (v3.4.16) para tools\tailwindcss.exe' }

& $tw -c tailwind.config.js -i src/input.css -o build/style.css --minify
if ($LASTEXITCODE) { throw 'Falha ao compilar o Tailwind' }

$utf8 = New-Object System.Text.UTF8Encoding $false
# No CSS os caminhos são relativos a assets/css/; dentro do HTML passam a ser relativos à página
$css = [IO.File]::ReadAllText("$PSScriptRoot\build\style.css").Replace('../fonts/', 'assets/fonts/').Replace('../img/', 'assets/img/')
foreach ($page in 'site\index.html', 'site\privacidad.html') {
  $p = Join-Path $PSScriptRoot $page
  $html = [IO.File]::ReadAllText($p, [Text.Encoding]::UTF8)
  $re = [regex]'<style id="site-css">[\s\S]*?</style>'
  if (-not $re.IsMatch($html)) { throw "Bloco <style id=""site-css""> não encontrado em $page" }
  $html = $re.Replace($html, { param($m) "<style id=""site-css"">$css</style>" }, 1)
  [IO.File]::WriteAllText($p, $html, $utf8)
}
Write-Host ("CSS inline em index.html e privacidad.html: {0:N1} KB" -f ($css.Length / 1KB))
