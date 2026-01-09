import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play, Users } from "lucide-react";
import Link from 'next/link'

// mock data
const MOCK_RECENT_GAMES = [
  { 
    id: '1',
    quizTitle: 'Math Fundamentals',
    hostDate: '2025-05-10',
    players: 24,
    gameCode: 'MATH01',
  },
  { 
    id: '2',
    quizTitle: 'Science Quiz',
    hostDate: '2025-05-08',
    players: 18,
    gameCode: 'SCI123',
  },
  { 
    id: '3',
    quizTitle: 'History Champions',
    hostDate: '2025-05-05',
    players: 32,
    gameCode: 'HIST54',
  },
];

export function RecentlyHostedGames() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quiz Title</TableHead>
            <TableHead>Last Hosted</TableHead>
            <TableHead className="text-center">Game Code</TableHead>
            <TableHead className="text-center">Players</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_RECENT_GAMES.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.quizTitle}</TableCell>
              <TableCell>{game.hostDate}</TableCell>
              <TableCell className="text-center font-mono">{game.gameCode}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{game.players}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/host/lobby?rehost=${game.id}`}>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Host Again
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}