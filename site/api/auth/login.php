<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/../db.php";

$data = json_in();

$userId = preg_replace('/\D/', '', (string)($data["phone"] ?? ""));
$pin    = preg_replace('/\D/', '', (string)($data["pin"] ?? ""));

if (!preg_match('/^\d{3,10}$/', $userId)) fail(400, "Neplatné ID/telefon. Musí mít 3 až 10 číslic.");
if (!preg_match('/^\d{4}$/', $pin)) fail(400, "PIN musí mít přesně 4 číslice.");

$stmt = db()->prepare("SELECT pin_hash FROM planeo_users WHERE phone = ? LIMIT 1");
$stmt->execute([$userId]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) fail(401, "Špatné ID nebo PIN.");
if (!password_verify($pin, $row["pin_hash"])) fail(401, "Špatné ID nebo PIN.");

// session
$_SESSION["user_id"] = $userId;

ok(["id" => $userId]);
