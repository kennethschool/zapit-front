import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from 'zapit-schema/prisma/generated';
import { withAccelerate } from "@prisma/extension-accelerate";
import { generateCode } from "@/lib/utils";


const acceleratedPrisma = new PrismaClient().$extends(withAccelerate());
const prisma = acceleratedPrisma;

let notDuplicate = true;
let code: string;

export async function POST(req: NextRequest) {
  const data = await req.json();
  while (notDuplicate === true) {
    let _code = generateCode(5);

    const findCode = await prisma.game.findFirst({ where: { code: _code } });

    if (!findCode) {
      notDuplicate = false;
      code = _code;
    }
  }
  const postGame = await acceleratedPrisma.game.create({
    data: {
      code,
      authorId: "Bot",
      quizId: data.quizId,
      quiz: data.quiz,
      results: data.results,
    },
  });

  if (postGame) {
    return NextResponse.json({ message: code }, { status: 200 });
  } else {
    return NextResponse.json({ message: "An error occured!" }, { status: 500 });
  }
}
