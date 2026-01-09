"use client";

import { Image } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Autoplay from "embla-carousel-autoplay";
import {
  BookOpen,
  Coins,
  Copy,
  Earth,
  Edit,
  FileText,
  FlagTriangleRight,
  GraduationCap,
  Library,
  MoreHorizontal,
  Newspaper,
  Play,
  Plus,
  PlusCircle,
  Rss,
  Search,
  Share,
  Star,
  Stars,
  Timer,
  Trash,
  Trophy,
  Tv,
  UserRound,
  Users,
  Verified,
} from "lucide-react";
import { useState } from "react";
import { FaPerson, FaPlay } from "react-icons/fa6";
import { MdPeople, MdUpdate } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "~/components/theme/ThemeProvider";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";
import { LightningBoltIcon } from "~/components/icons/lightning-bolt-icon";
import MatrixPattern from "~/components/magicUI/matrix";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";



export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  const [quiz, setQuiz] = useState({
    id: "4",
    title: "History Champions",
    questions: 10,
    lastPlayed: "2023-12-10",
    coverImage: "/history-quiz.jpg",
    description:
      "Test your knowledge of epic events, legendary leaders, and turning points that shaped our world. Can you rise to the top and claim the title of History Champion?",
  });


  const [openQuizDrawer, setOpenQuizDrawer] = useState(false);

  const { theme } = useTheme();

  const topic = {
    name: "Stest",
    description: "Hehe kekek man",
    phrase:
      "Patience is not the absence of action, but the choice to act only when the moment is right.",
    type: "franchises",
    image: "starwars",
    keyword: "starwars",
    creators: [],
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <img
        className={`fixed w-screen h-screen opacity-25 ${theme === "light" && "invert"}`}
        src={`/images/${topic.type}/background/fixed/${topic.keyword}.png`}
      ></img>
      <div
        className={`relative mb-12 transition-all justify-self-center w-full h-full space-y-10`}
      >
        <div className="bg-transparent w-full ">
          <div className="p-5 pt-10 bg-foreground/1 backdrop-blur-[3px] shadow-md text-foreground relative flex justify-center gap-200 items-center">
            <div className="flex items-center gap-2">
              {" "}
              <div>
                <img
                  src={`/images/${topic.type}/${topic.keyword}.png`}
                  className={`p-4 h-30 w-30 ${theme === "dark" ? "invert bg-foreground" : "bg-background"}  self-center -top-20 inset-x-0 rounded-full border border-black mx-auto`}
                />

                <p className="text-center text-3xl font-medium">
                  {session?.user.displayUsername}
                </p>
                <p className="text-center">{session?.user.displayUsername}</p>
              </div>
              <div className="space-y-2  self-start">
                <div className="flex gap-2 items-center">
                  <Play className="fill-foreground" /> Total Plays: 17.3k
                </div>
                <div className="flex gap-2 items-center">
                  <Users className="fill-foreground" /> Total Players: 17.3k
                </div>
                <div className="flex gap-2 items-center">
                  <Tv className="fill-foreground" /> Total Hosted: 17.3k
                </div>
                <div className="flex gap-2 items-center">
                  <Rss className="fill-foreground" /> Total Followers: 17.3k
                </div>
              </div>
            </div>
            <div className="space-y-2 inset-y-0 self-center">
              <div className="flex gap-2 items-center">
                <Button className="gap-2 w-full">
                  Follow <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Button className="gap-2 w-full">
                  Share <Share className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Button variant={"destructive"} className="gap-2 w-full">
                  Report <FlagTriangleRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex hidden gap-4">
              <div className="flex gap-6 self-start justify-between">
                <div className="mx-auto">
                  <p className="self-start">
                    <Play className="fill-foreground mx-auto" />
                  </p>
                  500+
                </div>
                <div className="mx-auto">
                  <p className="self-start">
                    <Users className="fill-foreground" />
                  </p>
                  500+
                </div>
                <div className="mx-auto">
                  <p className="self-start">
                    <Newspaper className="fill-foreground mx-auto" />
                  </p>
                  500+
                </div>
              </div>
              <Button className="gap-4">
                Follow <Plus />
              </Button>
            </div>
          </div>
          <div className="p-5 pt-10  text-foreground relative container mx-auto space-y-15">
            <div className="space-y-4">
              <p className="text-2xl font-medium">Highlighted Collection</p>
              <div className=" justify-between space-x-6 py-0.5 rounded-md bg-foreground ">
                {" "}
                <div className="xl:flex justify-between space-x-6 p-6 rounded-md bg-background space-y-6 gap-x-10">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 rounded-xl backdrop-blur-md">
                    {[1, 2, 3, 4].map((member, index) => (
                      <div className="text-center space-y-2">
                        <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              {quiz.title}
                            </CardTitle>
                          </CardHeader>

                          <motion.div
                            className=""
                            initial={{ opacity: 0, zIndex: -100 }}
                            whileHover={{ opacity: 1, zIndex: 1 }}
                          >
                            {" "}
                            <CardContent className="pb-2">
                              <div className="flex justify-around text-sm text-foreground">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1" />
                                  <span>{quiz.questions} questions</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{quiz.plays} plays</span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-center space-x-6">
                              <Button variant={"ghost"} size="sm" asChild>
                                <Link href={`/host?quiz=${quiz.id}`}>
                                  <Play className="h-4 w-4 mr-2" />
                                  Play Solo
                                </Link>
                              </Button>
                              <Button variant={"secondary"} size="sm" asChild>
                                <Link href={`/host?quiz=${quiz.id}`}>
                                  <Play className="h-4 w-4 mr-2" />
                                  Host
                                </Link>
                              </Button>
                            </CardFooter>
                          </motion.div>
                        </Card>
                      </div>
                    ))}
                  </div>{" "}
                  <Card
                    key={quiz.id}
                    className="p-6 backdrop-blur-3xl bg-transparent text-center overflow-hidden place-self-center h-4/4 relative w-1/2 justify-items-center place-content-center border-0 shadow-md"
                  >
                    <div className="justify-items-center justify-center place-content-center items-center space-x-2 xl:w-[200px]">
                      <img
                        className={`p-6 ${theme === "dark" && "invert"}`}
                        src={`/images/${topic.type}/${topic.keyword}.png`}
                      />

                      <p className="p-4">Handpicked for everyone</p>
                    </div>
                  </Card>{" "}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 rounded-xl backdrop-blur-md">
                    {[1, 2, 3, 4].map((member, index) => (
                      <div className="text-center space-y-2">
                        <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              {quiz.title}
                            </CardTitle>
                          </CardHeader>

                          <motion.div
                            className=""
                            initial={{ opacity: 0, zIndex: -100 }}
                            whileHover={{ opacity: 1, zIndex: 1 }}
                          >
                            {" "}
                            <CardContent className="pb-2">
                              <div className="flex justify-around text-sm text-foreground">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1" />
                                  <span>{quiz.questions} questions</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{quiz.plays} plays</span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-center space-x-6">
                              <Button variant={"ghost"} size="sm" asChild>
                                <Link href={`/host?quiz=${quiz.id}`}>
                                  <Play className="h-4 w-4 mr-2" />
                                  Play Solo
                                </Link>
                              </Button>
                              <Button variant={"secondary"} size="sm" asChild>
                                <Link href={`/host?quiz=${quiz.id}`}>
                                  <Play className="h-4 w-4 mr-2" />
                                  Host
                                </Link>
                              </Button>
                            </CardFooter>
                          </motion.div>
                        </Card>
                      </div>
                    ))}
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-medium text-center">
                Quizzes made by this user
              </p>
              <div className=" justify-between space-x-6 px-0.5 rounded-md bg-foreground ">
                {" "}
                <div className="space-y-6 bg-background p-6 rounded-md">
                  <div className=" sm:flex-row  gap-4">
                    <div className="relative w-full">
                      <Input
                        placeholder="Search quizzes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="h-36 bg-muted relative">
                          <div className="absolute top-2 right-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="bg-background/80 rounded-full h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Play className="h-4 w-4 mr-2" />
                                  Host
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {quiz.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              <span>{quiz.questions} questions</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>500 plays</span>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/quiz/${quiz.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/host?quiz=${quiz.id}`}>
                              <Play className="h-4 w-4 mr-2" />
                              Host
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-medium text-center">
                Flashcards made by this user
              </p>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search flashcard sets..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-background p-4 rounded-b-md">
                {[1, 2, 3, 4, 5, 6].map((set) => (
                  <Card
                    key={set.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Test</span>
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
                      <CardDescription>Fun</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          499 cards
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">4.2</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        By Zapit
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
              </div>{" "}
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-medium">Topics owned by this user</p>
              <div className="p-4 bg-background border-t-2 border-primary rounded-t-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                  {[1].map((set) => (
                    <Card
                      key={set.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Star Wars</span>
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
                      </CardHeader>
                      <CardContent>
                        {" "}
                        <img
                          src={`/images/${topic.type}/${topic.keyword}.png`}
                          className={`p-4 h-30 w-30 ${theme === "dark" ? "invert bg-foreground" : "bg-background"}  self-center -top-20 inset-x-0 rounded-full border border-black mx-auto`}
                        />
                      </CardContent>
                      <CardFooter className="">
                        <div className="w-full group gap-x-2 mt-4 hover:border-none border h-10 text-sm font-semibold text-center rounded-md container mx-auto flex items-center justify-between  transform transition-all">
                          <Button className="w-full" variant="secondary">
                            View
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
