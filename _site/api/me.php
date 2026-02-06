<?php
require_once __DIR__ . "/_util.php";
$userId = require_auth();
ok(["userId" => $userId]);
