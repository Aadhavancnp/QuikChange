import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { key } = await request.json();
    const res = NextResponse.json({ key });
    res.cookies.delete(key);
    return res;
  } catch (error) {
    return NextResponse.json({ error });
  }
}
