// import { drizzle } from "drizzle-orm/better-sqlite3";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../db/schema";

console.log(`url : ${process.env.DATABASE_URL ?? ""}`);

const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL ?? "",
  },
  schema,
});

export default db;
