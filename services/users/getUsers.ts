import { db } from "@/lib/database";

export async function getUsers() {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}
