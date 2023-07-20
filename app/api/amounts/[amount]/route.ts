import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { amount: string } }
) {
  const amount = params.amount;
  try {
    const data = await prismadb.amount.findUnique({
      where: { amount: amount },
    });
    if (!data) {
      return NextResponse.json({ error: "Amount not found" });
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
