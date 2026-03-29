<?php
require_once __DIR__ . "/db.php";

$xmlPath = __DIR__ . "/data/prodejny.xml";
if (!file_exists($xmlPath)) {
  fail(500, "Chybí soubor api/data/prodejny.xml");
}

$xmlRaw = file_get_contents($xmlPath);
if ($xmlRaw === false || trim($xmlRaw) === "") {
  fail(500, "Soubor prodejny.xml nejde přečíst nebo je prázdný.");
}

/**
 * FIX: když je před XML normální text (např. "Tento XML soubor...")
 * ořízneme vše před prvním '<'
 */
$pos = strpos($xmlRaw, "<");
if ($pos !== false && $pos > 0) {
  $xmlRaw = substr($xmlRaw, $pos);
}

/**
 * FIX: XML nesnáší HTML entity jako &nbsp;
 */
$xmlRaw = str_replace("&nbsp;", " ", $xmlRaw);

// Parse XML
libxml_use_internal_errors(true);
$xml = simplexml_load_string($xmlRaw);

if ($xml === false) {
  $errs = libxml_get_errors();
  $first = $errs ? trim($errs[0]->message) : "unknown";
  libxml_clear_errors();
  fail(500, "XML nejde parsovat: " . $first);
}

// Ověření statusu (volitelný, ale fajn)
$status = trim((string)($xml->status ?? ""));
if ($status !== "" && strtoupper($status) !== "OK") {
  fail(502, "XML status není OK: " . $status);
}

// Přesně podle struktury: response -> STORES -> STORE
$stores = $xml->xpath("/response/STORES/STORE");
if (!$stores || count($stores) === 0) {
  // fallback, kdyby byl jiný root
  $stores = $xml->xpath("//STORES/STORE");
}
if (!$stores || count($stores) === 0) {
  fail(500, "Nenašel jsem žádné STORE záznamy v XML.");
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

// seřadit podle názvu
usort($out, fn($a, $b) => strcmp($a["name"], $b["name"]));

ok(["branches" => $out]);
