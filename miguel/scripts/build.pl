#!/usr/bin/env perl
# Monta as páginas do site: src/layout.html + src/pages/*.html  →  site/<caminho>/index.html
# Também gera site/sitemap.xml. Sem dependências (o Perl já vem com o Git for Windows).
# Uso (na pasta miguel/):   perl scripts/build.pl
#
# Cada página em src/pages começa com um bloco <!--meta ... --> (título, descrição, caminho, item de menu)
# e pode ter um bloco <!--head ... --> com dados estruturados (JSON-LD) próprios.
# Tokens disponíveis nas páginas: {{R}} (prefixo relativo até a raiz do site), {{WA}}, {{EMAIL}}, {{IG}}, {{IG_HANDLE}}, {{PHONE}}, {{SITE}}
use strict;
use warnings;
use utf8;
use File::Basename qw(dirname);
use File::Path qw(make_path);
use POSIX qw(strftime);

# ---- Dados do artista (briefing) — ao mudar aqui, mude também em site/assets/js/main.js ----
my $SITE      = 'https://wscodev.vercel.app/miguel/site/';
my $WA_NUMBER = '34654578928';
my $PHONE     = '+34 654 57 89 28';
my $EMAIL     = 'pianistamiguelangel@gmail.com';
my $IG_HANDLE = 'el_pianista_miguel';
my $IG        = "https://www.instagram.com/$IG_HANDLE/";

# Menu: [caminho, rótulo, chave]
my @NAV = (
  ['',              'Inicio',              'inicio'],
  ['sobre-miguel/', 'Sobre Miguel',        'sobre'],
  ['bodas/',        'Bodas',               'bodas'],
  ['eventos/',      'Eventos',             'eventos'],
  ['repertorio/',   'Repertorio y vídeos', 'repertorio'],
  ['contacto/',     'Contacto',            'contacto'],
);

chdir dirname(__FILE__) . '/..' or die "Não achei a pasta do projeto\n";

sub slurp { my ($p) = @_; open my $fh, '<:encoding(UTF-8)', $p or die "$p: $!\n"; local $/; my $s = <$fh>; close $fh; $s }
sub spew  { my ($p, $s) = @_; make_path(dirname($p)); open my $fh, '>:encoding(UTF-8)', $p or die "$p: $!\n"; print $fh $s; close $fh }

my $layout = slurp('src/layout.html');
my $today  = strftime('%Y-%m-%d', localtime);
my @sitemap;

for my $src (sort glob 'src/pages/*.html') {
  my $raw = slurp($src);
  $raw =~ s/\A\s*<!--meta\s*\n(.*?)\n-->\s*\n//s or die "Bloco <!--meta--> ausente em $src\n";
  my %m = map { /^\s*(\w+)\s*:\s*(.*?)\s*$/ ? ($1, $2) : () } split /\n/, $1;
  my $head = ($raw =~ s/<!--head\s*\n(.*?)\n-->\s*\n//s) ? $1 : '';
  for (qw(title description nav)) { die "Campo '$_' ausente no meta de $src\n" unless defined $m{$_} }

  my $path = $m{path} // '';
  my $R = '../' x scalar(() = $path =~ m{/}g);
  my $canon = $SITE . $path;

  my ($nav, $menu, $foot) = ('', '', '');
  my $i = 0;
  for my $n (@NAV) {
    my ($p, $label, $key) = @$n;
    my $cur = $key eq $m{nav} ? ' aria-current="page"' : '';
    my $href = $R . $p; $href = './' if $href eq '';
    $nav  .= qq{        <a href="$href"$cur>$label</a>\n};
    $menu .= sprintf qq{      <a href="%s"%s><small>%02d</small>%s</a>\n}, $href, $cur, ++$i, $label;
    $foot .= qq{            <li><a href="$href">$label</a></li>\n};
  }
  chomp($nav, $menu, $foot);

  my $preload = '';
  if ($m{preload}) {
    for my $item (split /\s*,\s*/, $m{preload}) {
      my ($file, $media) = split /\s*\|\s*/, $item;
      my $mattr = $media ? qq{ media="$media"} : '';
      $preload .= qq{  <link rel="preload" as="image" href="$R$file"$mattr fetchpriority="high">\n};
    }
    chomp $preload;
  }

  my %tok = (
    TITLE => $m{title}, DESC => $m{description}, CANON => $canon, SITE => $SITE, R => $R,
    ROBOTS => $m{robots} // 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    HEAD => $head, PRELOAD => $preload, NAV => $nav, MENU => $menu, FOOTNAV => $foot, PAGE => $m{nav},
    WA => "https://wa.me/$WA_NUMBER", PHONE => $PHONE, EMAIL => $EMAIL, IG => $IG, IG_HANDLE => $IG_HANDLE,
  );
  my $html = $layout;
  $html =~ s/\{\{BODY\}\}/$raw/;
  # Duas passadas: o corpo da página também usa tokens
  for (1 .. 2) { $html =~ s/\{\{(\w+)\}\}/exists $tok{$1} ? $tok{$1} : die "Token {{$1}} desconhecido em $src\n"/ge }
  $html =~ s{href=""}{href="./}g; # link para a raiz a partir da própria raiz

  my $out = 'site/' . $path . 'index.html';
  spew($out, $html);
  push @sitemap, [$canon, $m{priority} // '0.8', $m{changefreq} // 'monthly'] unless ($m{robots} // '') =~ /noindex/;
  printf "  %-34s %s\n", $out, $m{title};
}

my $xml = qq{<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n};
$xml .= qq{  <url>\n    <loc>$_->[0]</loc>\n    <lastmod>$today</lastmod>\n    <changefreq>$_->[2]</changefreq>\n    <priority>$_->[1]</priority>\n  </url>\n} for sort { $b->[1] <=> $a->[1] } @sitemap;
$xml .= "</urlset>\n";
spew('site/sitemap.xml', $xml);
print "  site/sitemap.xml (" . scalar(@sitemap) . " URLs)\n";
