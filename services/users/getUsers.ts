import { db } from "@/lib/connections/database";
import { User } from "@/lib/types/UserTypes";
import { RowDataPacket } from "mysql2";

interface MySQLUser extends RowDataPacket {
  id: number;
  name: string;
  age: string;
  email: string;
  password: string;
}

export async function getUsers() {
  const [rows] = await db.query<MySQLUser[]>("SELECT * FROM users");
  return rows;
}
