import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from 'zapit-schema/prisma/generated';
import { withAccelerate } from "@prisma/extension-accelerate";

const acceleratedPrisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: NextRequest) {
  const users = await acceleratedPrisma.user.findMany({
    cacheStrategy: {
      ttl: 60, 
      swr: 300,
    },
  });
  return NextResponse.json(users);
}
