<?php
require_once __DIR__ . "/db.php";

$userId = $_SESSION["user_id"] ?? null;
if (!$userId) fail(401, "Nepřihlášen");

$stmt = db()->prepare("SELECT employee_id, branch_code, job_role FROM planeo_users WHERE employee_id = ? LIMIT 1");
$stmt->execute([$userId]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) fail(401, "Uživatel neexistuje");

ok([
  "id" => $row["employee_id"],
  "branch_code" => $row["branch_code"],
  "job_role" => $row["job_role"],
]);
