<?php
require_once __DIR__ . "/../db.php";

$data = json_in();
$phone = norm_phone((string)($data["phone"] ?? ""));
$pin   = norm_pin((string)($data["pin"] ?? ""));

if ($phone === "" || strlen($phone) < 6) fail(400, "Neplatné číslo/ID.");
if (strlen($pin) !== 4) fail(400, "PIN musí mít 4 čísla.");

$stmt = db()->prepare("SELECT * FROM planeo_users WHERE phone = ? LIMIT 1");
$stmt->execute([$phone]);
$user = $stmt->fetch();

if (!$user) fail(401, "Špatné číslo nebo PIN.");
if (!password_verify($pin, $user["pin_hash"])) fail(401, "Špatné číslo nebo PIN.");

$_SESSION["user_phone"] = $phone;

ok(["phone" => $phone]);
