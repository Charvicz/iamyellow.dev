<?php
require_once __DIR__ . "/db.php";

$phone = $_SESSION["user_phone"] ?? null;
if (!$phone) fail(401, "Not logged in");

ok(["phone" => $phone]);
