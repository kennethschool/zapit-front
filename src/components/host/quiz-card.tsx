"use client";

import { Card } from "@/components/ui/card";
import { FileText, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    questions: number;
    lastPlayed: string;
    coverImage?: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export function QuizCard({ quiz, isSelected, onClick }: QuizCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden transition-colors",
        isSelected
          ? "border-primary border-2 bg-primary/5"
          : "hover:bg-muted/50"
      )}
      onClick={onClick}
    >
      <div className="h-32 bg-muted relative">
        {quiz.coverImage ? (
          <img
            src={quiz.coverImage}
            alt={quiz.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2 truncate">{quiz.title}</h3>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            <span>{quiz.questions.length}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{quiz.lastPlayed}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
