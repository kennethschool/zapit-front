import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, description, authorId, subdecks } = body;

    if (!title || !authorId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // recursive for nested subdecks + cards
    async function createSubdecks(decks, parentId, setId) {
      return Promise.all(
        decks.map(async (deck) => {
          const newSub = await prisma.flashcardSubdeck.create({
            data: {
              title: deck.name,
              setId,
              parentId,
            },
          });

          // create the flashcards inside this subdeck
          if (deck.cards && deck.cards.length > 0) {
            await prisma.flashcard.createMany({
              data: deck.cards.map((c) => ({
                question: c.question,
                answer: c.answer,
                subdeckId: newSub.id,
              })),
            });
          }

          // create child subdecks
          if (deck.subdecks && deck.subdecks.length > 0) {
            await createSubdecks(deck.subdecks, newSub.id, setId);
          }

          return newSub;
        })
      );
    }

    // First create the set
    const flashcardSet = await prisma.flashcardSet.create({
      data: {
        title,
        description,
        authorId,
      },
    });

    // create all subdecks inside the set
    if (subdecks && subdecks.length > 0) {
      await createSubdecks(subdecks, null, flashcardSet.id);
    }

    return NextResponse.json(
      { message: "created", flashcardSet },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// gather flashcards from nested subdecks
//@ts-ignore
async function getAllFlashcardsFromSubdecks(subdecks) {
  let all = [];

  for (const sub of subdecks) {
    // get flashcards from this subdeck
    const cards = await prisma.flashcard.findMany({
      where: { subdeckId: sub.id },
    });

    all.push(...cards);

    // If nested subdecks exist
    const children = await prisma.flashcardSubdeck.findMany({
      where: { parentId: sub.id },
    });

    if (children.length > 0) {
      const nested = await getAllFlashcardsFromSubdecks(children);
      all.push(...nested);
    }
  }

  return all;
}

function removeDuplicates(cards: any[]) {
  const seen = new Set();
  const result = [];

  for (const card of cards) {
    const key = card.question + "::" + card.answer;

    if (!seen.has(key)) {
      seen.add(key);
      result.push(card);
    }
  }

  return result;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authorId = searchParams.get("authorId");
    const onlyFlashcards = searchParams.get("onlyflashcards");
    const setId = searchParams.get("setId");

    // setId may be required or not
    if (onlyFlashcards === "true") {
      if (!setId) {
        return NextResponse.json(
          { message: "setId is required when onlyflashcards=true" },
          { status: 400 }
        );
      }

      // get the parent set
      const set = await prisma.flashcardSet.findUnique({
        where: { id: setId },
        include: { subdecks: true },
      });

      if (!set) {
        return NextResponse.json(
          { message: "Flashcard set not found" },
          { status: 404 }
        );
      }
      const topCards = await prisma.flashcard.findMany({
        where: { subdeckId: setId },
      });

    
      const nestedCards = await getAllFlashcardsFromSubdecks(set.subdecks);

      
      let combined = [...topCards, ...nestedCards];

      // Remove duplicates
      combined = removeDuplicates(combined);

      return NextResponse.json({ flashcards: combined }, { status: 200 });
    }

    let sets;

    if (authorId) {
      sets = await prisma.flashcardSet.findMany({
        where: { authorId: Number(authorId) },
        include: { subdecks: true },
      });
    } else {
      sets = await prisma.flashcardSet.findMany({
        include: { subdecks: true },
      });
    }

    return NextResponse.json({ sets }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
