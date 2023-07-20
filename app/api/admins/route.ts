import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prismadb.admin.findMany();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prismadb.admin.create({ data: body });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = await prismadb.admin.update({
      where: { email: body.email },
      data: { password: body.password },
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const data = await prismadb.amount.delete({
      where: { amount: body.amount },
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
