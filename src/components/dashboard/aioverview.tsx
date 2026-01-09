"use client";
import React, { useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight,
  Edit,
  FileText,
  HamburgerIcon,
  Lightbulb,
  Menu,
  MoreHorizontal,
  Play,
  Share,
  Trash,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";

const ProgressApexChart = () => {
  const [state] = React.useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: true },
        background: "transparent",
        foreColor: "#fff",
      },
      theme: { mode: "dark" },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      colors: ["#fab505"],
      grid: {
        row: { colors: ["transparent", "transparent"], opacity: 0.5 },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  });

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="line"
      height="100%"
    />
  );
};

const MOCK_QUIZZES = {
  id: "1",
  title: "Math Fundamentals",
  questions: 12,
  lastPlayed: "2 days ago",
  plays: 24,
  isPublic: true,
  coverImage: "/math-MOCK_QUIZZES.jpg",
};

const AIOverview = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-4 flex flex-col" style={{ height: "300px" }}>
        <p className="text-3xl">Performance</p>
        <div className="p-8 bg-foreground/1 rounded-md overflow-hidden flex gap-8 flex-1 shadow">
          <div>
            <img
              className="w-28 h-28 rounded-full shadow border-foreground"
              src={
                "https://static.vecteezy.com/system/resources/previews/041/759/127/non_2x/ai-generated-ai-processor-chip-black-line-icon-technology-and-artificial-intelligence-outline-concept-illustration-on-white-background-vector.jpg"
              }
              alt="avatar"
            />
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-start">
            <p className="text-3xl font-semibold">Correct Answer rate</p>
            <p className="text-4xl font-bold">78%</p>
            <p className="text-1xl flex justify-between">
              Accuracy <span className="font-bold">72%</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="space-y-4 col-span-2 flex flex-col"
        style={{ height: "300px" }}
      >
        <p className="text-3xl">Predicted Progress</p>
        <div className="p-8 bg-foreground/1 rounded-md overflow-hidden flex-1">
          <ProgressApexChart />
        </div>
      </div>{" "}
      <div className="space-y-4 flex flex-col" style={{ height: "300px" }}>
        <p className="text-3xl">Strengths and Weaknesses</p>
        <div className="p-8 text-left justify-items-center bg-foreground/1 rounded-md overflow-hidden flex gap-8 flex-1 shadow">
          <div className="w-1/2 space-y-5">
            <p className="font-semibold">Strengths</p>
            <div className="space-y-2">
              <p className="text-foreground/50">Social Studies</p>
              <p className="text-foreground/50">Maths</p>
              <p className="text-foreground/50">Language Arts</p>
            </div>
          </div>
          <div className="w-1/2 space-y-5">
            <p className="font-semibold">Weaknesses</p>
            <div className="space-y-2">
              <p className="text-foreground/50">Science</p>
              <p className="text-foreground/50">History</p>
              <p className="text-foreground/50">Geography</p>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="space-y-4 flex flex-col" style={{ height: "300px" }}>
        <p className="text-3xl">Recommended Quizzes</p>
        <div className="p-4 bg-foreground/1 rounded-md overflow-hidden flex gap-8 flex-1 shadow">
          <div className="w-full space-y-3">
            <Card
              key={MOCK_QUIZZES.id}
              className="overflow-hidden relative bg-transparent"
            >
              <div className="absolute top-4 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
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

              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{MOCK_QUIZZES.title}</CardTitle>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{MOCK_QUIZZES.questions}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{MOCK_QUIZZES.plays}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between mt-5">
                <Button
                  className="rounded-full w-10 h-10"
                  variant={"secondary"}
                  size="sm"
                  asChild
                >
                  <Link href={`/host?quiz=${MOCK_QUIZZES.id}`}>
                    <Play className="h-full w-full" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
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
        </div>
      </div>{" "}
      <div className="space-y-4 flex flex-col" style={{ height: "300px" }}>
        <p className="text-3xl">AI Mode</p>
        <div className="p-8 bg-foreground/1 justify-items-center rounded-md overflow-hidden flex gap-8 flex-1 shadow relative">
          <div className="w-full h-full text-center justify-center space-y-4">
            <p className="text-center text-2xl font-semibold">
              Set the mode of O.W.E.N. AI
            </p>
            <RadioGroup className="grid grid-cols-2 h-2/3">
              <div className="flex gap-x-1.5 items-center justify-center">
                <RadioGroupItem value="standard"></RadioGroupItem>
                <p>Standard</p>
              </div>{" "}
              <div className="flex gap-x-1.5 items-center justify-center">
                <RadioGroupItem value="adventurous"></RadioGroupItem>
                <p>Adventurous</p>
              </div>{" "}
              <div className="flex gap-x-1.5 items-center justify-center">
                <RadioGroupItem value="extreme"></RadioGroupItem>
                <p>Extreme</p>
              </div>{" "}
              <div className="flex gap-x-1.5 items-center justify-center">
                <RadioGroupItem value="spectacular"></RadioGroupItem>
                <p>Spectacular</p>
              </div>
            </RadioGroup>
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-primary/50">
            <p className="font-semibold text-md text-center">
              Spectacular mode is on
            </p>
          </div>
        </div>
      </div>{" "}
      <div className="space-y-4 flex flex-col" style={{ height: "300px" }}>
        <p className="text-3xl">Recommended Topics</p>
        <div className="p-3 bg-foreground/1 rounded-md overflow-hidden gap-8 overflow-y-auto">
          <div className="space-y-4 flex-1 flex flex-col justify-start">
            <div className="p-4 rounded-md bg-foreground/2.5 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  Founder Fathers of America
                </p>
                <div className="gap-x-2 flex items-center">
                  {" "}
                  <p className="text-default/50 font-light">
                    Social Studies
                  </p>{" "}
                  <div className="" style={{ width: 15, height: 15 }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        textColor: "#f88",
                        pathColor: "#fab505",
                      })}
                      value={66}
                    />
                  </div>{" "}
                  <p className="text-default/50">67%</p>{" "}
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                  className="cursor pointer"
                >
                  <Link href={`/lesson?id=1234`}>
                    <ArrowRight />
                  </Link>
                </motion.div>
              </div>
            </div>{" "}
            <div className="p-4 rounded-md bg-foreground/2.5 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  Founder Fathers of America
                </p>
                <div className="gap-x-2 flex items-center">
                  {" "}
                  <p className="text-default/50 font-light">
                    Social Studies
                  </p>{" "}
                  <div className="" style={{ width: 15, height: 15 }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        textColor: "#f88",
                        pathColor: "#fab505",
                      })}
                      value={66}
                    />
                  </div>{" "}
                  <p className="text-default/50">67%</p>{" "}
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                  className="cursor pointer"
                >
                  <Link href={`/lesson?id=1234`}>
                    <ArrowRight />
                  </Link>
                </motion.div>
              </div>
            </div>
            <div className="p-4 rounded-md bg-foreground/2.5 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  Founder Fathers of America
                </p>
                <div className="gap-x-2 flex items-center">
                  {" "}
                  <p className="text-default/50 font-light">
                    Social Studies
                  </p>{" "}
                  <div className="" style={{ width: 15, height: 15 }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        textColor: "#f88",
                        pathColor: "#fab505",
                      })}
                      value={66}
                    />
                  </div>{" "}
                  <p className="text-default/50">67%</p>{" "}
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                  className="cursor pointer"
                >
                  <Link href={`/lesson?id=1234`}>
                    <ArrowRight />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div
        className="space-y-4 flex flex-col col-span-2  row-span-2"
        style={{ height: "620px" }}
      >
        <p className="text-3xl">O.W.E.N. Chatbot</p>
        <div className="p-2 bg-foreground/0 rounded-md overflow-hidden flex gap-8 flex-1 shadow h-full">
          <div className="w-full">
            <PanelGroup
              className="w-full border-none rounded-md bg-foreground/1.5"
              autoSaveId="example"
              direction="horizontal"
            >
              <Panel
                className="p-4 relative flex flex-col space-y-5 h-full"
                defaultSizePercentage={25}
              >
                <div className="bg-foreground/1 p-4 rounded-md shadow-md">
                  <p>ChatID: 32dqwa-3egjq-23rsag</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 rounded p-4 transition-all">
                  <div className="p-4 bg-foreground/2.5 justify-between">
                    <div className="p-2">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <div>
                        <p className="text-lg font-bold">P Diddy</p>
                        <p className="text-sm font-light">P Diddy</p>
                      </div>
                      <img
                        className="w-10 h-10 rounded-full shadow border-foreground"
                        src="https://static.vecteezy.com/system/resources/previews/041/759/127/non_2x/ai-generated-ai-processor-chip-black-line-icon-technology-and-artificial-intelligence-outline-concept-illustration-on-white-background-vector.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-foreground/2.5 justify-between">
                    <div className="p-2">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <div>
                        <p className="text-lg font-bold">P Diddy</p>
                        <p className="text-sm font-light">P Diddy</p>
                      </div>
                      <img
                        className="w-10 h-10 rounded-full shadow border-foreground"
                        src="https://static.vecteezy.com/system/resources/previews/041/759/127/non_2x/ai-generated-ai-processor-chip-black-line-icon-technology-and-artificial-intelligence-outline-concept-illustration-on-white-background-vector.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-foreground/2.5 justify-between">
                    <div className="p-2">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <div>
                        <p className="text-lg font-bold">P Diddy</p>
                        <p className="text-sm font-light">P Diddy</p>
                      </div>
                      <img
                        className="w-10 h-10 rounded-full shadow border-foreground"
                        src="https://static.vecteezy.com/system/resources/previews/041/759/127/non_2x/ai-generated-ai-processor-chip-black-line-icon-technology-and-artificial-intelligence-outline-concept-illustration-on-white-background-vector.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-foreground/2.5 justify-between">
                    <div className="p-2">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <div>
                        <p className="text-lg font-bold">P Diddy</p>
                        <p className="text-sm font-light">P Diddy</p>
                      </div>
                      <img
                        className="w-10 h-10 rounded-full shadow border-foreground"
                        src="https://static.vecteezy.com/system/resources/previews/041/759/127/non_2x/ai-generated-ai-processor-chip-black-line-icon-technology-and-artificial-intelligence-outline-concept-illustration-on-white-background-vector.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-foreground/2.5 justify-between">
                    <div className="p-2">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <div>
                        <p className="text-lg font-bold">P Diddy</p>
                        <p className="text-sm font-light">P Diddy</p>
                      </div>
                      <img
                        className="w-10 h-10 rounded-full shadow border-foreground"
                        src="https://static.vecteezy.com/system/resources/previews/041/759/127/non_2x/ai-generated-ai-processor-chip-black-line-icon-technology-and-artificial-intelligence-outline-concept-illustration-on-white-background-vector.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-foreground/2.5 justify-between">
                    <div className="p-2">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <div>
                        <p className="text-lg font-bold">P Diddy</p>
                        <p className="text-sm font-light">P Diddy</p>
                      </div>
                      <img
                        className="w-10 h-10 rounded-full shadow border-foreground"
                        src="https://static.vecteezy.com/system/resources/previews/041/759/127/non_2x/ai-generated-ai-processor-chip-black-line-icon-technology-and-artificial-intelligence-outline-concept-illustration-on-white-background-vector.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-auto w-full p-4">
                  <input
                    placeholder="Input request..."
                    className="w-full shadow-md outline-none bg-foreground/2 p-4 rounded-md"
                  />
                </div>
              </Panel>

              <PanelResizeHandle>
                <div
                  className="bg-foreground/10"
                  style={{ width: "1px", height: "100%" }}
                />
              </PanelResizeHandle>

              <Panel className="p-2" minSize={30} maxSize={50}>
                <div className="p-2">
                  {" "}
                  <div className="bg-foreground/1 overflow-hidden px-4 shadow-md py-2 transition-all rounded flex justify-between items-center">
                    <p className="font-semibold ">LOWN-1</p>
                    <motion.div
                      transition={{ repeat: Infinity }}
                      whileHover={{ scale: [1.1, 1, 1.1, 1, 1.1] }}
                    >
                      <Button variant={"ghost"}>
                        {" "}
                        <Menu />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      </div>{" "}
      <div className="space-y-4 flex flex-col" style={{ height: "300px" }}>
        <p className="text-3xl">Recent Tips from OWEN</p>
        <div className="p-8 bg-foreground/1 rounded-md overflow-hidden shadow h-full relative">
          <div className="space-y-4 flex-1 h-full flex flex-col justify-start">
            <p className="text-3xl font-semibold">Quick Advice!</p>
            <p className="text-2xl font-light h-full  text-wrap truncate">
              "Try to answer more questions right"
            </p>
          </div>
          <div className="p-2 bottom-8 absolute inset-x-8 justify-self-end">
            <motion.div
              className="group"
              initial={{
                scale: 1,
                rotate: 0,
              }}
              whileHover={{
                color: "yellow",
                rotate: [-10, 0, 10, 0, -10],
                scale: [1.25, 1.25],
                transition: { duration: 0.5, repeat: Infinity },
              }}
            >
              <Lightbulb className="group-hover:fill-yellow-200 transition-all w-14 h-14" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOverview;
