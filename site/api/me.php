<?php
require_once __DIR__ . "/db.php";

$userId = $_SESSION["user_id"] ?? null;
if (!$userId) fail(401, "Nepřihlášen");

ok(["id" => $userId]);
