<?php
// CORS (pokud je frontend na stejném doméně, může být i bez toho)
// ale nech to tu, ať fetch funguje stabilně.
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: https://iamyellow.dev");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit;
}

session_set_cookie_params([
  "lifetime" => 60 * 60 * 24 * 30,
  "path" => "/",
  "secure" => true,
  "httponly" => true,
  "samesite" => "Lax",
]);
session_start();

function json_in() {
  $raw = file_get_contents("php://input");
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function ok($data = []) {
  echo json_encode(array_merge(["ok" => true], $data));
  exit;
}

function err($code, $data = []) {
  http_response_code($code);
  echo json_encode(array_merge(["ok" => false], $data));
  exit;
}

function require_auth() {
  if (!isset($_SESSION["user_id"])) err(401, ["error" => "not_auth"]);
  return $_SESSION["user_id"];
}

function valid_user_id($s) {
  return preg_match('/^\d{3,10}$/', strval($s ?? ""));
}
function valid_pin($s) {
  return preg_match('/^\d{4}$/', strval($s ?? ""));
}
