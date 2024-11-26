import { setTimeout as sleep } from "node:timers/promises";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
});

for (let i = 0; i < 100; i++) {
  console.debug(`[debug] DB: ${i}`);
  try {
    await db.query("SELECT 1");
    console.debug("[debug] DB: connected");
    break;
  } catch {
    await sleep(1000);
  }
}

try {
  await db.query("DROP TABLE IF EXISTS users");
  await db.query(
    `
    CREATE TABLE users (
      id INT AUTO_INCREMENT NOT NULL,
      name TEXT NOT NULL,
      balance BIGINT NOT NULL,
      PRIMARY KEY (id)
    )
  `.trim()
  );
  console.debug("[debug] DB: initialized");
} catch (err) {
  console.error(err);
  process.exit(1);
}

export default db;
