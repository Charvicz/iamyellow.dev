<?php
// site/api/db.php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$DB_HOST = "localhost";
$DB_NAME = "TVE_DB_JMENO";
$DB_USER = "TVUJ_DB_USER";
$DB_PASS = "TVE_DB_HESLO";

function db(): PDO {
  global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS;
  static $pdo = null;
  if ($pdo) return $pdo;

  $pdo = new PDO(
    "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4",
    $DB_USER,
    $DB_PASS,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
  );
  return $pdo;
}

function json_in(): array {
  $raw = file_get_contents("php://input");
  $data = json_decode($raw ?: "{}", true);
  return is_array($data) ? $data : [];
}

function fail(int $code, string $msg): void {
  http_response_code($code);
  echo json_encode(["ok"=>false, "error"=>$msg], JSON_UNESCAPED_UNICODE);
  exit;
}

function ok(array $data = []): void {
  echo json_encode(["ok"=>true] + $data, JSON_UNESCAPED_UNICODE);
  exit;
}

function norm_phone(string $s): string {
  // necháme jen čísla, max basic
  $digits = preg_replace('/\D+/', '', $s);
  return $digits ?? "";
}

function norm_pin(string $s): string {
  $digits = preg_replace('/\D+/', '', $s);
  return $digits ?? "";
}

session_start();
