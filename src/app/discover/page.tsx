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
  Play,
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

  const QuizCard = ({ quiz }) => (
    <Card className="p-3 bg-transparent backdrop-blur-lg min-w-[180px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-center">{quiz.title}</CardTitle>
      </CardHeader>

      <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{quiz.questions} questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{quiz.plays} plays</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/host?quiz=${quiz.id}`}>
              <Play className="h-4 w-4 mr-1" /> Play Solo
            </Link>
          </Button>

          <Button variant="secondary" size="sm" asChild>
            <Link href={`/host?quiz=${quiz.id}`}>
              <Play className="h-4 w-4 mr-1" /> Host
            </Link>
          </Button>
        </CardFooter>
      </motion.div>
    </Card>
  );

  const [openQuizDrawer, setOpenQuizDrawer] = useState(false);

  const { theme } = useTheme();

  return (
    <>
      {" "}
      <div className="hidden container hover:contain-none transition-all justify-self-center w-screen py-4 px-4 h-screen space-y-4">
        <Card className="relative mask-b-from-20%  w-full h-2/3 center bg-no-repeat bg-cover bg-[url('/example.svg')]">
          <div className=" flex justify-between items-center inset-x-0 bottom-0 h-16 w-full p-6 sticky top-20">
            <div className="gap-2 flex items-center">
              <span className="gap-2 font-semibold flex items-center">
                <FaPlay className="h-4 w-4" />
                24k
              </span>
              <span className="gap-2 font-semibold flex items-center">
                <MdPeople className="h-6 w-6" />
                14.6k
              </span>
              <div></div>
              <Separator className="w-1/6 max-w-1/6 mx-auto mt-1" />
              <span className="gap-2 font-thin flex items-center hover:underline hover:cursor-pointer">
                <UserRound />
                Basix
              </span>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2 p-6 cursor-pointer">
                <Tv /> Host
              </Button>
              <Button
                className="gap-2 p-6 cursor-pointer bg-transparent"
                variant={"outline"}
              >
                <Play /> Play Solo
              </Button>
            </div>
          </div>
        </Card>
        <div className="p-4 flex gap-4">
          <div className="space-x-4 w-4/6 p-1">
            <div className="flex justify-between items-center">
              {" "}
              <span className="text-3xl font-bold">Preview</span>
            </div>
          </div>
          <div className="space-x-4 w/3/6 p-1">
            <div className="flex justify-between items-center">
              {" "}
              <span className="text-3xl font-bold">{quiz.title}</span>
              <div className="gap-2">
                <Button className="gap-2 cursor-pointer" variant={"ghost"}>
                  <Share />
                  Share
                </Button>
                <Button className="gap-2 cursor-pointer" variant={"ghost"}>
                  <Copy />
                  Copy
                </Button>
              </div>
            </div>

            <p className="text-2xl font-medium">{quiz.description}</p>
          </div>
          <div className="absolute flex justify-between items-center inset-x-0 bottom-0 h-16 w-full p-6">
            <span className="gap-2 items-center flex justify-between">
              <Earth />
              Public
            </span>
            <span className="gap-2 items-center flex justify-between">
              <MdUpdate />
              Updated 22.01.27
            </span>
          </div>
        </div>
      </div>
      <div className="container mb-12 hover:contain-none transition-all justify-self-center w-screen py-12 px-4 h-full space-y-10">
        <div className="space-y-4">
          <p className="text-2xl text-center font-medium flex items-center gap-2 place-self-center">
            <LightningBoltIcon />
            Daily Zapit Challenge
            <LightningBoltIcon />
          </p>
          <div className="p-6 h-auto rounded-md relative overflow-hidden">
            <svg
              className="absolute gap-x-8 w-[500%] h-[500%] inset-0 opacity-10 rotate-12 scale-150 xl:scale-100 -left-1/2"
              width="400"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="zapitPattern"
                  x="0"
                  y="0"
                  width="200"
                  height="100"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(0,0)"
                >
                  <g>
                    <path
                      viewBox="0 0 24 24"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      stroke={`${theme === "dark" ? "white" : "black"}`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                    <text
                      x="30"
                      y="20"
                      fontFamily="Arial"
                      font-size="48"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      className="font-bold outline-none text-xl tracking-tight transition-all duration-150 uppercase"
                    >
                      zapit
                    </text>
                  </g>

                  <g transform="translate(100,50)">
                    <path
                      viewBox="0 0 24 24"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      stroke={`${theme === "dark" ? "white" : "black"}`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                    <text
                      x="30"
                      y="20"
                      fontFamily="Arial"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      font-size="48"
                      className="font-bold outline-none text-xl tracking-tight transition-all duration-150 hover:text-yellow-400 uppercase"
                    >
                      zapit
                    </text>
                  </g>
                  <animateTransform
                    attributeName="patternTransform"
                    type="translate"
                    from="0,0"
                    to="200,0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </pattern>{" "}
              </defs>
              <rect width="100%" height="100%" fill="url(#zapitPattern)" />
            </svg>
            <p className="bg-gradient-to-r from-red-500 via-violet-500 to-red-500 bg-clip-text text-4xl text-center text-transparent font-bold rock-salt-regular-bold p-2 animate-gradient">
              Every point counts. Push harder, rise higher, claim your spot
            </p>

            <div className="text-3xl text-center flex items-center place-self-center my-4 gap-1 font-semibold">
              <Timer className="h-8 w-8" /> 01:23
            </div>
            <div className="relative space-y-4">
              <p className="text-2xl text-center">Awards</p>
              <div className="flex justify-center gap-6 p-2 flex-wrap">
                <div className="text-center">
                  <span className="flex items-center justify-center gap-1">
                    250 <Coins />
                  </span>
                  2nd Place
                </div>
                <div className="text-center scale-125">
                  <span className="flex items-center justify-center gap-1">
                    500 <Coins />
                  </span>
                  1st Place
                </div>
                <div className="text-center">
                  <span className="flex items-center justify-center gap-1">
                    125 <Coins />
                  </span>
                  3rd Place
                </div>
              </div>

              <Card className="bg-transparent backdrop-blur-sm mx-auto w-full md:w-3/4 xl:w-1/2 h-[40vh] overflow-hidden">
                <div className="p-3">
                  <h2 className="font-semibold text-2xl mb-3">
                    Public Leaderboard
                  </h2>

                  <AnimatePresence>
                    {[1, 2, 3].map((player, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between border-b py-2 last:border-0"
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3 w-full bg-[url('/bolt.svg')] rounded-xl p-2">
                          <div className="bg-muted w-10 h-10 flex items-center justify-center rounded-full">
                            {index + 1}th
                          </div>
                          <div className="text-xl">{player.avatar}</div>
                          <div className="font-medium">{player.name}</div>
                        </div>

                        <div className="font-mono bg-[url('/bolt.svg')] p-3 rounded-xl font-semibold">
                          {player.score}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </Card>

              <div className="w-full flex flex-col xl:flex-row gap-6">
                <div className="w-full">
                  <p className="text-2xl font-medium w-fit mx-auto mb-2">
                    Top XP Quizzes Today
                  </p>
                  <div className="flex gap-4 overflow-x-auto">
                    <QuizCard quiz={quiz} />
                    <QuizCard quiz={quiz} />
                  </div>
                </div>

                <div className="w-full">
                  <p className="text-2xl font-medium w-fit mx-auto mb-2">
                    Daily XP Challenge
                  </p>
                  <div className="flex gap-4 overflow-x-auto">
                    <QuizCard quiz={quiz} />
                    <QuizCard quiz={quiz} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">GCSE content by year</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 text-white">
            <Link href="">
              <Card
                key={quiz.id}
                className="overflow-hidden relative bg-orange-900 h-[15vh] md:h-[20vh]"
              >
                {" "}
                <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-orange-800 rounded-full opacity-40 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-orange-800 rounded-full opacity-40 blur-3xl"></div>
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-yellow-400 rounded-full opacity-40 blur-3xl"></div>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="text-4xl font-semibold text-white">Y7</span>
                </div>
                <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
                <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
                <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
              </Card>{" "}
            </Link>
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-blue-900 h-[15vh] md:h-[20vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-blue-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-blue-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-blue-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y8</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-green-900 h-[15vh] md:h-[20vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-green-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-green-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-blue-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y9</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-red-900 h-[15vh] md:h-[20vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-red-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-red-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-red-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y10</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-pink-900 h-[15vh] md:h-[20vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-pink-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-pink-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-yellow-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y11</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Discover Franchises</p>

          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="relative "
          >
            <CarouselContent>
              <CarouselItem className="group">
                <div className="rounded-md space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                      key={quiz.id}
                      className="overflow-hidden box-content h-96 relative"
                    >
                      <div className="absolute h-full w-full bg-no-repeat mask-b-from-70%  bg-cover bg-[url('/images/franchises/background/starwars.jpg')]"></div>
                      <div className="relative place-content-center text-center h-full">
                        <img
                          src="/images/franchises/starwars.png"
                          className="h-64 w-64 absolute -bottom-10 place-self-center items-center"
                        />
                      </div>
                      <motion.img
                        animate={{ y: [0, 15, 30, 45, 30, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        src="/images/franchises/overlay/starwars.png"
                        className="absolute top-0 right-0 -mt-10 -mr-4 w-40 h-60 rotate-12 place-self-center items-center"
                      />
                    </Card>{" "}
                    <Card
                      key={quiz.id}
                      className="overflow-hidden box-content h-96 relative"
                    >
                      <div className="h-full mask-b-from-20% ">
                        {" "}
                        <MatrixPattern />
                      </div>

                      <img
                        src="/images/franchises/matrix.png"
                        className="h-64 w-64 absolute -bottom-10 place-self-center items-center"
                      />

                      <img
                        src="/images/franchises/overlay/matrix.png"
                        className="scale-40 absolute bottom-15 -right-35 rotate-12 place-self-center items-center"
                      />
                    </Card>{" "}
                    <Card
                      key={quiz.id}
                      className="overflow-hidden box-content h-96 relative"
                    >
                      <img
                        src="/images/franchises/background/harrypotter.png"
                        className="mask-b-from-70% transform transition-all absolute -bottom-10 place-self-center items-center"
                      />

                      <img
                        src="/images/franchises/harrypotter.png"
                        className="absolute invert -bottom-0 scale-70 place-self-center items-center"
                      />

                      <img
                        src="/images/franchises/overlay/harrypotter.png"
                        className="scale-40 absolute bottom-0 transform scale-x-[-0.5] -right-35 rotate-12 place-self-center items-center"
                      />
                    </Card>{" "}
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="-left-12 " />
            <CarouselNext className="-right-12 " />
          </Carousel>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Student Choices</p>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-violet-500 to-fuchsia-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Math
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-red-500 to-rose-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Science
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-blue-500 to-indigo-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                English
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-lime-500 to-green-600 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                History
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-orange-500 to-amber-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Computer Science
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-violet-500 to-teal-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Social Studies
              </p>
            </Card>{" "}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Top Zapit User Choices</p>
          <div className=" justify-between space-x-6 px-0.5 rounded-md bg-linear-to-bl from-yellow-500 via-amber-500 via-30% to-rose-500 ">
            {" "}
            <div className="xl:flex justify-between space-x-6 p-6 rounded-md bg-background space-y-6">
              <Card
                key={quiz.id}
                className="p-6 backdrop-blur-3xl bg-linear-to-bl animate-gradient-1 from-yellow-500/45 via-amber-500/55 via-30% to-rose-500  text-center overflow-hidden place-self-center h-4/4 relative rounded-t-md justify-items-center place-content-center border-0 bg-transparent border-t-10 border-primary"
              >
                <div className="justify-items-center justify-center place-content-center items-center space-x-2 xl:w-[200px]">
                  <LightningBoltIcon className="h-8 w-8 text-primary" />
                  <span
                    className={`text-white font-bold outline-none text-xl tracking-tight transition-all duration-150 ${theme === "light" ? "hover:text-yellow-600/75" : "hover:text-primary"} uppercase`}
                  >
                    zapit{" "}
                    <span
                      className={`${theme === "light" ? "text-yellow-600/75" : "text-primary"}`}
                    >
                      top
                    </span>
                  </span>
                  <p className="p-4 text-white font-medium">
                    Curious what everyone else is playing? Here are top chosen
                    quizzes from Zapit users that highlight what most players
                    enjoy as of today.
                  </p>
                </div>
              </Card>{" "}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 rounded-xl backdrop-blur-md">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                  <div className="text-center space-y-2">
                    <p className="text-transparent text-stroke-white text-4xl font-bold">
                      {index + 1}
                    </p>
                    <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Community Made</p>

          <div className=" justify-between space-x-6 py-4 rounded-md  to-rose-500 ">
            <Card className="p-6 backdrop-blur-3xl text-center overflow-hidden place-self-center relative rounded-t-md justify-items-center place-content-center border-0 bg-transparent border-t-10 border-primary">
              <div className="justify-items-center justify-center place-content-center items-center space-x-2 md:w-2/3">
                <LightningBoltIcon className="h-8 w-8 text-primary" />
                <span className="text-foreground font-bold outline-none text-xl tracking-tight transition-all duration-150 hover:text-primary uppercase">
                  zapit <span className="text-primary">community</span>
                </span>
                <p>
                  Where your quizzes come to life, made by fellow players,
                  powered by players, crafted by the whole community. Something
                  to keep Zapit buzzing
                </p>
              </div>
            </Card>{" "}
            <Carousel opts={{ loop: true }} plugins={[]} className="relative ">
              <CarouselContent>
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      General School Subjects
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      Fun / Pop Culture
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>{" "}
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      Random & Fun Topics
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      Seasonal & Special Themes
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="-left-12 " />
              <CarouselNext className="-right-12 " />
            </Carousel>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Recommended By AI</p>

          <div className=" justify-between space-y-6 rounded-md">
            <Card className="text-white w-fit px-10 py-2 bg-linear-65 from-purple-500 via-50% via-rose-400 via 4 to-pink-500 backdrop-blur-3xl text-center overflow-hidden  relative rounded-t-md ">
              <div className="absolute top-2 left-2">
                <Stars className="fill-white" />
              </div>
              <p className="text-3xl uppercase font-medium truncate">
                what AI recommended for you
              </p>
              <div className="absolute bottom-2 right-2">
                <Stars className="fill-white" />
              </div>
            </Card>{" "}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                      <CardFooter className="flex justify-between">
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Post Minigame</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                      <CardFooter className="flex justify-between">
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Popular</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                    </motion.div>
                    <CardFooter className="border-t-2 p-6">
                      {" "}
                      <div className="space-y-4 w-full">
                        <div className="flex justify-between text-sm text-foreground w-full">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{quiz.plays} plays</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
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
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Trending</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                    </motion.div>
                    <CardFooter className="border-t-2 p-6">
                      {" "}
                      <div className="space-y-4 w-full">
                        <div className="flex justify-between text-sm text-foreground w-full">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{quiz.plays} plays</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
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
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Seasonal Quizzes</p>

          <div className="relative overflow-hidden justify-between space-y-10 p-4 pb-30 rounded-md  to-rose-500 ">
            <img
              className="absolute -bottom-10 -left-10 scale-110 h-full w-full"
              src="/images/seasons/background/halloween.png"
            />
            <img
              className="hidden absolute bottom-0 w-full"
              src="/images/seasons/overlay/halloween.png"
            />

            <p className="px-10 py-4 text-center bg-clip-text text-stroke-reverse bg-[url('/images/seasons/cubed/halloween.png')] bg-center  text-7xl font-[1000] text-transparent ...">
              Spooky season has arrived!
            </p>

            <div className="w-full relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 rounded-xl">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                <div className="text-center space-y-2 backdrop-blur-[3px]">
                  <Card className="p-2 space-y-4 bg-transparent relative overflow-hidden">
                    <img
                      className={`${theme === "dark" && "invert"} absolute scale-105 opacity-25 h-full w-full`}
                      src="/images/seasons/halloween.png"
                    />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg"></CardTitle>{" "}
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                      <CardFooter className="flex justify-between">
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Explore Verified Creators</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <CardFooter className="p-2">
                      {" "}
                      <Button
                        className="w-full"
                        variant={"secondary"}
                        size="sm"
                        asChild
                      >
                        <Link href={`/host?quiz=${quiz.id}`}>View</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Discover() {
  const [quiz, setQuiz] = useState({
    id: "4",
    title: "History Champions",
    questions: 10,
    lastPlayed: "2023-12-10",
    coverImage: "/history-quiz.jpg",
    description:
      "Test your knowledge of epic events, legendary leaders, and turning points that shaped our world. Can you rise to the top and claim the title of History Champion?",
  });

  const { theme } = useTheme();

  return (
    <>
      {" "}
      <div className="container overflow-y-auto mb-12 hover:contain-none transition-all justify-self-center w-screen py-12 px-4 h-full space-y-10">
        <div className="space-y-4">
          <p className="text-2xl text-center font-medium flex items-center gap-2 place-self-center">
            <LightningBoltIcon />
            Daily Zapit Challenge
            <LightningBoltIcon />
          </p>
          <div className="p-6 h-auto rounded-md relative overflow-hidden">
            <svg
              className="absolute gap-x-8 w-[500%] h-[500%] inset-0 opacity-10 rotate-12 scale-150 xl:scale-100 -left-1/2"
              width="400"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="zapitPattern"
                  x="0"
                  y="0"
                  width="200"
                  height="100"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(0,0)"
                >
                  <g>
                    <path
                      viewBox="0 0 24 24"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      stroke={`${theme === "dark" ? "white" : "black"}`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                    <text
                      x="30"
                      y="20"
                      fontFamily="Arial"
                      font-size="48"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      className="font-bold outline-none text-xl tracking-tight transition-all duration-150 uppercase"
                    >
                      zapit
                    </text>
                  </g>

                  <g transform="translate(100,50)">
                    <path
                      viewBox="0 0 24 24"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      stroke={`${theme === "dark" ? "white" : "black"}`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                    <text
                      x="30"
                      y="20"
                      fontFamily="Arial"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      font-size="48"
                      className="font-bold outline-none text-xl tracking-tight transition-all duration-150 hover:text-yellow-400 uppercase"
                    >
                      zapit
                    </text>
                  </g>
                  <animateTransform
                    attributeName="patternTransform"
                    type="translate"
                    from="0,0"
                    to="200,0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </pattern>{" "}
              </defs>
              <rect width="100%" height="100%" fill="url(#zapitPattern)" />
            </svg>
            <p className="bg-gradient-to-r from-red-500 via-violet-500 to-red-500 bg-clip-text text-4xl text-center text-transparent font-bold rock-salt-regular-bold p-2 animate-gradient">
              Every point counts. Push harder, rise higher, claim your spot
            </p>

            <div className="text-3xl text-center flex items-center place-self-center my-4 gap-1 font-semibold">
              <Timer className="h-8 w-8" /> 01:23
            </div>
            <div>
              <p className="text-2xl text-center mb-2">Awards</p>
              <div className="flex place-self-center justify-between w-4/7 xl:w-2/7 p-2">
                <div className="text-center justify-center">
                  <span className="flex gap-1">
                    250 <Coins className="mx-auto" />
                  </span>
                  2nd Place
                </div>
                <div className="text-center justify-center scale-125">
                  <span className="flex gap-2">
                    500 <Coins className="mx-auto" />
                  </span>
                  1st Place
                </div>
                <div className="text-center justify-center">
                  <span className="flex gap-1">
                    125 <Coins className="mx-auto" />
                  </span>
                  3rd Place
                </div>
              </div>
              <Card className="bg-transparent backdrop-blur-sm overflow-y-hidden overflow-x-hidden xl:h-[40vh] md:w-4/7 xl:w-2/7 mx-auto  text-3xl">
                <div className="p-2">
                  <h2 className="font-semibold mb-4 text-2xl">
                    Public Leaderboard
                  </h2>

                  <AnimatePresence>
                    {[1, 2, 3].map((player, index) => (
                      <motion.div
                        key={player.id}
                        className="flex w-full items-center justify-between my-2 border-b last:border-0"
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <div className="bg-[url('/bolt.svg')] rounded-xl w-full  flex items-center">
                          <div className="bg-muted text-lg w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            {index + 1}th
                          </div>
                          <div className="mr-3 text-xl">{player.avatar}</div>
                          <div className="font-medium">{player.name}</div>
                        </div>
                        <div className="font-mono bg-[url('/bolt.svg')] p-3 rounded-xl font-semibold px-2">
                          {player.score}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </Card>
              <div className="laptop-sm:absolute  space-y-6  xl:space-y-0 place-items-center inset-x-0 -bottom-8 w-full h-4/9 xl:flex xl:justify-between items-center">
                <div className="px-2 gap-6">
                  {" "}
                  <p className="text-2xl mx-auto mb-2 w-fit font-medium">
                    {" "}
                    Top XP Quizzes Today
                  </p>
                  <div className="space-x-3 flex justify-start h-[20vh]">
                    {" "}
                    <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg ">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-center">
                          History Quiz
                        </CardTitle>
                      </CardHeader>

                      <motion.div
                        initial={{ opacity: 0, zIndex: -100 }}
                        whileHover={{ opacity: 1, zIndex: 1 }}
                      >
                        {" "}
                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm text-foreground">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              <span>37 questions</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>5k plays</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2">
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
                    <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg ">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-center">
                          History Quiz
                        </CardTitle>
                      </CardHeader>

                      <motion.div
                        initial={{ opacity: 0, zIndex: -100 }}
                        whileHover={{ opacity: 1, zIndex: 1 }}
                      >
                        {" "}
                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm text-foreground">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              <span>37 questions</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>5k plays</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2">
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
                </div>
                <div className="px-2 gap-6">
                  {" "}
                  <p className="text-2xl mx-auto mb-2 w-fit font-medium">
                    Daily XP Challenge
                  </p>
                  <div className="space-x-3 flex justify-start h-[20vh]">
                    {" "}
                    <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg ">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-center">
                          History Quiz
                        </CardTitle>
                      </CardHeader>

                      <motion.div
                        initial={{ opacity: 0, zIndex: -100 }}
                        whileHover={{ opacity: 1, zIndex: 1 }}
                      >
                        {" "}
                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm text-foreground">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              <span>37 questions</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>5k plays</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2">
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
                    <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg ">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-center">
                          History Quiz
                        </CardTitle>
                      </CardHeader>

                      <motion.div
                        initial={{ opacity: 0, zIndex: -100 }}
                        whileHover={{ opacity: 1, zIndex: 1 }}
                      >
                        {" "}
                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm text-foreground">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              <span>37 questions</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>5k plays</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">GCSE content by year</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-white">
            <Link href="">
              <Card
                key={quiz.id}
                className="overflow-hidden relative bg-orange-900 h-[15vh]"
              >
                {" "}
                <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-orange-800 rounded-full opacity-40 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-orange-800 rounded-full opacity-40 blur-3xl"></div>
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-yellow-400 rounded-full opacity-40 blur-3xl"></div>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="text-4xl font-semibold text-white">Y7</span>
                </div>
                <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
                <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
                <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
              </Card>{" "}
            </Link>
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-blue-900 h-[15vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-blue-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-blue-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-blue-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y8</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-green-900 h-[15vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-green-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-green-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-blue-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y9</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-red-900 h-[15vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-red-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-red-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-red-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y10</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden relative bg-pink-900 h-[15vh]"
            >
              <div className="absolute top-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-pink-800 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-pink-800 rounded-full opacity-40 blur-3xl"></div>

              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-yellow-400 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">Y11</span>
              </div>
              <GraduationCap className="absolute end-10 top-5 scale-150 fill-white text-white rotate-12 opacity-25" />
              <Library className="absolute end-20 bottom-5 scale-150 fill-white text-white -rotate-12 opacity-25" />
              <LightningBoltIcon className="absolute -left-7.5 w-30 h-30 sm-height:w-52 sm-height:h-52 xl-height:w-64 xl-height:h-64  sm-height:-bottom-4 sm-height:-left-16" />
            </Card>{" "}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Discover Franchises</p>

          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="relative "
          >
            <CarouselContent>
              <CarouselItem className="group">
                <div className="rounded-md space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                      key={quiz.id}
                      className="overflow-hidden box-content h-96 relative"
                    >
                      <div className="absolute h-full w-full bg-no-repeat mask-b-from-70%  bg-cover bg-[url('/images/franchises/background/starwars.jpg')]"></div>
                      <div className="relative place-content-center text-center h-full">
                        <img
                          src="/images/franchises/starwars.png"
                          className="h-64 w-64 absolute -bottom-10 place-self-center items-center"
                        />
                      </div>
                      <motion.img
                        animate={{ y: [0, 15, 30, 45, 30, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        src="/images/franchises/overlay/starwars.png"
                        className="scale-50 absolute -bottom-20 -right-40 rotate-12 place-self-center items-center"
                      />
                    </Card>{" "}
                    <Card
                      key={quiz.id}
                      className="overflow-hidden box-content h-96 relative"
                    >
                      <div className="h-full mask-b-from-20% ">
                        {" "}
                        <MatrixPattern />
                      </div>

                      <img
                        src="/images/franchises/matrix.png"
                        className="h-64 w-64 absolute -bottom-10 place-self-center items-center"
                      />

                      <img
                        src="/images/franchises/overlay/matrix.png"
                        className="scale-40 absolute bottom-15 -right-35 rotate-12 place-self-center items-center"
                      />
                    </Card>{" "}
                    <Card
                      key={quiz.id}
                      className="overflow-hidden box-content h-96 relative"
                    >
                      <img
                        src="/images/franchises/background/harrypotter.png"
                        className="mask-b-from-70% transform transition-all  -bottom-10 place-self-center items-center"
                      />

                      <img
                        src="/images/franchises/harrypotter.png"
                        className="absolute invert -bottom-0 scale-70 place-self-center items-center"
                      />

                      <img
                        src="/images/franchises/overlay/harrypotter.png"
                        className="scale-40 absolute bottom-0 transform scale-x-[-0.5] -right-35 rotate-12 place-self-center items-center"
                      />
                    </Card>{" "}
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="-left-12 " />
            <CarouselNext className="-right-12 " />
          </Carousel>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Student Choices</p>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-violet-500 to-fuchsia-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Math
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-red-500 to-rose-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Science
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-blue-500 to-indigo-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                English
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-lime-500 to-green-600 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                History
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-orange-500 to-amber-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Computer Science
              </p>
            </Card>{" "}
            <Card
              key={quiz.id}
              className="overflow-hidden bg-linear-to-bl from-violet-500 to-teal-500 to-90% box-content h-96 relative rounded-t-md border-0 rounded-b-none border-b-10 border-primary"
            >
              <p className="absolute bottom-10 inset-x-0 text-3xl font-medium text-center">
                Social Studies
              </p>
            </Card>{" "}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Top Zapit User Choices</p>
          <div className=" justify-between space-x-6 px-0.5 rounded-md bg-linear-to-bl from-yellow-500 via-amber-500 via-30% to-rose-500 ">
            {" "}
            <div className="xl:flex justify-between space-x-6 p-6 rounded-md bg-background space-y-6">
              <Card
                key={quiz.id}
                className="p-6 backdrop-blur-3xl bg-linear-to-bl animate-gradient-1 from-yellow-500/45 via-amber-500/55 via-30% to-rose-500  text-center overflow-hidden place-self-center h-4/4 relative rounded-t-md justify-items-center place-content-center border-0 bg-transparent border-t-10 border-primary"
              >
                <div className="justify-items-center justify-center place-content-center items-center space-x-2 xl:w-[200px]">
                  <LightningBoltIcon className="h-8 w-8 text-primary" />
                  <span
                    className={`text-white font-bold outline-none text-xl tracking-tight transition-all duration-150 ${theme === "light" ? "hover:text-yellow-600/75" : "hover:text-primary"} uppercase`}
                  >
                    zapit{" "}
                    <span
                      className={`${theme === "light" ? "text-yellow-600/75" : "text-primary"}`}
                    >
                      top
                    </span>
                  </span>
                  <p className="p-4 text-white font-medium">
                    Curious what everyone else is playing? Here are top chosen
                    quizzes from Zapit users that highlight what most players
                    enjoy as of today.
                  </p>
                </div>
              </Card>{" "}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 rounded-xl backdrop-blur-md">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                  <div className="text-center space-y-2">
                    <p className="text-transparent text-stroke-white text-4xl font-bold">
                      {index + 1}
                    </p>
                    <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Community Made</p>

          <div className=" justify-between space-x-6 py-4 rounded-md  to-rose-500 ">
            <Card className="p-6 backdrop-blur-3xl text-center overflow-hidden place-self-center relative rounded-t-md justify-items-center place-content-center border-0 bg-transparent border-t-10 border-primary">
              <div className="justify-items-center justify-center place-content-center items-center space-x-2 md:w-2/3">
                <LightningBoltIcon className="h-8 w-8 text-primary" />
                <span className="text-foreground font-bold outline-none text-xl tracking-tight transition-all duration-150 hover:text-primary uppercase">
                  zapit <span className="text-primary">community</span>
                </span>
                <p>
                  Where your quizzes come to life, made by fellow players,
                  powered by players, crafted by the whole community. Something
                  to keep Zapit buzzing
                </p>
              </div>
            </Card>{" "}
            <Carousel opts={{ loop: true }} plugins={[]} className="relative ">
              <CarouselContent>
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      General School Subjects
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      Fun / Pop Culture
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>{" "}
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      Random & Fun Topics
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>
                <CarouselItem className="group">
                  <div className="rounded-md space-y-5">
                    <p className="py-2 w-fit transform transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                      Seasonal & Special Themes
                    </p>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  rounded-xl backdrop-blur-md">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                        <div className="text-center space-y-2">
                          <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {quiz.title}
                              </CardTitle>
                            </CardHeader>

                            <motion.div
                              initial={{ opacity: 0, zIndex: -100 }}
                              whileHover={{ opacity: 1, zIndex: 1 }}
                            >
                              {" "}
                              <CardContent className="pb-2">
                                <div className="flex justify-between text-sm text-foreground">
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
                              <CardFooter className="flex justify-between">
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
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="-left-12 " />
              <CarouselNext className="-right-12 " />
            </Carousel>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Recommended By AI</p>

          <div className=" justify-between space-y-6 rounded-md">
            <Card className="text-white w-fit px-10 py-2 bg-linear-65 from-purple-500 via-50% via-rose-400 via 4 to-pink-500 backdrop-blur-3xl text-center overflow-hidden  relative rounded-t-md ">
              <div className="absolute top-2 left-2">
                <Stars className="fill-white" />
              </div>
              <p className="text-3xl uppercase font-medium truncate">
                what AI recommended for you
              </p>
              <div className="absolute bottom-2 right-2">
                <Stars className="fill-white" />
              </div>
            </Card>{" "}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                      <CardFooter className="flex justify-between">
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Post Minigame</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                      <CardFooter className="flex justify-between">
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Popular</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                    </motion.div>
                    <CardFooter className="border-t-2 p-6">
                      {" "}
                      <div className="space-y-4 w-full">
                        <div className="flex justify-between text-sm text-foreground w-full">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{quiz.plays} plays</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
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
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Trending</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                    </motion.div>
                    <CardFooter className="border-t-2 p-6">
                      {" "}
                      <div className="space-y-4 w-full">
                        <div className="flex justify-between text-sm text-foreground w-full">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{quiz.plays} plays</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
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
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-2xl font-medium">Seasonal Quizzes</p>

          <div className="relative overflow-hidden justify-between space-y-10 p-4 pb-30 rounded-md  to-rose-500 ">
            <img
              className="absolute -bottom-10 -left-10 scale-110 h-full w-full"
              src="/images/seasons/background/halloween.png"
            />
            <img
              className="hidden absolute bottom-0 w-full"
              src="/images/seasons/overlay/halloween.png"
            />

            <p className="px-10 py-4 text-center bg-clip-text text-stroke-reverse bg-[url('/images/seasons/cubed/halloween.png')] bg-center  text-7xl font-[1000] text-transparent ...">
              Spooky season has arrived!
            </p>

            <div className="w-full relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 rounded-xl">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((member, index) => (
                <div className="text-center space-y-2 backdrop-blur-[3px]">
                  <Card className="p-2 space-y-4 bg-transparent relative overflow-hidden">
                    <img
                      className={`${theme === "dark" && "invert"} absolute scale-105 opacity-25 h-full w-full`}
                      src="/images/seasons/halloween.png"
                    />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg"></CardTitle>{" "}
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <motion.div
                      initial={{ opacity: 0, zIndex: -100 }}
                      whileHover={{ opacity: 1, zIndex: 1 }}
                    >
                      {" "}
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-foreground">
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
                      <CardFooter className="flex justify-between">
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
        <div className="space-y-4">
          <p className="text-2xl font-medium">Explore Verified Creators</p>

          <div className=" justify-between space-y-6 rounded-md">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl backdrop-blur-md">
              {[1, 2, 3, 4].map((member, index) => (
                <div className="text-center space-y-2">
                  <Card className="p-2 space-y-4 bg-transparent backdrop-blur-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>

                    <CardFooter className="p-2">
                      {" "}
                      <Button
                        className="w-full"
                        variant={"secondary"}
                        size="sm"
                        asChild
                      >
                        <Link href={`/host?quiz=${quiz.id}`}>View</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
