<?php
require_once __DIR__ . "/db.php";

// jednoduchý cache (ať nevoláš planeo.cz pořád)
$cacheFile = __DIR__ . "/_cache_branches.json";
$cacheTtlSeconds = 24 * 60 * 60; // 24h

function fetchBranchesFromXml(): array {
  $xmlUrl = "https://www.planeo.cz/prodejny.xml";

  $xmlRaw = @file_get_contents($xmlUrl);
  if ($xmlRaw === false) fail(502, "Nepodařilo se stáhnout seznam poboček.");

  libxml_use_internal_errors(true);
  $xml = simplexml_load_string($xmlRaw);
  if ($xml === false) fail(502, "XML seznam poboček je rozbitej / nečitelný.");

  // ⚠️ Struktura XML se může lišit; níž je robustnější přístup:
  // projedeme všechny uzly a bereme ty, co vypadají jako "prodejna"
  $out = [];

  // pokus: často bývá <SHOP> nebo <STORE> apod.
  // vezmeme všechny elementy na 2. úrovni:
  foreach ($xml->children() as $node) {
    $name = trim((string)($node->NAME ?? $node->Name ?? $node->TITLE ?? $node->Title ?? ""));
    $city = trim((string)($node->CITY ?? $node->City ?? ""));
    $code = trim((string)($node->CODE ?? $node->Id ?? $node->ID ?? $node->id ?? ""));

    // fallback: když není code, uděláme slug z názvu
    if ($code === "" && $name !== "") {
      $code = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name));
      $code = trim($code, "-");
    }

    if ($name === "") continue;

    $label = $city ? ($name . " — " . $city) : $name;

    $out[] = [
      "code" => $code,
      "label" => $label,
      "name" => $name,
      "city" => $city
    ];
  }

  // když by XML mělo jinou strukturu a nic jsme nenašli:
  if (count($out) === 0) {
    fail(502, "Nepodařilo se z XML vytáhnout pobočky (změnila se struktura).");
  }

  // seřadit
  usort($out, fn($a,$b) => strcmp($a["label"], $b["label"]));

  return $out;
}

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTtlSeconds)) {
  $cached = json_decode(file_get_contents($cacheFile), true);
  ok(["branches" => $cached]);
}

$branches = fetchBranchesFromXml();
@mkdir(__DIR__ . "/_cache", 0777, true);
file_put_contents($cacheFile, json_encode($branches, JSON_UNESCAPED_UNICODE));

ok(["branches" => $branches]);
