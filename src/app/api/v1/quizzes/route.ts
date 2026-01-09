import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, isPublic, authorId, questions } = body;

    if (!title || !authorId || !questions) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        isPublic,
        authorId,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            points: q.points || 20,
            timeLimit: q.timeLimit || 30,
            options: {
              create: q.answers.map((a: any, index: number) => ({
                text: a.text,
                isCorrect: q.correct.includes(index),
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authorId = searchParams.get("authorId");

    if (!authorId) {
      const quizzes = await prisma.quiz.findMany({
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      return NextResponse.json({ quizzes }, { status: 200 });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { authorId: Number(authorId) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json({ quizzes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
