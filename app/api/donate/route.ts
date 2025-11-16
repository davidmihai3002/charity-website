import { DonationsProps } from "@/lib/context/DonationsContext";
import { numberRegex } from "@/lib/validations/numberRegex";
import { addDonation } from "@/services/donations/addDonation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const donationData: DonationsProps = await req.json();
    if (!numberRegex.test(donationData.amount)) {
      return NextResponse.json(
        { message: "Amount must be a number" },
        { status: 500 }
      );
    }
    await addDonation(donationData);
    return NextResponse.json(
      { message: "Your donation was successful! Thank you!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "sent unsuccessfully" },
      { status: 500 }
    );
  }
}
