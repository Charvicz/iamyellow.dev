<?php
require_once __DIR__ . "/../_util.php";
require_once __DIR__ . "/../db.php";

$me = require_auth();

$month = $_GET["month"] ?? "";
$type  = $_GET["type"] ?? "total_amount"; // total_amount | mm_amount | mm_count | pz_count | pz_amount
$scope = $_GET["scope"] ?? "all";         // all | branch (volitelné)

if (!preg_match('/^\d{4}-\d{2}$/', $month)) err(400, ["error" => "bad_month"]);

$start = strtotime($month . "-01 00:00:00");
$end   = strtotime($month . "-01 00:00:00 +1 month");

$allowedTypes = ["total_amount","mm_amount","mm_count","pz_count","pz_amount"];
if (!in_array($type, $allowedTypes, true)) err(400, ["error" => "bad_type"]);

$pdo = db();

// zjistíme moji pobočku (kvůli scope=branch)
$myBranchId = null;
if ($scope === "branch") {
  $st = $pdo->prepare("SELECT branch_id FROM planeo_users WHERE employee_id = ? LIMIT 1");
  $st->execute([$me]);
  $myBranchId = $st->fetchColumn();
  if (!$myBranchId) err(400, ["error" => "no_branch"]);
}

// metricy + order
$metricExpr = [
  "total_amount" => "SUM(s.price)",
  "mm_amount"    => "SUM(CASE WHEN s.mm=1 THEN s.price ELSE 0 END)",
  "mm_count"     => "SUM(CASE WHEN s.mm=1 THEN 1 ELSE 0 END)",
  "pz_count"     => "SUM(CASE WHEN s.pz_code IS NOT NULL OR s.pz_price IS NOT NULL THEN 1 ELSE 0 END)",
  "pz_amount"    => "SUM(COALESCE(s.pz_price,0))",
];
$orderExpr = $metricExpr[$type] . " DESC";

$where = "s.ts >= ? AND s.ts < ?";
$params = [$start, $end];

if ($scope === "branch") {
  $where .= " AND u.branch_id = ?";
  $params[] = (int)$myBranchId;
}

$sql = "
  SELECT
    s.user_id,
    u.branch_id,
    COUNT(*) as sales_count,
    SUM(s.price) as total_amount,
    SUM(CASE WHEN s.mm=1 THEN s.price ELSE 0 END) as mm_amount,
    SUM(CASE WHEN s.mm=1 THEN 1 ELSE 0 END) as mm_count,
    SUM(CASE WHEN s.pz_code IS NOT NULL OR s.pz_price IS NOT NULL THEN 1 ELSE 0 END) as pz_count,
    SUM(COALESCE(s.pz_price,0)) as pz_amount
  FROM sales s
  LEFT JOIN planeo_users u ON u.employee_id = s.user_id
  WHERE $where
  GROUP BY s.user_id, u.branch_id
  ORDER BY $orderExpr, s.user_id ASC
  LIMIT 100
";

$st = $pdo->prepare($sql);
$st->execute($params);
$rows = $st->fetchAll(PDO::FETCH_ASSOC);

ok([
  "me" => $me,
  "type" => $type,
  "scope" => $scope,
  "rows" => $rows
]);
