import {db} from "@/lib/database"

export async function createUser(){
    const [rows] = await db.query("SELECT * FROM Users")
    return rows;
}