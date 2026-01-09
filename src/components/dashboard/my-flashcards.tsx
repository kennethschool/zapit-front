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
  Plus,
  Edit,
  Trash,
  MoreVertical,
  Earth,
  ArrowBigDown,
  ChevronDown,
  Star,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const MY_FLASHCARDS = [
  {
    id: "1",
    title: "Chemistry Notes",
    cards: 45,
    lastStudied: "2 days ago",
    mastery: 75,
  },
  {
    id: "2",
    title: "Spanish Vocabulary",
    cards: 60,
    lastStudied: "1 week ago",
    mastery: 60,
  },
  {
    id: "3",
    title: "Physics Formulas",
    cards: 30,
    lastStudied: "Yesterday",
    mastery: 85,
  },
];

export function MyFlashcards() {
  const [Dropped, setDropOpen] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user?.id) return; // wait until session is ready

    const getFlashcards = async () => {
      const res = await fetch("/api/v1/flashcards");

      if (res.ok) {
        const data = await res.json();
        setFlashcards(data.sets);
      }
    };

    getFlashcards();
  }, [session]);

  useEffect(() => {
    const getFlashcards = async () => {
      const res = await fetch("/api/v1/flashcards");

      if (res.ok) {
        const data = await res.json();
        setFlashcards(data.sets);
      }
    };

    getFlashcards();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search my flashcards..." className="pl-10" />
        </div>
        <div className="relative w-[9rem]">
          {" "}
          <DropdownMenu onOpenChange={() => setDropOpen(!Dropped)}>
            <DropdownMenuTrigger asChild>
              <div className="rounded-md border h-full">
                <div className="h-full items-center mx-2 flex justify-evenly">
                  <div className="w-1/3 flex items-center px-2 h-full">
                    <ChevronDown
                      className={`h-4 w-4 transform transition-all ${Dropped && "rotate-180"}`}
                    />
                  </div>
                  <div className="2/3 flex items-center h-full">
                    <Star className="h-3 w-3 mr-2" />
                    <span>Starred</span>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem className="w-[9rem] mt-2">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </div>
        <Link href="/flashcards/creation">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Set
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((set) => (
          <Card key={set.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{set.title}</CardTitle>
                <div className="flex gap-x-1 items-center">
                  <Earth className="h-4 w-4" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription>Last studied {set.lastStudied}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>67 cards</span>
                  <span>67% mastered</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `67%` }} />
                </div>
                <Link target="_blank" href={`/flashcards?id=${set.id}`}>
                  <Button className="w-full">Study Now</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
