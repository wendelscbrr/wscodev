<?php
/**
 * AMADOR • Violinist — recebe o formulário de consulta e envia ao e-mail de reservas.
 * Briefing R03: validação no servidor; a confirmação só aparece após aceite; em erro os dados permanecem.
 *
 * Hospedagem Apache/cPanel com PHP 7.4+. Configure abaixo:
 *  - TO: e-mail que recebe as consultas
 *  - FROM: um endereço do PRÓPRIO domínio do site (ex.: web@amadorviolin.com), senão o e-mail cai em spam
 * Se a hospedagem bloquear mail(), troque send_mail() por SMTP (PHPMailer) com as credenciais da conta.
 * Respostas: JSON {ok:true} / {ok:false,error} quando chamado pelo site (Accept: application/json);
 * sem JavaScript, redireciona de volta para a página com ?sent=1 ou ?error=1.
 */

const TO = 'amadorviolinist@gmail.com';
const FROM = 'web@amadorviolin.com';
const MIN_SECONDS_BETWEEN = 30; // anti-repetição por IP

header('X-Content-Type-Options: nosniff');
$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $error = '', int $code = 200): void {
  global $wantsJson;
  if ($wantsJson) {
    http_response_code($ok ? 200 : $code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
  } else {
    $back = strtok($_SERVER['HTTP_REFERER'] ?? '../', '?#');
    header('Location: ' . $back . ($ok ? '?sent=1' : '?error=1') . '#consulta', true, 303);
  }
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'method', 405);

// Honeypot: robôs preenchem o campo escondido — finge sucesso
if (!empty($_POST['website'])) respond(true);

$clean = fn($k, $max) => trim(mb_substr(str_replace(["\r", "\0"], '', (string)($_POST[$k] ?? '')), 0, $max));
$lang    = ($_POST['lang'] ?? 'es') === 'en' ? 'en' : 'es';
$name    = $clean('name', 120);
$email   = $clean('email', 160);
$tbc     = !empty($_POST['date_tbc']);
$date    = $clean('date', 10);
$city    = $clean('city', 120);
$venue   = $clean('venue', 160);
$type    = $clean('type', 20);
$message = trim(mb_substr((string)($_POST['message'] ?? ''), 0, 3000));
$page    = $clean('page', 80);

$types = ['wedding' => 'Boda / Wedding', 'hotel' => 'Hotel', 'corporate' => 'Empresa / Corporate', 'other' => 'Otro / Other'];
$errors = [];
if ($name === '') $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if (!$tbc && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) $errors[] = 'date';
if ($city === '') $errors[] = 'city';
if (!isset($types[$type])) $errors[] = 'type';
if ($errors) respond(false, 'invalid:' . implode(',', $errors), 422);

// Anti-repetição simples por IP (arquivo temporário)
$ipKey = sys_get_temp_dir() . '/amador_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
if (is_file($ipKey) && time() - filemtime($ipKey) < MIN_SECONDS_BETWEEN) respond(false, 'too_fast', 429);

$dateText = $tbc ? 'Por confirmar / To be confirmed' : date('d/m/Y', strtotime($date));
$subject = sprintf('Consulta web: %s · %s · %s', $types[$type], $dateText, $city);
$body = implode("\n", [
  'Nueva consulta desde la web (' . strtoupper($lang) . ')',
  '',
  'Nombre / Name: ' . $name,
  'Email: ' . $email,
  'Fecha / Date: ' . $dateText,
  'Ciudad / City: ' . $city,
  'Espacio / Venue: ' . ($venue !== '' ? $venue : '—'),
  'Tipo / Type: ' . $types[$type],
  '',
  'Mensaje / Message:',
  $message !== '' ? $message : '—',
  '',
  '—',
  'Página: ' . $page,
  'Enviado: ' . date('d/m/Y H:i'),
]);

function send_mail(string $to, string $subject, string $body, string $replyName, string $replyEmail): bool {
  $headers = [
    'From: AMADOR Violinist web <' . FROM . '>',
    'Reply-To: ' . mb_encode_mimeheader($replyName, 'UTF-8') . ' <' . $replyEmail . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
  ];
  return mail($to, mb_encode_mimeheader($subject, 'UTF-8'), $body, implode("\r\n", $headers), '-f' . FROM);
}

if (!send_mail(TO, $subject, $body, $name, $email)) respond(false, 'mail', 500);
@touch($ipKey);
respond(true);
