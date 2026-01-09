"use client";

import { useState, useRef, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizCard } from "@/components/host/quiz-card";
import Link from "next/link";
import { RecentlyHostedGames } from "@/components/host/recently-hosted-games";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "~/components/ui/drawer";
import { FaLightbulb } from "react-icons/fa";
import { Switch } from "~/components/ui/switch";
import { Tag } from "lucide-react";
import { FaRobot } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { getWS } from "@/components/connections/wsClient";
import { useRouter } from "next/navigation";

export default function HostPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!session?.user?.id) return; // wait until session is ready

    const getQuizzes = async () => {
      const response = await fetch(
        `/api/v1/quizzes?authorId=${session.user.id}`
      );

      const data = await response.json();
      setQuizzes(data.quizzes);
    };

    getQuizzes();
  }, [session]);

  const ws = getWS();

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "lobby-created") {
      router.push(`/host/lobby/${data.lobbyCode}`);
    }
    //console.log("Message:", e.data);
  };

  //router.push(`/game/${gameCode}`);

  const startLobby = (quiz) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "create-lobby",
          lobbyCode: 12345,
          quiz,
          hostData: session?.user,
        })
      );
    } else {
      console.log("Socket not ready yet");
    }
  };

  const [selectedQuiz, setSelectedQuiz] = useState<any | null>(null);

  const MOCK_QUIZZES = [
    {
      id: "1",
      title: "Math Fundamentals",
      questions: 12,
      lastPlayed: "2023-12-01",
      coverImage: "/math-quiz.jpg",
    },
    {
      id: "2",
      title: "General Knowledge",
      questions: 20,
      lastPlayed: "2023-12-05",
      coverImage: "/knowledge-quiz.jpg",
    },
    {
      id: "3",
      title: "Science Quiz",
      questions: 15,
      lastPlayed: "2023-11-28",
      coverImage: "/science-quiz.jpg",
    },
    {
      id: "4",
      title: "History Champions",
      questions: 10,
      lastPlayed: "2023-12-10",
      coverImage: "/history-quiz.jpg",
    },
  ];

  const [openQuizDrawer, setOpenQuizDrawer] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Host a Game</h1>
        <p className="text-muted-foreground">
          Select a quiz and start playing with your students
        </p>
      </div>

      <Tabs defaultValue="myQuizzes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="myQuizzes">My Quizzes</TabsTrigger>
          <TabsTrigger value="recentlyHosted">Recently Hosted</TabsTrigger>
        </TabsList>

        <TabsContent value="myQuizzes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {quizzes?.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                isSelected={selectedQuiz === quiz}
                onClick={() =>
                  selectedQuiz === quiz.id
                    ? setSelectedQuiz(null)
                    : [setSelectedQuiz(quiz), setOpenQuizDrawer(true)]
                }
              />
            ))}
          </div>

          {quizzes.length === 0 && (
            <div className="text-center p-12 border border-dashed rounded-lg">
              <p className="mb-4 text-muted-foreground">
                You haven't created any quizzes yet
              </p>
              <Link href="/create-quiz">
                <Button>Create Your First Quiz</Button>
              </Link>
            </div>
          )}

          <div className="absolute">
            <Drawer
              open={openQuizDrawer}
              onClose={() => [setOpenQuizDrawer(false), setSelectedQuiz(null)]} // will fire on outside click
            >
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Game Settings</DrawerTitle>
                  <DrawerDescription>
                    Configure your game before starting
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 grid grid-cols-2 gap-4">
                  <div>
                    {" "}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Game Mode</label>
                      <Select onValueChange={(e) => console.log(e)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select game mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="team">Team Mode</SelectItem>
                          <SelectItem value="challenge">
                            Challenge Mode
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timer Speed</label>
                      <Select onValueChange={(e) => console.log(e)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timer speed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow (1.5x)</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="fast">Fast (0.5x)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Custom Game Name (Optional)
                      </label>
                      <Input placeholder="Enter custom name" />
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <label className="text-sm font-medium">Game Options</label>
                    <div className="space-y-6  h-[80%]">
                      <Card className="flex items-center justify-between p-2 shadow-sm group">
                        <div className="flex items-center gap-x-2">
                          <FaLightbulb className="transition-all group-hover:scale-125 group-hover:text-primary group-hover:shadow-lg shadow-primary" />{" "}
                          Enable Hints
                        </div>
                        <Switch />
                      </Card>{" "}
                      <Card className="flex items-center justify-between p-2 shadow-sm group">
                        <div className="flex items-center gap-x-2">
                          <FaRobot className="transition-all group-hover:scale-125 group-hover:text-primary" />{" "}
                          Enable AI Suggestions
                        </div>
                        <Switch />
                      </Card>{" "}
                      <Card className="flex items-center justify-between p-2 shadow-sm group">
                        <div className="flex items-center gap-x-2">
                          <Tag className="h-4 w-4 transition-all group-hover:scale-125 group-hover:text-primary group-hover:rotate-45" />{" "}
                          Enable Custom Nicknames
                        </div>
                        <Switch />
                      </Card>
                    </div>
                  </div>
                </div>

                <DrawerFooter>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="">
                      <Button
                        onClick={() => startLobby(selectedQuiz)}
                        className="w-full"
                      >
                        Start Game
                      </Button>
                    </div>
                    <DrawerClose asChild>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-md">
                        Close
                      </button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </TabsContent>

        <TabsContent value="recentlyHosted">
          <RecentlyHostedGames />
        </TabsContent>
      </Tabs>

      {false && selectedQuiz && (
        <Card className="mt-8 max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Game Settings</CardTitle>
            <CardDescription>
              Configure your game before starting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Game Mode</label>
              <Select onValueChange={(e) => console.log(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select game mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="team">Team Mode</SelectItem>
                  <SelectItem value="challenge">Challenge Mode</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Timer Speed</label>
              <Select onValueChange={(e) => console.log(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timer speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow (1.5x)</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast (0.5x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Custom Game Name (Optional)
              </label>
              <Input placeholder="Enter custom name" />
            </div>

            <div className="pt-4">
              <Link href="/host/lobby">
                <Button className="w-full">Start Game</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
