import { db } from "@/lib/connections/database";
import { RowDataPacket } from "mysql2";

interface MySQLUser extends RowDataPacket {
  id: number;
  name: string;
  age: string;
  email: string;
  password: string;
}

export async function getSpecificUserByEmail(email: string) {
  const [rows] = await db.query<MySQLUser[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0] ?? null;
}
