<?php
require_once __DIR__ . "/../db.php";

$data = json_in();

// phone = ID / telefon (jen čísla)
$userId = preg_replace('/\D/', '', (string)($data["phone"] ?? ""));
$pin    = preg_replace('/\D/', '', (string)($data["pin"] ?? ""));

// povolíme 3 až 10 číslic (sedí na krátký ID i telefon)
if (!preg_match('/^\d{3,10}$/', $userId)) fail(400, "Neplatné ID/telefon. Musí mít 3 až 10 číslic.");
if (!preg_match('/^\d{4}$/', $pin)) fail(400, "PIN musí mít přesně 4 číslice.");

$hash = password_hash($pin, PASSWORD_DEFAULT);

try {
  $stmt = db()->prepare("INSERT INTO planeo_users (phone, pin_hash) VALUES (?, ?)");
  $stmt->execute([$userId, $hash]);
} catch (Throwable $e) {
  fail(409, "Tenhle účet už existuje. Zkus přihlášení.");
}

// session
$_SESSION["user_id"] = $userId;

ok(["id" => $userId]);
