"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Autoplay from "embla-carousel-autoplay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  ExternalLink,
  FileText,
  MoreHorizontal,
  Play,
  Plus,
  Share,
  Trash,
  Users,
} from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

// mock data for demonstration
const MOCK_QUIZZES = [
  {
    id: "1",
    title: "Math Fundamentals",
    questions: 12,
    lastPlayed: "2 days ago",
    plays: 24,
    isPublic: true,
    coverImage: "/math-quiz.jpg",
  },
  {
    id: "2",
    title: "Science Quiz",
    questions: 15,
    lastPlayed: "5 days ago",
    plays: 18,
    isPublic: true,
    coverImage: "/science-quiz.jpg",
  },
  {
    id: "3",
    title: "History Champions",
    questions: 10,
    lastPlayed: "1 week ago",
    plays: 32,
    isPublic: false,
    coverImage: "/history-quiz.jpg",
  },
  {
    id: "4",
    title: "English Literature",
    questions: 20,
    lastPlayed: "2 weeks ago",
    plays: 12,
    isPublic: true,
    coverImage: "/english-quiz.jpg",
  },
  {
    id: "5",
    title: "Geography Trivia",
    questions: 18,
    lastPlayed: "3 weeks ago",
    plays: 15,
    isPublic: false,
    coverImage: "/geography-quiz.jpg",
  },
  {
    id: "6",
    title: "Geography Trivia",
    questions: 18,
    lastPlayed: "3 weeks ago",
    plays: 15,
    isPublic: false,
    coverImage: "/geography-quiz.jpg",
  },
];

interface DiscoverQuizGrid {
  type: string;
}

export function DiscoverQuizGrid({ type }: DiscoverQuizGrid) {
  const [searchTerm, setSearchTerm] = useState(type || "");

  const [openQuizDrawer, setOpenQuizDrawer] = useState(false);

  const filteredQuizzes = MOCK_QUIZZES.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Link href="/discover">
            {" "}
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Discover
            </Button>
          </Link>

          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Link href="/quizzes/creation">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-4">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false, //don't stop when user swipes/clicks
              stopOnMouseEnter: true, // pause on hover, resume on leave
            }),
          ]}
          className="relative "
        >
          <CarouselContent>
            <CarouselItem className="group">
              <div className="rounded-md space-y-5">
                <p className="transform w-fit transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                  General School Subjects
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="overflow-hidden">
                      <div className="h-36 bg-muted relative">
                        {quiz.coverImage ? (
                          <img
                            src={quiz.coverImage}
                            alt={quiz.title}
                            className="w-[300px] h-[90px] md:w-[483px] md:h-[144px] object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <FileText className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
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
                                <Link href={"/quizzes/edit"}>
                                <Edit className="h-4 w-4 mr-2" />
                                </Link>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                              <Link href={"/host"}>
                                <Play className="h-4 w-4 mr-2" />
                                </Link>
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
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
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
                        <Button variant={"outline"} size="sm" asChild>
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
                    </Card>
                  ))}
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="group">
              <div className="rounded-md space-y-3">
                <p className="transform w-fit transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                  Fun / Pop Culture
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="overflow-hidden">
                      <div className="h-36 bg-muted relative">
                        {quiz.coverImage ? (
                          <img
                            src={quiz.coverImage}
                            alt={quiz.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <FileText className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
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
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
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
                        <Button variant={"outline"} size="sm" asChild>
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
                    </Card>
                  ))}
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="group">
              <div className="rounded-md space-y-3">
                <p className="transform w-fit transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                  Random & Fun Topics
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="overflow-hidden">
                      <div className="h-36 bg-muted relative">
                        {quiz.coverImage ? (
                          <img
                            src={quiz.coverImage}
                            alt={quiz.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <FileText className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
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
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
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
                        <Button variant={"outline"} size="sm" asChild>
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
                    </Card>
                  ))}
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="group">
              <div className="rounded-md space-y-3">
                <p className="transform w-fit transition-all border-b-2 group-hover:border-b-4 group-hover:pb-1 group-hover:font-semibold group-hover:border-primary group-hover:rounded">
                  Seasonal & Special Themes
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="overflow-hidden">
                      <div className="h-36 bg-muted relative">
                        {quiz.coverImage ? (
                          <img
                            src={quiz.coverImage}
                            alt={quiz.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <FileText className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
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
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
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
                        <Button variant={"outline"} size="sm" asChild>
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
                    </Card>
                  ))}
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

       
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </Carousel>
      </div>
      {filteredQuizzes.length === 0 && (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="mb-4 text-muted-foreground">No quizzes found</p>
          <Link href="/quizzes/creation">
            <Button>Create Quiz</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
