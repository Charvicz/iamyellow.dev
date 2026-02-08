<?php
declare(strict_types=1);

session_start();

function ok($data = []) {
  header("Content-Type: application/json; charset=utf-8");
  echo json_encode(["ok" => true] + $data);
  exit;
}

function fail($code, $msg) {
  http_response_code($code);
  header("Content-Type: application/json; charset=utf-8");
  echo json_encode(["ok" => false, "error" => $msg]);
  exit;
}

function json_in() {
  $raw = file_get_contents("php://input");
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;

  $host = "TVUJ_DB_HOST";
  $name = "TVUJ_DB_NAME";
  $user = "TVUJ_DB_USER";
  $pass = "TVUJ_DB_PASS";

  $pdo = new PDO(
    "mysql:host=$host;dbname=$name;charset=utf8mb4",
    $user,
    $pass,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
  return $pdo;
}
