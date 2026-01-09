import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from 'zapit-schema/prisma/generated';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role:
          role?.toLowerCase() === "student"
            ? "USER"
            : role?.toUpperCase() || "USER",
      },
    });

    return NextResponse.json(
      {
        message: "User created",
        user: { id: newUser.id, email: newUser.email },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
