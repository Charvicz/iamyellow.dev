<?php
require_once __DIR__ . "/../_util.php";
require_once __DIR__ . "/../db.php";

$in = json_in();
$userId = $in["userId"] ?? "";
$pin = $in["pin"] ?? "";

if (!valid_user_id($userId) || !valid_pin($pin)) err(400, ["error" => "bad_input"]);

$pdo = db();
$st = $pdo->prepare("SELECT pin_hash FROM users WHERE user_id = ?");
$st->execute([$userId]);
$row = $st->fetch(PDO::FETCH_ASSOC);
if (!$row) err(401, ["error" => "invalid"]);

if (!password_verify($pin, $row["pin_hash"])) err(401, ["error" => "invalid"]);

$_SESSION["user_id"] = $userId;
ok(["userId" => $userId]);
