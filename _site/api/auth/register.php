<?php
require_once __DIR__ . "/../db.php";

$data = json_in();
$userId = preg_replace('/\D/', '', (string)($data["phone"] ?? "")); // klidně to přejmenujem později
$pin    = preg_replace('/\D/', '', (string)($data["pin"] ?? ""));

if (!preg_match('/^\d{3,5}$/', $userId)) fail(400, "ID musí mít 3 až 5 číslic.");
if (!preg_match('/^\d{4}$/', $pin)) fail(400, "PIN musí mít přesně 4 číslice.");

$hash = password_hash($pin, PASSWORD_DEFAULT);

try {
  $stmt = db()->prepare("INSERT INTO planeo_users (phone, pin_hash) VALUES (?, ?)");
  $stmt->execute([$userId, $hash]);
} catch (Throwable $e) {
  fail(409, "Tenhle účet už existuje. Zkus přihlášení.");
}

$_SESSION["user_id"] = $userId;

ok(["id" => $userId]);
