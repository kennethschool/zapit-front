import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  Star,
  Plus,
  PlusCircle,
  Verified,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from 'next/link'

const MOCK_FLASHCARDS = [
  {
    id: "1",
    title: "Biology Basics",
    cards: 120,
    rating: 4.8,
    author: "Dr. Smith",
    category: "Science",
  },
  {
    id: "2",
    title: "World History",
    cards: 85,
    rating: 4.5,
    author: "Prof. Johnson",
    category: "History",
  },
  {
    id: "3",
    title: "Math Formulas",
    cards: 150,
    rating: 4.9,
    author: "Ms. Williams",
    category: "Mathematics",
  },
];

export function DiscoverFlashcards() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search flashcard sets..." className="pl-10" />
        </div>
        <Link href="/flashcards/creation">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Set
        </Button></Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_FLASHCARDS.map((set) => (
          <Card key={set.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{set.title}</span>
                <Tooltip>
                  <TooltipTrigger>
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="flex gap-x-2 items-center"
                  >
                    Teacher verified <Verified className="h-4 w-4" />
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
              <CardDescription>{set.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {set.cards} cards
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{set.rating}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                By {set.author}
              </div>
              <div className="w-full group gap-x-2 mt-4 hover:border-none border h-10 text-sm font-semibold text-center rounded-md container mx-auto flex items-center justify-between  transform transition-all">
                <p className="group-hover:hidden font-semibold w-full">
                  Options
                </p>
                <Button
                  className="w-full hidden group-hover:block"
                  variant="outline"
                >
                  Study Now
                </Button>
                <Button
                  className="w-full gap-x-2 hidden  items-center group-hover:flex"
                  variant="outline"
                >
                  Add To My Flashcards{" "}
                  <PlusCircle className="h-4 w-4 items-center" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
