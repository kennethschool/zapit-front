import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from 'zapit-schema/prisma/generated';
import { withAccelerate } from "@prisma/extension-accelerate";


const acceleratedPrisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code")?.toString();

  const games = await acceleratedPrisma.game.findFirst({
    where: {
      code,
    },
  });
  return NextResponse.json(games);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json({ message: "Received POST!", data });
}
