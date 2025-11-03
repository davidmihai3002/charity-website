import { db } from "@/lib/connections/database";

export async function createUser({
  name,
  age,
  email,
  password,
}: {
  name: string;
  age: string;
  email: string;
  password: string;
}) {
  const [result] = await db.query(
    "INSERT INTO users (name, age, email, password) VALUES (?, ?, ?, ?)",
    [name, age, email, password]
  );

  const insertId = (result as any)?.insertId ?? null;
  return insertId;
}
