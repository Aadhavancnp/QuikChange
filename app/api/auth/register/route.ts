import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  try {
    const user = await prismadb.admin.findFirst({
      where: { email, password },
    });

    if (user) {
      return NextResponse.json({ status: 404, error: "User already exists" });
    }

    await prismadb.admin.create({
      data: {
        email,
        password,
      },
    });
    const res = NextResponse.json({
      status: 200,
      message: "Successfully Registered",
    });
    res.cookies.set("email", email);
    return res;
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
