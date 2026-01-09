"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { PiHandTapFill } from "react-icons/pi";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface Question {
  id: string;
  text: string;
  timeLimit: number;
  points: number;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

interface GameQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string) => void;
  viewAnswers: any;
  setAnswered: any;
  answered: any;
  setViewingAnswers: any;
  setCurrentQuestionIndex: any;
  currentQuestionIndex: any;
  handleFinish: any;
}

export function GameQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  viewAnswers,
  setAnswered,
  answered,
  setViewingAnswers,
  setCurrentQuestionIndex,
  currentQuestionIndex,
  handleFinish,
}: GameQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const handleOptionClick = (option: any) => {
    if (isAnswerSubmitted) return;

    setSelectedOption(option);
    setIsAnswerSubmitted(true);

    // does slight delay before moving to next question
    setTimeout(() => {
      onAnswer(option);
    }, 1000);
  };

  const getOptionClassName = (option: { id: string; isCorrect: boolean }) => {
    if (!isAnswerSubmitted) {
      return selectedOption === option.id
        ? "bg-primary/80 text-primary-foreground"
        : "bg-muted hover:bg-muted/80";
    }

    if (option.isCorrect) {
      return "bg-green-500 text-white";
    }

    if (selectedOption === option.id && !option.isCorrect) {
      return "bg-red-500 text-white";
    }

    return "bg-muted opacity-70";
  };

  // map options colors to their background color
  const colorMap = [
    "bg-blue-500 hover:bg-blue-600",
    "bg-red-500 hover:bg-red-600",
    "bg-yellow-500 hover:bg-yellow-600 text-black",
    "bg-green-500 hover:bg-green-600",
  ];

  return (
    <>
      <div className="hidden flex-1 flex flex-col justify-center p-4 md:p-8 cursor-pointer">
        <div className="absolute bottom-20 font-medium self-center flex text-3xl gap-3 items-center">
          Press Anywhere to Continue <PiHandTapFill />
        </div>
        <motion.div
          className="text-center space-y-8 mb-12 w-4xl mx-auto bg-background/90 p-12 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hidden p-2 space-y-3 justify-center place-items-center">
            <div className="rounded-full text-white p-2 bg-accent/10 w-fit">
              <div className="p-2 bg-red-500 rounded-full">
                <X className="" />
              </div>
            </div>
            <span className="text-4xl font-bold">Incorrect</span>
          </div>
          <div className="p-2 space-y-3 justify-center place-items-center">
            <div className="rounded-full text-white p-2 bg-accent/10 w-fit">
              <div className="p-2 bg-success rounded-full">
                <Check className="" />
              </div>
            </div>
            <span className="text-4xl font-bold">Correct</span>
          </div>
          <span className="text-2xl md:text-3xl font-medium mb-2 rounded-md bg-foreground/5 p-4 my-8">
            {question.text}
          </span>
        </motion.div>
      </div>{" "}
      <div className="hdden flex-1 flex flex-col justify-center p-4 md:p-8">
        <div className="text-center mb-2">
          <div className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </div>
        </div>

        <motion.div
          className="text-center mb-12 w-7xl mx-auto bg-muted p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl md:text-3xl font-bold mb-2">
            {question.question}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto w-full ">
          <AnimatePresence>
            {question.options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  className={`w-full h-48 text-3xl font-medium ${viewAnswers ? (option.isCorrect ? "bg-green-500" : "bg-red-500") : colorMap[index]}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswerSubmitted}
                >
                  {option.text}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className={`${!answered && "hidden"} p-8`}>
          {" "}
          {!(totalQuestions === currentQuestionIndex + 1) ? (
            <Button
              onClick={() => [
                setAnswered(false),
                setViewingAnswers(false),
                setIsAnswerSubmitted(false),
                setCurrentQuestionIndex(currentQuestionIndex + 1),
              ]}
              className="w-full"
            >
              Next Question
            </Button>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => [handleFinish()]}
              className="w-full"
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
