import { PrismaClient } from 'zapit-schema/prisma/generated';
import { withAccelerate } from "@prisma/extension-accelerate";

const acceleratedPrisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: NextRequest) {
  const games = await acceleratedPrisma.game.findMany({
    where: {
      status: "ACTIVE",
    },
    cacheStrategy: {
      ttl: 60,
      swr: 300, 
    },
  });
  return NextResponse.json(games);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json({ message: "Received POST!", data });
}
