import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "zapit-schema/prisma/generated";
import { withAccelerate } from "@prisma/extension-accelerate";

const acceleratedPrisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: NextRequest) {
  const users = await acceleratedPrisma.user.deleteMany({});
  if (users) {
    return NextResponse.json({ message: users }, { status: 200 });
  } else {
    NextResponse.json({ message: "A server error occured!" }, { status: 500 });
  }
}
