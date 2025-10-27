import { db } from "@/lib/database";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const [result] = await db.query(
    "INSERT INTO users (name, age, email, password) VALUES ('Cristiano', '39', ?, ?)",
    [email, password]
  );

  const insertId = (result as any)?.insertId ?? null;
  return insertId;
}
