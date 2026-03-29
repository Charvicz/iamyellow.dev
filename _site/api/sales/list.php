<?php
require_once __DIR__ . "/../_util.php";
require_once __DIR__ . "/../db.php";

$userId = require_auth();
$month = $_GET["month"] ?? ""; // YYYY-MM

if (!preg_match('/^\d{4}-\d{2}$/', $month)) err(400, ["error" => "bad_month"]);

$start = strtotime($month . "-01 00:00:00");
$end = strtotime($month . "-01 00:00:00 +1 month");

$pdo = db();
$st = $pdo->prepare("SELECT * FROM sales WHERE user_id = ? AND ts >= ? AND ts < ? ORDER BY ts DESC");
$st->execute([$userId, $start, $end]);

$rows = $st->fetchAll(PDO::FETCH_ASSOC);
ok(["entries" => $rows]);
