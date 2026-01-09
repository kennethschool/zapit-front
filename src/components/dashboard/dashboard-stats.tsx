import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Users, Award, ListChecks, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function DashboardStats() {
  const { data: session } = authClient.useSession();

  const [user, SetUser] = useState({});

  useEffect(() => {
    const getFlashcards = async () => {
      //toast(session?.user.id);
      const res = await fetch(
        `/api/v1/users/getUser?userId=${session?.user.id}`
      );

      if (res.ok) {
        const data = await res.json();
        SetUser(data.user);
        //toast(JSON.stringify(data.user));
      }
    };

    getFlashcards();
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Quizzes Created
          </CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {" "}
            {user?.statistics?.totalQuizsCreated}
          </div>
          <p className="text-xs text-muted-foreground">+2 from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Games Hosted
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {" "}
            {user?.statistics?.totalGamesHosted}
          </div>
          <p className="text-xs text-muted-foreground">+8 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">XP</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"> {user?.statistics?.xpCount}</div>
          <p className="text-xs text-muted-foreground">Science Quiz - May 12</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Time Spent Learning
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {user?.statistics?.timeSpentLearning}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
    </div>
  );
}
