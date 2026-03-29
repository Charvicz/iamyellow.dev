<?php
require_once __DIR__ . "/../db.php";

$data = json_in();

$employeeId = trim((string)($data["id"] ?? ""));
$pin        = trim((string)($data["pin"] ?? ""));

if (!preg_match('/^\d{4,5}$/', $employeeId)) {
  fail(400, "Neplatné ID. Musí mít 4 nebo 5 číslic.");
}

if (!preg_match('/^\d{4}$/', $pin)) {
  fail(400, "PIN musí mít přesně 4 číslice.");
}

$stmt = db()->prepare("SELECT pin_hash FROM planeo_users WHERE employee_id = ? LIMIT 1");
$stmt->execute([$employeeId]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row || !password_verify($pin, $row["pin_hash"])) {
  fail(401, "Špatné ID nebo PIN.");
}

$_SESSION["user_id"] = $employeeId;

ok(["id" => $employeeId]);
