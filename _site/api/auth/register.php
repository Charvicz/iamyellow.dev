<?php
require_once __DIR__ . "/../db.php";

$data = json_in();

// pracovní ID (4–5 číslic)
$userId = trim((string)($data["id"] ?? ""));
$pin    = trim((string)($data["pin"] ?? ""));

if (!preg_match('/^\d{4,5}$/', $userId)) {
  fail(400, "Neplatné ID. Musí mít 4 nebo 5 číslic.");
}

if (!preg_match('/^\d{4}$/', $pin)) {
  fail(400, "PIN musí mít přesně 4 číslice.");
}

$hash = password_hash($pin, PASSWORD_DEFAULT);

try {
  $stmt = db()->prepare(
    "INSERT INTO planeo_users (id, pin_hash) VALUES (?, ?)"
  );
  $stmt->execute([$userId, $hash]);
} catch (Throwable $e) {
  fail(409, "Tohle ID už existuje.");
}

$_SESSION["user_id"] = $userId;

ok(["id" => $userId]);
