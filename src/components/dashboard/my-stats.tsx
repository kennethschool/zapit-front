import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Award, ListChecks, Clock, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth-client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MdArrowDropDown } from "react-icons/md";
import { useTheme } from "../theme/ThemeProvider";
import { toast } from "react-toastify";

export default function MyStats() {
  const { data: session } = authClient.useSession();
  const { theme } = useTheme();
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

  const HeatmapChart = () => {
    const options = {
      chart: {
        toolbar: { show: false },
        type: "heatmap",
        background: "transparent",
        foreColor: theme === "dark" ? "#fff" : "#000",
      },
      theme: {
        mode: theme,
      },

      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      stroke: {
        width: 0,
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#fab505"],
    };

    const series = [
      {
        name: "Language Arts",
        data: [
          { x: "W1", y: 22 },
          { x: "W2", y: 29 },
          { x: "W3", y: 13 },
          { x: "W4", y: 32 },
          { x: "W5", y: 21 },
        ],
      },
      {
        name: "Maths",
        data: [
          { x: "W1", y: 43 },
          { x: "W2", y: 43 },
          { x: "W3", y: 20 },
          { x: "W4", y: 36 },
          { x: "W5", y: 21 },
        ],
      },
      {
        name: "Geography",
        data: [
          { x: "W1", y: 11 },
          { x: "W2", y: 17 },
          { x: "W3", y: 15 },
          { x: "W4", y: 21 },
          { x: "W5", y: 21 },
        ],
      },
    ];

    return (
      <div className="text-white">
        {/*@ts-ignore*/}
        <Chart options={options} series={series} type="heatmap" />
      </div>
    );
  };

  const LineApexChart = () => {
    const [state, setState] = React.useState({
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      options: {
        chart: {
          toolbar: { show: false },
          background: "transparent",
          foreColor: theme === "dark" ? "#fff" : "#000",
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        colors: ["#fab505", "transparent"],
        theme: {
          mode: "light",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },

        grid: {
          show: false,
          row: {
            colors: ["#fab505", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    });

    return (
      <div>
        <div>
          <Chart
            //@ts-ignore
            options={state.options}
            series={state.series}
            type="line"
          />
        </div>
      </div>
    );
  };

  const FlashcardActivity = () => {
    const options = {
      chart: {
        id: "flashcard-activity",
        type: "area",
        toolbar: { show: false },
        background: "transparent",
        foreColor: theme === "dark" ? "#fff" : "#000",
      },
      colors: ["#FFD700", "#00E396", "#008FFB"],
      dataLabels: { enabled: false },
      theme: {
        mode: theme,
      },
      stroke: { curve: "smooth", width: 2 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        title: { text: "Flashcards Reviewed" },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
    };

    const series = [
      {
        name: "Maths",
        data: [10, 15, 20, 10, 25, 30, 40],
      },
      {
        name: "English",
        data: [5, 10, 15, 20, 15, 25, 35],
      },
      {
        name: "Science",
        data: [8, 12, 18, 22, 30, 35, 38],
      },
    ];

    return <Chart options={options} series={series} type="area" />;
  };

  const MinigamesActivity = () => {
    const options = {
      chart: {
        type: "line",
        stacked: false,
        background: "transparent",
        toolbar: { show: false },
        foreColor: theme === "dark" ? "#fff" : "#000",
      },
      stroke: {
        width: [0, 3],
        curve: "smooth",
      },
      colors: ["#d1b000", "#FFD700"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
        },
      },
      fill: {
        opacity: [0.85, 1],
      },
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      markers: {
        size: 5,
        colors: ["#FFD700"],
        strokeWidth: 2,
      },
      xaxis: {
        type: "category",
        labels: { style: { colors: "#aaa" } },
        axisBorder: { color: "#333" },
        axisTicks: { color: "#333" },
      },
      yaxis: [
        {
          title: { text: "Minigames Completed", style: { color: "#00E396" } },
          labels: { style: { colors: "#00E396" } },
        },
        {
          opposite: true,
          title: { text: "Minigames Won", style: { color: "#FFD700" } },
          labels: { style: { colors: "#FFD700" } },
        },
      ],
      legend: {
        position: "top",
        labels: { colors: theme === "dark" ? "#fff" : "#000" },
      },
      grid: {
        borderColor: "#222",
        strokeDashArray: 4,
      },
      theme: {
        mode: theme,
      },
    };

    const series = [
      {
        name: "Completed",
        type: "column",
        data: [10, 14, 8, 12, 15, 9, 11],
      },
      {
        name: "Won",
        type: "line",
        data: [5, 8, 6, 9, 10, 7, 8],
      },
    ];

    return <Chart options={options} series={series} />;
  };

  const LessonActivityChart = () => {
    const [series] = useState([
      {
        name: "Math",
        data: [2, 3, 4, 1, 2],
      },
      {
        name: "Science",
        data: [1, 2, 2, 3, 2],
      },
      {
        name: "English",
        data: [3, 2, 1, 2, 3],
      },
    ]);

    const [options] = useState({
      chart: {
        type: "bar",
        toolbar: { show: false },
        stacked: false,
        background: "transparent",
        foreColor: theme === "dark" ? "#fff" : "#000",
      },
      theme: {
        mode: theme,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      },
      yaxis: {
        title: {
          text: "Hours",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} hours`,
        },
      },
    });

    return <Chart options={options} series={series} type="bar" />;
  };

  const XPChart = () => {
    const [view, setView] = useState("week");

    const getSeries = () => {
      if (view === "week") {
        return [
          {
            name: "Actual XP",
            type: "area",
            data: [120, 150, 100, 170, 130, 140, 160],
          },
          {
            name: "Average XP",
            type: "line",
            data: [110, 140, 120, 160, 125, 135, 150],
          },
        ];
      } else {
        return [
          {
            name: "Actual XP",
            type: "area",
            data: [600, 720, 680, 750],
          },
          {
            name: "Average XP",
            type: "line",
            data: [580, 700, 690, 730],
          },
        ];
      }
    };

    const getLabels = () => {
      if (view === "week")
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return ["Week 1", "Week 2", "Week 3", "Week 4"];
    };

    const [options, setOptions] = useState({
      chart: {
        background: "transparent",
        toolbar: { show: false },
        height: 350,
        type: "line",
        foreColor: theme === "dark" ? "#fff" : "#000",
      },
      stroke: { curve: "smooth" },
      fill: { type: "solid", opacity: [0.35, 1] },
      markers: { size: 0 },
      labels: getLabels(),
      yaxis: [
        { title: { text: "Actual XP" } },
        { opposite: true, title: { text: "Average XP" } },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: { formatter: (y) => (y !== undefined ? y.toFixed(0) + " XP" : y) },
      },
      theme: {
        mode: theme,
      },
    });

    const toggleView = () => {
      const newView = view === "week" ? "month" : "week";
      setView(newView);
      setOptions((prev) => ({ ...prev, labels: getLabels(newView) }));
    };

    return (
      <div>
        <button className="flex gap-x-1.5" onClick={toggleView}>
          Toggle to{" "}
          <p className="underline text-primary hover:cursor-pointer">
            {view === "week" ? "Monthly" : "Weekly"}
          </p>
        </button>
        <Chart options={options} series={getSeries()} type="line" />
      </div>
    );
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex gap-4">
        {" "}
        <div className="space-y-10 w-2/3">
          {" "}
          <div className="space-y-5">
            <p className="text-3xl font-medium text-left">
              {session?.user?.displayUsername}'s stats{" "}
            </p>
            <div className="p-5 border rounded-md relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>

              <div className="flex gap-4 w-full h-32 ">
                <img
                  className="w-32 h-full rounded-lg shadow-xl border-t-6 border-foreground"
                  src={
                    session?.user?.image || "/images/default_person_image.jpg"
                  }
                  alt="avatar"
                />

                <div className="flex flex-col justify-between h-full w-1/5">
                  <p className="text-2xl font-medium flex gap-x-2 items-end">
                    {session?.user?.displayUsername}{" "}
                    <p className="text-2xl hover:text-blue-500 hover:underline font-medium">
                      {"("}@{session?.user?.username}
                      {")"}
                    </p>
                  </p>{" "}
                  <div className="w-full">
                    <p className="text-2xl">Master</p>
                    <p>Level 10</p>
                    <div className="flex gap-4 items-center">
                      <Progress
                        value={12}
                        className="w-2/3 bg-foreground/10  h-1 border-primary"
                      />
                      <p className="font-semibold">12%</p>
                    </div>
                  </div>{" "}
                </div>
              </div>

              <div className="absolute botom-0 left-0 -mt-16 -mr-16 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-4xl font-bold text-left">
              Your Overall Statistics{" "}
            </p>
            <div className="grid grid-cols-3 justify-center gap-4">
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Quizzes Created
                  </CardTitle>
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user?.statistics?.totalQuizsCreated}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Lucky Crates
                  </CardTitle>
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user?.statistics?.totalCrates}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>{" "}
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Credits
                  </CardTitle>
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {" "}
                    {user?.statistics?.credits}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Wins
                  </CardTitle>
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {" "}
                    {user?.statistics?.totalWins}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>
              <Card className="">
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
                  <p className="text-xs text-muted-foreground">
                    +8 from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Correct Answers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {" "}
                    {user?.statistics?.totalCorrectAnswers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +8 from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">XP</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user?.statistics?.xpCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Science Quiz - May 12
                  </p>
                </CardContent>
              </Card>
              <Card className="">
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
          </div>
        </div>
        <div className="space-y-10 w-1/3">
          {" "}
          <div className="space-y-5">
            <div className="space-y-5">
              <p className="text-3xl font-medium text-left">
                Progress & Achievements
              </p>
              <div className="py-16 px-8 bg-foreground/1 rounded-md relative overflow-hidden relative">
                <div className="flex justify-start gap-4 w-full h-32 overflow-x-auto">
                  <div className="flex-1 p-5 min-w-1/3 max-w-1/3 w-1/3">
                    <div className="p-2 text-center space-y-3">
                      <p className="font-semibold">Quiz Master</p>
                    </div>
                  </div>
                  <div className="flex-1 p-5 min-w-1/3 max-w-1/3 w-1/3">
                    <div className="p-2 text-center space-y-3">
                      <p className="font-semibold">Quiz Master</p>
                    </div>
                  </div>
                  <div className="flex-1 p-5 min-w-1/3 max-w-1/3 w-1/3">
                    <div className="p-2 text-center space-y-3">
                      <p className="font-semibold">Quiz Master</p>
                    </div>
                  </div>
                  <div className="flex-1 p-5 min-w-1/3 max-w-1/3 w-1/3">
                    <div className="p-2 text-center space-y-3">
                      <p className="font-semibold">Quiz Master</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-4 items-center absolute bottom-0 inset-x-0  p-6">
                  <p className="font-semibold">Next Rank</p>
                  <Progress
                    value={67}
                    className="w-2/4 bg-foreground/10  h-1 border-primary"
                  />
                  <p className="font-semibold">67%</p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-3xl font-medium text-left">Game Performance</p>
              <div className="p-8 bg-foreground/1 rounded-md relative overflow-hidden relative grid grid-cols-2 gap-6">
                <div className="text-left space-y-0.5">
                  <p className="font-semibold">Win Rate</p>
                  <p className="font-bold text-3xl">75%</p>
                </div>
                <div className="text-left space-y-0.5">
                  <p className="font-semibold">Average Score</p>
                  <p className="font-bold text-3xl">82%</p>
                </div>
                <div className="text-left space-y-0.5">
                  <p className="font-semibold">Fastest Answer</p>
                  <p className="font-bold text-3xl">1.4s</p>
                </div>
                <div className="text-left space-y-0.5">
                  <p className="font-semibold">Most Played Topic</p>
                  <p className="font-bold text-3xl">History</p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-3xl font-medium text-left">Social</p>
              <div className="rounded-md relative overflow-hidden relative grid grid-cols-2 gap-6">
                <div className="p-5 bg-foreground/1 rounded-md relative overflow-hidden relative space-y-2 ">
                  <p className="font-semibold">Global Leaderboard</p>
                  <p className="font-bold text-3xl">#24</p>
                </div>
                <div className="p-5 bg-foreground/1 rounded-md relative overflow-hidden relative space-y-2 ">
                  <p className="font-semibold">Most Challenged Opponent</p>
                  <p className="font-bold text-3xl flex gap-x-2 items-end">
                    Alex <p className="text-sm">@alex</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4">
        <div className="flex gap-4 space-y-10 w-full grid grid-cols-3">
          {" "}
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              {" "}
              <p className="text-3xl font-medium text-left">
                Friend Leaderboard
              </p>{" "}
              <div className=" p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <MdArrowDropDown /> Yearly
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Monthly</DropdownMenuItem>
                    <DropdownMenuItem>Weekly</DropdownMenuItem>
                    <DropdownMenuItem>Daily</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="p-4 space-y-4 bg-foreground/1 rounded-md relative overflow-y-auto relative">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <p className="text-3xl">1</p>
                  <img
                    className="w-16 h-16 rounded-lg shadow-xl border-t-6 border-foreground"
                    src={
                      session?.user?.image || "/images/default_person_image.jpg"
                    }
                    alt="avatar"
                  />
                  <div className="gap-2 items-center">
                    <p className="text-2xl font-semibold flex gap-x-1.5 items-end">
                      {session?.user.displayUsername}{" "}
                      <p className="text-md">
                        {"("}@{session?.user.username}
                        {")"}
                      </p>
                    </p>
                    <p className="text-1xl">XP</p>
                  </div>
                </div>
                <p className="text-2xl">67,000</p>
              </div>
            </div>
          </div>
          <div className="space-y-5 h-full">
            <div className="h-full text-center flex flex-col items-center justify-center space-y-4 bg-foreground/1 rounded-md overflow-hidden relative">
              <Trophy className="h-24 w-24 fill-yellow-500 text-yellow-500" />
              <span className="uppercase text-3xl">next rank</span>
              <p className="font-semibold text-4xl my-4">Grand Master</p>
              <div className="w-full px-8 space-y-4 gap-4 items-center">
                <Progress
                  value={50}
                  className="bg-foreground/10 w-full h-4 border-primary"
                />
                <p className="font-semibold text-2xl">50%</p>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="w-full flex justify-between items-center">
              {" "}
              <p className="text-3xl font-medium text-left">XP Gain</p>
            </div>
            <div className="p-4 bg-foreground/1 rounded-md relative overflow-hidden relative  gap-6">
              <XPChart theme={theme} />
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4">
        <div className="flex gap-4 space-y-10 w-full grid grid-cols-3">
          {" "}
          <div className="space-y-5">
            <p className="text-3xl font-medium text-left">
              Flashcards Activity
            </p>
            <div className="p-4 bg-foreground/1 rounded-md relative overflow-hidden relative">
              <FlashcardActivity theme={theme} />
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-3xl font-medium text-left">Minigames Activity</p>
            <div className="p-4 bg-foreground/1 rounded-md relative overflow-hidden relative gap-6">
              <MinigamesActivity theme={theme} />
            </div>
          </div>
          <div className="space-y-5">
            <div className="w-full flex justify-between items-center">
              {" "}
              <p className="text-3xl font-medium text-left">Quiz Progress</p>
            </div>
            <div className="p-4 bg-foreground/1 rounded-md relative overflow-hidden relative  gap-6">
              <LessonActivityChart theme={theme} />
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4">
        <div className="flex gap-4 space-y-10 w-full grid grid-cols-3">
          {" "}
          <div className="space-y-5">
            <p className="text-3xl font-medium text-left">Courses</p>
            <div className="p-4 bg-foreground/1 rounded-md relative overflow-hidden relative">
              <div className="p-4 rounded-lg space-y-4">
                <p className="font-semibold">Economics</p>
                <div>
                  <div className="flex gap-4 items-center">
                    <Progress
                      value={50}
                      className="bg-background  h-1 border-primary"
                    />
                    <p className="font-semibold">50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <p className="text-3xl font-medium text-left">Course Activity</p>
            <div className="p-4 bg-foreground/1 rounded-md relative overflow-hidden relative gap-6">
              <HeatmapChart theme={theme} />
            </div>
          </div>
          <div className="space-y-5">
            <div className="w-full flex justify-between items-center">
              {" "}
              <p className="text-3xl font-medium text-left">Course Progress</p>
              <div>
                {" "}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2">
                    <MdArrowDropDown /> Economics
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="p-4 bg-foreground/1 rounded-md relative overflow-hidden relative  gap-6">
              <LineApexChart theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
