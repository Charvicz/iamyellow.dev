<?php
require_once __DIR__ . "/../_util.php";
require_once __DIR__ . "/../db.php";

$in = json_in();
$userId = $in["userId"] ?? "";
$pin = $in["pin"] ?? "";

if (!valid_user_id($userId)) err(400, ["error" => "bad_userId"]);
if (!valid_pin($pin)) err(400, ["error" => "bad_pin"]);

$pdo = db();

// už existuje?
$st = $pdo->prepare("SELECT user_id FROM users WHERE user_id = ?");
$st->execute([$userId]);
if ($st->fetch()) err(409, ["error" => "exists"]);

// hash PINu
$hash = password_hash($pin, PASSWORD_DEFAULT);

$st = $pdo->prepare("INSERT INTO users(user_id, pin_hash, created_at) VALUES(?,?,?)");
$st->execute([$userId, $hash, date("c")]);

$_SESSION["user_id"] = $userId;
ok(["userId" => $userId]);
