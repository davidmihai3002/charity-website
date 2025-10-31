import { db } from "@/lib/connections/database";

export async function getUsers() {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}
