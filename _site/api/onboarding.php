<?php
require_once __DIR__ . "/db.php";

$userId = $_SESSION["user_id"] ?? null;
if (!$userId) fail(401, "Nepřihlášen");

$data = json_in();

// bereme nové klíče z frontendu
$branchId = trim((string)($data["branch_id"] ?? ""));
$role     = trim((string)($data["job_role"] ?? ""));

$allowedRoles = ["vedouci","zastupce","admin","prodavac","logistik","jine"];

if ($branchId === "" || !ctype_digit($branchId)) fail(400, "Vyber pobočku.");
if (!in_array($role, $allowedRoles, true)) fail(400, "Neplatná pozice.");

// 1) primárně ukládej do branch_id (INT)
try {
  $stmt = db()->prepare("UPDATE planeo_users SET branch_id = ?, job_role = ? WHERE employee_id = ? LIMIT 1");
  $stmt->execute([(int)$branchId, $role, $userId]);

  ok(["saved" => true]);
} catch (Throwable $e) {
  // 2) fallback: když bys branch_id v DB ještě neměl, uložíme to aspoň do branch_code
  $stmt = db()->prepare("UPDATE planeo_users SET branch_code = ?, job_role = ? WHERE employee_id = ? LIMIT 1");
  $stmt->execute([$branchId, $role, $userId]);

  ok(["saved" => true, "fallback" => "branch_code"]);
}
