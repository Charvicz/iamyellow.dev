<?php
require_once __DIR__ . "/_util.php";
require_once __DIR__ . "/db.php";

$userId = require_auth();
$month = $_GET["month"] ?? "";
$sort = $_GET["sort"] ?? "pz"; // pz | revenue | mm

if (!preg_match('/^\d{4}-\d{2}$/', $month)) err(400, ["error" => "bad_month"]);

$start = strtotime($month . "-01 00:00:00");
$end = strtotime($month . "-01 00:00:00 +1 month");

$orderBy = "pz_value DESC";
if ($sort === "revenue") $orderBy = "revenue DESC";
if ($sort === "mm") $orderBy = "mm_value DESC";

$pdo = db();
$sql = "
  SELECT
    user_id,
    COUNT(*) as sales_count,
    SUM(price) as revenue,
    SUM(CASE WHEN mm=1 THEN price ELSE 0 END) as mm_value,
    SUM(COALESCE(pz_price,0)) as pz_value,
    SUM(CASE WHEN splatky=1 THEN price ELSE 0 END) as splatky_value
  FROM sales
  WHERE ts >= ? AND ts < ?
  GROUP BY user_id
  ORDER BY $orderBy
  LIMIT 50
";
$st = $pdo->prepare($sql);
$st->execute([$start, $end]);
$rows = $st->fetchAll(PDO::FETCH_ASSOC);

ok(["rows" => $rows, "me" => $userId]);
