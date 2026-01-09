"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  CheckCircle,
  Download,
  Eye,
  RefreshCcw,
  Search,
  Trophy,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";

// mocked data for preview
const MOCK_GAMES = [
  {
    id: "1",
    date: new Date(2025, 4, 10, 14, 30),
    title: "Math Fundamentals",
    players: 24,
    averageScore: "78%",
    gameCode: "MATH01",
    status: "Completed",
  },
  {
    id: "2",
    date: new Date(2025, 4, 8, 10, 15),
    title: "Science Quiz",
    players: 18,
    averageScore: "65%",
    gameCode: "SCI123",
    status: "Completed",
  },
  {
    id: "3",
    date: new Date(2025, 4, 5, 9, 45),
    title: "History Champions",
    players: 32,
    averageScore: "82%",
    gameCode: "HIST54",
    status: "Completed",
  },
  {
    id: "4",
    date: new Date(2025, 4, 2, 13, 20),
    title: "English Literature",
    players: 12,
    averageScore: "71%",
    gameCode: "ENG789",
    status: "Completed",
  },
  {
    id: "5",
    date: new Date(2025, 3, 28, 15, 0),
    title: "Geography Trivia",
    players: 15,
    averageScore: "69%",
    gameCode: "GEO456",
    status: "Completed",
  },
];

export function GameHistory() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-6">
      <div className="p-5 bg-foreground/5 rounded flex justify-between">
        <div className="space-x-20 flex">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground/75">
              Total Games
            </p>
            <p className="text-xl font-bold">45</p>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground/75">
              Average Score
            </p>
            <p className="text-xl font-bold">78%</p>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground/75">Win Rate</p>
            <p className="text-xl font-bold">67%</p>
          </div>{" "}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground/75">
              Longest Streak
            </p>
            <p className="text-xl font-bold">5</p>
          </div>
        </div>
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search game history..." className="pl-10" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal w-48"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Quiz type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All quizzes</SelectItem>
              <SelectItem value="math">Math</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="rounded-md border w-3/4 space-y-2 pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Quiz Title</TableHead>
                <TableHead className="text-center">Game Code</TableHead>
                <TableHead className="text-center">Players</TableHead>
                <TableHead className="text-center">Avg. Score</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_GAMES.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">
                    {format(game.date, "MMM d, yyyy")}
                    <div className="text-xs text-muted-foreground">
                      {format(game.date, "h:mm a")}
                    </div>
                  </TableCell>
                  <TableCell>{game.title}</TableCell>
                  <TableCell className="text-center font-mono">
                    {game.gameCode}
                  </TableCell>
                  <TableCell className="text-center">{game.players}</TableCell>
                  <TableCell className="text-center">
                    {game.averageScore}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center rounded-full bg-green-800 px-2.5 py-0.5 text-xs font-medium">
                      {game.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink isActive href="#">
                  2
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="rounded-md border w-1/4 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-2xl font-semibold">Game Details</p>
              <div className="space-y-8 p-4 bg-foreground/1 rounded-lg">
                <div className="flex justify-between items-center text-left">
                  <p className="w-1/2">Leaderboard</p>
                  <p className="w-1/2">11th place</p>
                </div>{" "}
                <div className="flex justify-between items-center text-left">
                  <p className="w-1/2">Score</p>
                  <p className="w-1/2">110pts</p>
                </div>
                <div className="flex justify-between items-center text-left">
                  <p className="w-1/2">Accuracy</p>
                  <p className="w-1/2">69%</p>
                </div>
              </div>
            </div>{" "}
            <div className="space-y-2">
              <p className="text-2xl font-semibold">Notes</p>
              <div className="space-y-4 p-4 bg-foreground/1 rounded-lg">
                <div className="flex items-center text-left">
                  <div className="w-1/3">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <p>Top 3 finished in Score Quiz</p>
                </div>{" "}
                <div className="flex items-center text-left">
                  <div className="w-1/3">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p>100% on History Champions</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-semibold">Achievements</p>
              <div className="space-y-4 p-4 bg-foreground/1 rounded-lg">
                <div className="flex items-center text-left">
                  <div className="w-1/3">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <p>Top 3 finished in Score Quiz</p>
                </div>{" "}
                <div className="flex items-center text-left">
                  <div className="w-1/3">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p>100% on History Champions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
