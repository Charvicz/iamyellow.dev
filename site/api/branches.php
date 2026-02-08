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

/**
 * FIX 1: některé uložené XML obsahuje text před prvním <tag>
 * (třeba: "Tento XML soubor nemá připojeny...")
 * -> ořízneme vše před prvním '<'
 */
$pos = strpos($xmlRaw, "<");
if ($pos !== false && $pos > 0) {
  $xmlRaw = substr($xmlRaw, $pos);
}

/**
 * FIX 2: v XML je HTML entita &nbsp; (není validní XML entita)
 * -> nahradíme mezerou
 */
$xmlRaw = str_replace("&nbsp;", " ", $xmlRaw);

// Parse
libxml_use_internal_errors(true);
$xml = simplexml_load_string($xmlRaw);

if ($xml === false) {
  $errs = libxml_get_errors();
  $first = $errs ? trim($errs[0]->message) : "unknown";
  libxml_clear_errors();
  fail(500, "Soubor prodejny.xml není validní XML: " . $first);
}

// Z XML chceme jen STORE/ID + STORE/NAME
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
    "label" => $name . " (" . $id . ")",
  ];
}

usort($out, fn($a, $b) => strcmp($a["name"], $b["name"]));

ok(["branches" => $out]);
