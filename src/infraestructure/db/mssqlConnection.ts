import * as dotenv from "dotenv";
import * as sql from "mssql";

dotenv.config();

const sqlConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "localhost\\SQLEXPRESS",
  database: process.env.DB_NAME || "bin",
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: (process.env.DB_TRUST_CERT ?? "true") === "true",
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) return pool;
  pool = await new sql.ConnectionPool(sqlConfig).connect();
  console.log("✅ Conectado a SQL Server");
  return pool;
}
