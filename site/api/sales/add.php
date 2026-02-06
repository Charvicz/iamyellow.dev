<?php
require_once __DIR__ . "/../_util.php";
require_once __DIR__ . "/../db.php";

$userId = require_auth();
$in = json_in();

$id = $in["id"] ?? bin2hex(random_bytes(16));
$ts = intval($in["ts"] ?? time());
$price = intval($in["price"] ?? 0);

$pillars = $in["pillars"] ?? [];
$mm = !empty($pillars["mm"]) ? 1 : 0;
$prisko = !empty($pillars["prisko"]) ? 1 : 0;
$splatky = !empty($pillars["splatky"]) ? 1 : 0;

$pz = $in["pz"] ?? null;
$pz_code = $pz["code"] ?? null;
$pz_price = isset($pz["pzPrice"]) ? intval($pz["pzPrice"]) : null;
$pz_category = $pz["category"] ?? null;

if ($price <= 0) err(400, ["error" => "bad_price"]);

$pdo = db();
$st = $pdo->prepare("INSERT OR REPLACE INTO sales
  (id, user_id, ts, price, mm, prisko, splatky, pz_code, pz_price, pz_category)
  VALUES (?,?,?,?,?,?,?,?,?,?)");
$st->execute([$id, $userId, $ts, $price, $mm, $prisko, $splatky, $pz_code, $pz_price, $pz_category]);

ok(["id" => $id]);
