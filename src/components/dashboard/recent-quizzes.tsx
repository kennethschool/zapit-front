import { CheckCircle, Clock, Edit, Users } from "lucide-react";
import Link from 'next/link'

// fake quizzes
const MOCK_QUIZZES = [
  {
    id: "1",
    title: "Math Fundamentals",
    questions: 12,
    lastPlayed: "2 days ago",
    participants: 24,
    completionRate: 85,
  },
  {
    id: "2",
    title: "Science Quiz",
    questions: 15,
    lastPlayed: "5 days ago",
    participants: 18,
    completionRate: 92,
  },
  {
    id: "3",
    title: "History Champions",
    questions: 10,
    lastPlayed: "1 week ago",
    participants: 32,
    completionRate: 78,
  },
];

export function RecentQuizzes() {
  return (
    <div className="grid grid-cols-1 space-y-4">
      {MOCK_QUIZZES.map((quiz) => (
        <Link href={`/quiz/${quiz.id}`} key={quiz.id}>
          <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <div>
              <h3 className="font-medium">{quiz.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{quiz.lastPlayed}</span>
                <span className="mx-2">•</span>
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{quiz.participants} players</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm">{quiz.completionRate}%</span>
              </div>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
