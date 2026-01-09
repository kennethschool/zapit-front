"use client";

import { use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentQuizzes } from "@/components/dashboard/recent-quizzes";
import { CreateQuizButton } from "@/components/dashboard/create-quiz-button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DiscoverQuizGrid } from "@/components/dashboard/discover-quizzes";
import { GameHistory } from "@/components/dashboard/game-history";
import { DiscoverFlashcards } from "@/components/dashboard/discover-flashcards";
import { MyFlashcards } from "@/components/dashboard/my-flashcards";
import { NewsFeed } from "@/components/dashboard/news-feed";
import { Button } from "@/components/ui/button";
import { Bell, MailOpen, PlusCircle, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { QuizGrid } from "~/components/dashboard/quiz-grid";
import { Drawer } from "vaul";
import MyStats from "~/components/dashboard/my-stats";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import AIOverview from "@/components/dashboard/aioverview";
import MyZaplits from "@/components/dashboard/myzaplits";

export default function DashboardPage() {
  const [notifications, setNotifications] = useState(3);
  const [dOpen, setDOpen] = useState(false);
  const params = useParams();
  const slug = params.page || ""; // can be undefined, string, or array
  const [activeTab, setActiveTab] = useState(slug[0] || "overview");
  const router = useRouter();

  useEffect(() => {
    const newPath = `/dashboard/${activeTab}`;
    if (slug !== newPath) {
      router.replace(newPath); // replace prevents extra history entries
      console.log(slug);
    }
  }, [activeTab]);

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <div id="notifications" className="absolute">
              <Drawer.Root
                open={dOpen}
                direction="right"
                onClose={() => setDOpen(false)} // will fire on outside click
              >
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40 z-80" />
                  <Drawer.Content
                    className="right-2 top-2 bottom-2 fixed z-80 outline-none w-[410px] flex"
                    // gap between the edge of the screen and the drawer is 8px in this case.
                    style={
                      {
                        "--initial-transform": "calc(100% + 8px)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="bg-background border m gap-4 h-full w-full grow p-5 flex flex-col rounded-[16px]">
                      <div className="max-w-md mx-auto text-center">
                        <Drawer.Title className="font-medium mb-2 text-foreground">
                          Notifications
                        </Drawer.Title>
                        <Drawer.Description className="text-foreground/75 mb-2">
                          Zapit Alpha Notifications
                        </Drawer.Description>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant={"ghost"}
                          className="hover:bg-accent gap-2"
                        >
                          <MailOpen className="h-4 w-4" /> Mark all as read
                        </Button>
                        <Button className="gap-1" variant={"ghost"}>
                          Clear all
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="overflow-y-auto space-y-2">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              You have been banned from Zapit
                            </CardTitle>
                            <X className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-xs text-muted-foreground">
                              Reason for this choice: Misuse of AI services
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Moderator Note: Just dont...
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              You have been banned from Zapit
                            </CardTitle>
                            <X className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary" />
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-xs text-muted-foreground">
                              Reason for this choice: Misuse of AI services
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Moderator Note: Just dont...
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => [setNotifications(0), setDOpen(true)]}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-xs w-5 h-5 rounded-full flex items-center justify-center text-primary-foreground">
                    {notifications}
                  </span>
                )}
              </Button>

              <Button variant="outline" size="icon">
                <UserCircle className="h-5 w-5" />
              </Button>
            </div>
            <Link href="/host">
              <Button variant="outline">Host Game</Button>
            </Link>
            <CreateQuizButton />
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          {process.env.NODE_ENV === "development" ? (
            <TabsList className="grid w-full grid-cols-5 md:w-auto md:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discover-quizzes">
                Discover Quizzes
              </TabsTrigger>
              <TabsTrigger value="discover-flashcards">
                Discover Flashcards
              </TabsTrigger>
              <TabsTrigger value="stats">My Stats</TabsTrigger>
              <TabsTrigger value="my-quizzes">My Quizzes</TabsTrigger>

              <TabsTrigger value="ai-overview">My AI Overview</TabsTrigger>

              <TabsTrigger value="my-flashcards">My Flashcards</TabsTrigger>
              <TabsTrigger value="my-zaplits">My Zaplits</TabsTrigger>
              <TabsTrigger value="history">My Game History</TabsTrigger>
            </TabsList>
          ) : (
            <div className="justify-self-center">
              <TabsList className="sticky top-20 border border-background z-50 hadow-sm grid w-full grid-cols-5 md:w-auto md:inline-flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>

                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="exam-practice">Exam Practice</TabsTrigger>

                <TabsTrigger value="discover-flashcards">
                  Discover Flashcards
                </TabsTrigger>
                <TabsTrigger value="my-flashcards">My Flashcards</TabsTrigger>
                <TabsTrigger value="my-quizzes">My Quizzes</TabsTrigger>
                <TabsTrigger value="my-zaplits">Zaplits</TabsTrigger>

                <TabsTrigger value="ai-study-plan">Study Plan</TabsTrigger>

                <TabsTrigger value="classrooms">
                  Classrooms / Groups
                </TabsTrigger>
                <TabsTrigger value="community">Community Content</TabsTrigger>

                <TabsTrigger value="performance">
                  Performance Insights
                </TabsTrigger>
                <TabsTrigger value="history">Game History</TabsTrigger>
              </TabsList>
            </div>
          )}

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quizzes</CardTitle>
                  <CardDescription>
                    Your recently created or played quizzes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentQuizzes />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used actions</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 space-y-4">
                  <Link href="/create-quiz" className="w-full">
                    <Button className="w-full" size="lg">
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Create New Quiz
                    </Button>
                  </Link>
                  <Link href="/join" className="w-full">
                    <Button variant="outline" className="w-full" size="lg">
                      Join Game
                    </Button>
                  </Link>
                  <Link href="/host" className="w-full">
                    <Button variant="outline" className="w-full" size="lg">
                      Host Game
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="stats" className="space-y-6">
            <MyStats />
          </TabsContent>
          <TabsContent value="discover-quizzes">
            <DiscoverQuizGrid />
          </TabsContent>

          <TabsContent value="my-quizzes">
            <QuizGrid />
          </TabsContent>

          <TabsContent value="discover-flashcards">
            <DiscoverFlashcards />
          </TabsContent>

          <TabsContent value="my-flashcards">
            <MyFlashcards />
          </TabsContent>

          <TabsContent value="history">
            <GameHistory />
          </TabsContent>

          <TabsContent value="ai-overview">
            <AIOverview />
          </TabsContent>
          <TabsContent value="my-zaplits">
            <MyZaplits />
          </TabsContent>
        </Tabs>

        <NewsFeed />
      </div>
    </>
  );
}
