<?php
require_once __DIR__ . "/db.php";

$userId = $_SESSION["user_id"] ?? null;
if (!$userId) fail(401, "Nepřihlášen");

$data = json_in();

$branch = trim((string)($data["branch_code"] ?? ""));
$role   = trim((string)($data["job_role"] ?? ""));

$allowedRoles = ["vedouci","zastupce","admin","prodavac","logistik","jine"];

if ($branch === "") fail(400, "Vyber pobočku.");
if (!in_array($role, $allowedRoles, true)) fail(400, "Neplatná pozice.");

$stmt = db()->prepare("UPDATE planeo_users SET branch_code = ?, job_role = ? WHERE employee_id = ? LIMIT 1");
$stmt->execute([$branch, $role, $userId]);

ok(["saved" => true]);
