import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from 'next/link'


export function CreateQuizButton() {
  return (
    <Link href="/quizzes/creation">
      <Button>
        <PlusCircle className="mr-2 h-5 w-5" />
        Create Quiz
      </Button>
    </Link>
  );
}