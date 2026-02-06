<?php
function db() {
  static $pdo = null;
  if ($pdo) return $pdo;

  $path = __DIR__ . "/data.sqlite";
  $pdo = new PDO("sqlite:" . $path);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // users
  $pdo->exec("CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    pin_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  )");

  // sales
  $pdo->exec("CREATE TABLE IF NOT EXISTS sales (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    ts INTEGER NOT NULL,
    price INTEGER NOT NULL,
    mm INTEGER NOT NULL DEFAULT 0,
    prisko INTEGER NOT NULL DEFAULT 0,
    splatky INTEGER NOT NULL DEFAULT 0,
    pz_code TEXT NULL,
    pz_price INTEGER NULL,
    pz_category TEXT NULL
  )");

  $pdo->exec("CREATE INDEX IF NOT EXISTS sales_user_ts_idx ON sales(user_id, ts)");
  return $pdo;
}
