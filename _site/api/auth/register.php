<?php
require_once __DIR__ . "/../db.php";

$data = json_in();

// ID uživatele (3–5 číslic)
$userId = preg_replace('/\D/', '', (string)($data["phone"] ?? ""));
$pin    = preg_replace('/\D/', '', (string)($data["pin"] ?? ""));

// validace ID
if (!preg_match('/^\d{3,5}$/', $userId)) {
  fail(400, "ID musí mít 3 až 5 číslic.");
}

// validace PINu
if (!preg_match('/^\d{4}$/', $pin)) {
  fail(400, "PIN musí mít přesně 4 číslice.");
}

$hash = password_hash($pin, PASSWORD_DEFAULT);

try {
  $stmt = db()->prepare(
    "INSERT INTO planeo_users (phone, pin_hash) VALUES (?, ?)"
  );
  $stmt->execute([$userId, $hash]);
} catch (Throwable $e) {
  // duplicitní ID
  fail(409, "Tenhle účet už existuje. Zkus přihlášení.");
}

// auto-login po registraci
$_SESSION["user_id"] = $userId;

ok(["id" => $userId]);
