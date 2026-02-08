<?php
require_once __DIR__ . "/db.php";

$xmlPath = __DIR__ . "/data/prodejny.xml";
if (!file_exists($xmlPath)) {
  fail(500, "Chybí soubor prodejny.xml. Nahraj ho do api/data/prodejny.xml");
}

$xmlRaw = file_get_contents($xmlPath);
if ($xmlRaw === false || trim($xmlRaw) === "") {
  fail(500, "Soubor prodejny.xml nejde přečíst nebo je prázdný.");
}

libxml_use_internal_errors(true);
$xml = simplexml_load_string($xmlRaw);
if ($xml === false) {
  fail(500, "Soubor prodejny.xml není validní XML.");
}

$stores = $xml->xpath("//STORE");
if (!$stores || count($stores) === 0) {
  fail(500, "V XML jsem nenašel žádné <STORE> záznamy.");
}

$out = [];
foreach ($stores as $s) {
  $id = trim((string)($s->ID ?? ""));
  $name = trim((string)($s->NAME ?? ""));

  if ($id === "" || $name === "") continue;

  $out[] = [
    "id" => $id,
    "name" => $name,
    // label pro select (užitečný do UI)
    "label" => $name . " (" . $id . ")",
  ];
}

// seřadíme podle názvu
usort($out, fn($a, $b) => strcmp($a["name"], $b["name"]));

ok(["branches" => $out]);
