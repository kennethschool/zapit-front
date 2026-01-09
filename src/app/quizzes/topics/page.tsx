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
  Coins,
  Copy,
  Earth,
  Edit,
  FileText,
  GraduationCap,
  Library,
  MoreHorizontal,
  Newspaper,
  Play,
  Plus,
  Share,
  Stars,
  Timer,
  Trash,
  Trophy,
  Tv,
  UserRound,
  Users,
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

export default function QuizCreation() {
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
    name: "Star Wars",
    description: "Hehe kekek man",
    phrase:
      "Patience is not the absence of action, but the choice to act only when the moment is right.",
    type: "franchises",
    image: "starwars",
    keyword: "starwars",
    creators: [],
  };

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
          <img
            className="mask-x-from-70% mask-x-to-105% h-48 self-center mx-auto object-fill w-full"
            src={`/images/${topic.type}/banner/${topic.keyword}.png`}
          ></img>
          <div className="p-5 pt-10 bg-foreground/1 backdrop-blur-[3px] shadow-md text-foreground relative">
            <div className="absolute start-1/4 space-y-2 inset-y-0 self-center">
              <div className="flex gap-2 items-center">
                <Play className="fill-foreground" /> 17.3k
              </div>
              <div className="flex gap-2 items-center">
                <Users className="fill-foreground" /> 17.3k
              </div>
              <div className="flex gap-2 items-center">
                <Tv className="fill-foreground" /> 17.3k
              </div>
            </div>

            <img
              src={`/images/${topic.type}/${topic.keyword}.png`}
              className={`p-2 h-30 w-30 ${theme === "dark" ? "invert bg-foreground" : "bg-background"} absolute self-center -top-20 inset-x-0 rounded-lg border border-black mx-auto`}
            />

            <p className="text-center text-3xl font-medium">Star Wars</p>
            <p className="text-center">https://www.starwars.com/</p>
            <div className="absolute my-2 end-1/4 space-y-2 inset-y-0 self-center">
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
          <div className="p-5 pt-10  text-foreground relative container mx-auto">
            <p className="text-center text-4xl font-bold mb-12">
              {topic.phrase}
            </p>
            <div className="space-y-4">
              <p className="text-2xl font-medium">Obi-wan's pack</p>
              <div className=" justify-between space-x-6 py-0.5 rounded-md bg-foreground ">
                {" "}
                <div className="xl:flex justify-between space-x-6 p-6 rounded-md bg-background space-y-6">
                  <Card
                    key={quiz.id}
                    className="p-6 backdrop-blur-3xl bg-transparent text-center overflow-hidden place-self-center h-4/4 relative  justify-items-center place-content-center border-0 shadow-md"
                  >
                    <div className="justify-items-center justify-center place-content-center items-center space-x-2 xl:w-[200px]">
                      <img
                        className={`p-6 ${theme === "dark" && "invert"}`}
                        src={`/images/${topic.type}/${topic.keyword}.png`}
                      />

                      <p className="p-4">
                        See what the creators of Star Wars suggest for you to
                        try!
                      </p>
                    </div>
                  </Card>{" "}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 rounded-xl backdrop-blur-md">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
