<?php
require_once __DIR__ . "/../db.php";

$data = json_in();
$userId = preg_replace('/\D/', '', (string)($data["phone"] ?? ""));
$pin    = preg_replace('/\D/', '', (string)($data["pin"] ?? ""));

if (!preg_match('/^\d{3,5}$/', $userId)) fail(400, "ID musí mít 3 až 5 číslic.");
if (!preg_match('/^\d{4}$/', $pin)) fail(400, "PIN musí mít přesně 4 číslice.");

$stmt = db()->prepare("SELECT pin_hash FROM planeo_users WHERE phone = ? LIMIT 1");
$stmt->execute([$userId]);
$row = $stmt->fetch();

if (!$row) fail(401, "Špatné ID nebo PIN.");
if (!password_verify($pin, $row["pin_hash"])) fail(401, "Špatné ID nebo PIN.");

$_SESSION["user_id"] = $userId;

ok(["id" => $userId]);
