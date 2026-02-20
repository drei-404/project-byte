import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email required" }, { status: 400 });
  }

  // 1️⃣ Authorization check
  const user = await prisma.user.findUnique({
    where: { email },
    select: { isSuspended: true },
  });

  if (!user || user.isSuspended) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const baseUrl = process.env.NEXTAUTH_URL!;

  // 2️⃣ Get CSRF token (WITH cookies)
  const csrfRes = await fetch(`${baseUrl}/api/auth/csrf`, {
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  const { csrfToken } = await csrfRes.json();

  // 3️⃣ Send email sign-in WITH CSRF + cookies
  const params = new URLSearchParams({
    email,
    csrfToken,
    callbackUrl: "/admin",
  });

  const signInRes = await fetch(`${baseUrl}/api/auth/signin/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: req.headers.get("cookie") ?? "",
    },
    body: params.toString(),
  });

  if (!signInRes.ok) {
    const text = await signInRes.text();
    console.error("NextAuth error:", text);
    return NextResponse.json(
      { message: "Failed to send magic link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
