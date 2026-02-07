<?php
require_once __DIR__ . "/../db.php";

$data = json_in();
$phone = norm_phone((string)($data["phone"] ?? ""));
$pin   = norm_pin((string)($data["pin"] ?? ""));

if ($phone === "" || strlen($phone) < 6) fail(400, "Neplatné číslo/ID.");
if (strlen($pin) !== 4) fail(400, "PIN musí mít 4 čísla.");

$hash = password_hash($pin, PASSWORD_DEFAULT);

try {
  $stmt = db()->prepare("INSERT INTO planeo_users (phone, pin_hash) VALUES (?, ?)");
  $stmt->execute([$phone, $hash]);
} catch (Throwable $e) {
  // duplicitní phone
  fail(409, "Tenhle účet už existuje. Zkus přihlášení.");
}

// auto-login po registraci
$_SESSION["user_phone"] = $phone;

ok(["phone" => $phone]);
