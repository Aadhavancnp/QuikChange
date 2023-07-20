import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email;
  try {
    const data = await prismadb.admin.findUniqueOrThrow({
      where: { email: email },
    });
    if (!data) {
      return NextResponse.json({ error: "Admin not found" });
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
