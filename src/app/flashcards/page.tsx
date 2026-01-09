"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, SkipBackIcon, SkipForwardIcon, Stars } from "lucide-react";
import { FiEye } from "react-icons/fi";
import useKeyboardNavigation from "~/components/providers/useKeyboardNavigation";
import { toast } from "react-toastify";

export default function Flashcards({ params }: { params: { id: string } }) {
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [currentCard, setCurrentCard] = useState<any>(null);
  const [previousCards, setPreviousCards] = useState<any[]>([]);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number>(-1);
  const [flipped, setFlipped] = useState(-1);
  const [hintLevel, setHintLevel] = useState(0);

  const { searchParams } = new URL(window.location);
  const setId = searchParams.get("id");

  //load flashcards
  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/v1/flashcards?setId=${setId}&onlyflashcards=true`
      );
      const data = await res.json();

      const formatted = data.flashcards.map((fc) => ({
        id: fc.id,
        title: fc.question,
        correctAnswer: fc.answer,
        options: [fc.answer, "wrong", "wrong", "wrong"],
        correctIndex: 0,
      }));

      setFlashcards(formatted);
      setTotalCards(formatted.length);
      setCurrentCard(formatted[0]);
      setOptions([...formatted[0].options]);
      setCorrectIndex(0);
    }
    load();
  }, [setId]);

  function chooseOption(option: string) {
    if (!currentCard) return;

    if (option === currentCard.correctAnswer) {
      toast("Correct!");
      // Correct to next card
      nextCard();
    } else {
      toast.error("Wrong!");
      // wrong = put card at end
      let _currentCard = currentCard;
      _currentCard.originalId = currentCard.id;
      _currentCard.id = crypto.randomUUID();

      let updateCards = [...flashcards, _currentCard];

      setFlashcards(updateCards);
      toast(totalCards);
      setTotalCards(updateCards.length);
      setCurrentCard(updateCards[0]);
      setOptions([...updateCards[0].options]);
      setCorrectIndex(updateCards[0].correctIndex);
    }
  }

  const handleHint = () => {
    if (hintLevel >= 2) return;

    const correct = options[correctIndex];
    const wrongOptions = options.filter((opt) => opt !== correct);

    let newOptions: string[] = [];
    if (hintLevel === 0) {
      const removeOne =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      newOptions = [correct, ...wrongOptions.filter((o) => o !== removeOne)];
    } else if (hintLevel === 1) {
      const removeOne =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      newOptions = [correct, removeOne];
    }

    newOptions.sort(() => Math.random() - 0.5);
    setOptions([...newOptions]);
    setHintLevel(hintLevel + 1);
  };

  function previousCard() {
    if (previousCards.length === 0) return;

    const [prev, ...rest] = previousCards;
    setPreviousCards(rest);
    setFlashcards([prev, ...flashcards]);
    setCurrentCard(prev);
    setOptions([...prev.options]);
    setCorrectIndex(prev.correctIndex);
    setHintLevel(0);
  }

  function nextCard() {
    setFlipped(-1);
    if (flashcards.length <= 1) {
      setFlashcards([]);
      setCurrentCard(null);
      return;
    }

    const [first, ...rest] = flashcards;
    setPreviousCards([first, ...previousCards]);
    setFlashcards(rest);
    setCurrentCard(rest[0]);
    setOptions([...rest[0].options]);
    setCorrectIndex(rest[0].correctIndex);
    setHintLevel(0);
  }

  useKeyboardNavigation({
    onNext: nextCard,
    onPrevious: previousCard,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Flashcards: {currentCard?.title || ""}
        </h1>
        <Progress
          value={
            totalCards > 0
              ? ((totalCards - flashcards.length) / totalCards) * 100
              : 0
          }
          className="w-2/3 place-self-center bg-background my-3 bg-foreground/5 border-primary"
        />
        <span className="mt-2 font-semibold text-lg text-foreground">
          {totalCards > 0
            ? ((totalCards - flashcards.length) / totalCards) * 100
            : 0}
          % done
        </span>

        <p className="text-muted-foreground mt-2 mb-6 flex self-center place-items-center text-center justify-center">
          <Lightbulb /> Tip: Think of the answer before answering
        </p>

        <div className="h-[75vh] -my-20 relative flex items-center place-content-center">
          <AnimatePresence>
            {flashcards.map((card, index) => (
              <motion.div
                key={card.id}
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  rotateY: flipped === index ? 180 : 0,
                  opacity: 1,
                  scale: index === 0 ? 1.25 : index === 1 ? 1.1 : 0.85,
                  y: index === 0 ? "-1rem" : index === 1 ? "-4rem" : "-8rem",
                  zIndex: 30 - index * 10,
                }}
                exit={{ opacity: 0, y: "-16rem", scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
                className="absolute w-2/4 h-2/4"
              >
                {/* the front */}
                <Card
                  className="absolute w-full h-full bg-background p-4 rounded-2xl shadow-lg"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {card.id === currentCard?.id && (
                    <>
                      <div className="w-full p-1">
                        <p className="font-semibold">{card.title}</p>
                      </div>
                      <div className="bg-foreground/10 w-full p-0.5 rounded-full my-1"></div>
                      <div className="h-2/3 p-1 overflow-y-auto">
                        <p>{card.title}</p>
                      </div>
                    </>
                  )}
                </Card>
                {/* back */}
                <Card
                  className="absolute w-full h-full bg-yellow-200 p-4 rounded-2xl shadow-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {card.id === currentCard?.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-lg text-background font-semibold">
                        Answer: {card.correctAnswer}
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
            {flashcards.length === 0 && (
              <div className="text-3xl font-bold text-center mt-20">
                Completed!
              </div>
            )}
          </AnimatePresence>

          <div className="absolute flex justify-between inset-x-0 bottom-0 w-full p-4 h-fit">
            <div className="absolute w-full flex justify-center -top-14 left-0 p-1 gap-x-4">
              {[...options]
                .sort(() => Math.random() - 0.5)
                .map((option) => (
                  <Button
                    key={option + Math.random()}
                    variant="outline"
                    className="p-2 h-fit text-2xl"
                    onClick={() => chooseOption(option)}
                  >
                    {option}
                  </Button>
                ))}
            </div>

            <Button onClick={previousCard} className="gap-x-2 text-1xl">
              <SkipBackIcon /> Back
            </Button>

            <div className="justify-around gap-x-4 flex">
              <Button
                onClick={handleHint}
                variant="outline"
                disabled={hintLevel >= 2}
                className="gap-x-2 text-1xl"
              >
                <Stars /> {hintLevel >= 2 ? "50/50 chance" : "Hint"}
              </Button>
              <Button
                variant="outline"
                className={`gap-x-2 text-1xl ${flipped !== -1 && "text-accent-foreground bg-accent"}`}
                onClick={() =>
                  setFlipped(
                    flipped ===
                      flashcards.findIndex((c) => c.id === currentCard?.id)
                      ? -1
                      : flashcards.findIndex((c) => c.id === currentCard?.id)
                  )
                }
              >
                <FiEye /> Reveal
              </Button>
            </div>

            <Button onClick={nextCard} className="gap-x-2 text-1xl">
              <SkipForwardIcon /> Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
