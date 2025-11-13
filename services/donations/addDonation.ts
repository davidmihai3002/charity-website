import { db } from "@/lib/connections/database";
import { DonationsProps } from "@/lib/context/DonationsContext";

export async function addDonation(donationData: DonationsProps) {
  const [result] = await db.query(
    `INSERT INTO donations (name, email, amount, message, user_id) VALUES (? , ? , ? , ? , ?)`,
    [
      donationData.name,
      donationData.email,
      donationData.amount,
      donationData.message ?? "none",
      donationData.userId ?? 0,
    ]
  );
  const insertId = (result as any)?.insertId ?? null;
  return insertId;
}
