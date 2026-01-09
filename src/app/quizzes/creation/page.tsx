"use client";

import { useEffect, useRef, useState } from "react";
import { MdPublic, MdPublish } from "react-icons/md";
import {
  BoxSelect,
  ChevronDown,
  ChevronRight,
  Copy,
  Edit,
  Edit2,
  Eye,
  EyeClosed,
  FileSpreadsheet,
  Layers,
  Lightbulb,
  PlusCircle,
  Send,
  Shuffle,
  Trash,
} from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "~/components/ui/drawer";
import { LightningBoltIcon } from "~/components/icons/lightning-bolt-icon";
import { Button } from "~/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "~/components/ui/switch";
import { SiAnki, SiAnswer, SiQuizlet } from "react-icons/si";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import { FaLightbulb } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useTheme } from "~/components/theme/ThemeProvider";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { authClient } from "@/lib/auth-client";

type Answer = {
  text: string;
  image?: string; // optional image URL
};

type Question = {
  type: string | undefined;
  id: number;
  text: string;
  image?: string; // optional question image
  answers: Answer[];
  correct?: [];
};

export default function QuizCreation() {
  const { data: session } = authClient.useSession();

  const [quizTitle, setQuizTitle] = useState("New Quiz");
  const { theme } = useTheme();
  const [quizDesc, setQuizDesc] = useState("");
  const [numQuestions, setNumQuestions] = useState(3);
  const [timePerQuestion, setTimePerQuestion] = useState(15);
  const [currentlySelecting, setCurrentlySelecting] = useState(false);
  const [selected, setSelected] = useState([]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "SELECT",
      text: "Blank Question",
      answers: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correct: [],
    },
    {
      id: 2,
      type: "SELECT",
      text: "Blank Question",
      answers: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correct: [],
    },
    {
      id: 3,
      type: "SELECT",
      text: "Blank Question",
      answers: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correct: [],
    },
    {
      id: 4,
      type: "SELECT",
      text: "Blank Question",
      answers: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correct: [],
    },
    {
      id: 5,
      type: "SELECT",
      text: "Blank Question",
      answers: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correct: [],
    },
  ]);

  const [indexNoDuplicate, setIndexNoDuplicate] = useState(questions.length);

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    1
  );
  const colours = ["blue", "red", "yellow", "green"];

  const [showAnswers, setShowsAnswers] = useState(false);

  //Final Handlers
  const submitQuiz = async () => {
    const response = await fetch("/api/v1/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: quizTitle,
        description: quizDesc || "",
        isPublic: true,
        //@ts-ignore
        authorId: parseInt(session?.user.id),
        questions,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      toast.success("🦄 Quiz created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme,
      });
    }
  };

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  const handleTimeChange = (e) => {
    const input = e.target.value;
    if (/^[0-9]*$/.test(input) && input.length <= 2) {
      setTimePerQuestion(input);
    }
  };

  //  delete multiple
  const handleDeleteSelected = () => {
    const newQs = questions.filter((q) => !selected.includes(q.id)); // keep only those NOT in selected
    setQuestions(newQs);
    setSelected([]); // clear selected after deleting
    setSelectedQuestionId(newQs.length ? newQs[0].id : null);
  };

  const updateQuestionText = (text: string) => {
    if (!selectedQuestion) return;
    setQuestions(
      questions?.map((q) => (q.id === selectedQuestion.id ? { ...q, text } : q))
    );
  };

  function addCorrectAnswer(index: number) {
    if (!selectedQuestion) return;

    // prevent duplicates
    if (selectedQuestion.correct.includes(index)) return;

    const newActualAnswers = [...selectedQuestion.correct, index];

    setQuestions(
      questions.map((q) =>
        q.id === selectedQuestion.id ? { ...q, correct: newActualAnswers } : q
      )
    );
  }

  function removeCorrectAnswer(index: number) {
    if (!selectedQuestion) return;

    const newActualAnswers = selectedQuestion.correct.filter(
      (i) => i !== index
    );

    setQuestions(
      questions.map((q) =>
        q.id === selectedQuestion.id ? { ...q, correct: newActualAnswers } : q
      )
    );
  }

  const updateQuestionImage = (image: string) => {
    if (!selectedQuestion) return;
    setQuestions(
      questions?.map((q) =>
        q.id === selectedQuestion.id ? { ...q, image } : q
      )
    );
  };

  const updateAnswer = (index: number, text: string) => {
    if (!selectedQuestion) return;
    const newAnswers = selectedQuestion.answers?.map((a, i) =>
      i === index ? { ...a, text } : a
    );
    setQuestions(
      questions?.map((q) =>
        q.id === selectedQuestion.id ? { ...q, answers: newAnswers } : q
      )
    );
  };

  const updateAnswerImage = (index: number, image: string) => {
    if (!selectedQuestion) return;
    const newAnswers = selectedQuestion.answers?.map((a, i) =>
      i === index ? { ...a, image } : a
    );
    setQuestions(
      questions?.map((q) =>
        q.id === selectedQuestion.id ? { ...q, answers: newAnswers } : q
      )
    );
  };

  const addQuestion = (question?: Question) => {
    const newQuestion: Question = {
      id: indexNoDuplicate + 1,
      type: "",
      text: question?.text || "New Question",
      answers: question?.answers || [
        { text: "Answer 1" },
        { text: "Answer 2" },
        { text: "Answer 3" },
        { text: "Answer 4" },
      ],
      correct: question?.correct || [],
    };
    setIndexNoDuplicate(indexNoDuplicate + 1);
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  };

  const deleteQuestion = (id: number | string) => {
    if (!selectedQuestion) return;
    const filtered = questions.filter((q) => q.id !== id);
    setQuestions(filtered);
    setSelectedQuestionId(filtered.length ? filtered[0].id : null);
  };

  const [openQuizDrawer, setOpenQuizDrawer] = useState(false);

  const handleTitleChange = (e) => {
    const input = e.target.value;

    if (input.length <= 40) {
      setQuizTitle(input);
    }
  };

  const handleDescChange = (e) => {
    const input = e.target.value;
    if (input.length <= 300) {
      setQuizDesc(input);
    }
  };

  const updateQuestionType = (id: number, type: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id !== id) return q;

        let newAnswers = q.answers;

        // change default answers depending on type
        if (type === "TRUE_FALSE") {
          newAnswers = [{ text: "True" }, { text: "False" }];
        } else if (type === "SHORT_ANSWER") {
          newAnswers = [{ text: "" }];
        } else if (
          type === "MULTIPLE_CHOICE" ||
          type === "SELECT" ||
          type === "LIST_ORDER"
        ) {
          newAnswers =
            q.answers.length >= 4
              ? q.answers.slice(0, 4)
              : [
                  { text: "Answer 1" },
                  { text: "Answer 2" },
                  { text: "Answer 3" },
                  { text: "Answer 4" },
                ];
        }

        return { ...q, type, answers: newAnswers, correct: [] };
      })
    );
  };

  return (
    <div className="container justify-self-center w-screen py-4 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Quizzes Creation</h1>

        <div className="h-[80vh] w-full flex">
          <div className="w-2/4 h-full p-6 place-content-center">
            <div className="bg-background rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary py-4 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-black" />
                  <span className="font-bold text-black">
                    Tap the question/buttons to edit the text
                  </span>
                </div>

                <Button
                  onClick={() => setOpenQuizDrawer(true)}
                  className="p-0 h-0 gap-x-2 bg-white"
                >
                  <MdPublish className="h-6 w-6" /> Publish Quiz{" "}
                </Button>
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{quizTitle}</h3>
                  <p className="text-muted-foreground">
                    Question {questions.indexOf(selectedQuestion) + 1} of{" "}
                    {questions.length}
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-6">
                  <input
                    value={selectedQuestion?.text}
                    onChange={(e) =>
                      e.target.value.length < 64 &&
                      updateQuestionText(e.target.value)
                    }
                    defaultValue={selectedQuestion?.text}
                    className="text-lg font-medium text-center w-full bg-transparent focus:outline-none"
                  ></input>
                </div>

                {selectedQuestion?.type === "SHORT_ANSWER" ? (
                  <div className="bg-muted p-4 rounded-lg mb-6">
                    <input
                      placeholder="Enter correct answer"
                      value={selectedQuestion?.answers[0]?.text || ""}
                      onChange={(e) => updateAnswer(0, e.target.value)}
                      className="text-lg font-medium text-center w-full bg-transparent focus:outline-none"
                    />
                  </div>
                ) : selectedQuestion?.type === "LIST_ORDER" ? (
                  <></>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedQuestion?.answers?.map((q, index) => (
                      <div key={index} className="w-full">
                        <input
                          onChange={(e) =>
                            e.target.value.length < 25 &&
                            updateAnswer(index, e.target.value)
                          }
                          value={q.text}
                          className={`bg-${colours[index % colours.length]}-500 ${
                            !selectedQuestion?.correct?.includes(index) &&
                            showAnswers &&
                            "bg-opacity-20"
                          } text-white p-4 rounded-lg text-center cursor-text outline-none hover:bg-${colours[index % colours.length]}-600 transition-all transform w-full`}
                        />
                        {selectedQuestion?.type !== "SHORT_ANSWER" && (
                          <div className="space-y-2 flex justify-between items-center">
                            <span>Set as right answer?</span>
                            <Switch
                              onClick={() =>
                                selectedQuestion?.correct?.includes(index)
                                  ? removeCorrectAnswer(index)
                                  : selectedQuestion?.type === "TRUE_FALSE"
                                    ? selectedQuestion?.correct?.length < 1 &&
                                      addCorrectAnswer(index)
                                    : selectedQuestion?.type === "SELECT"
                                      ? selectedQuestion?.correct?.length < 1 &&
                                        addCorrectAnswer(index)
                                      : selectedQuestion?.type ===
                                          "MULTIPLE_CHOICE" &&
                                        addCorrectAnswer(index)
                              }
                              checked={selectedQuestion?.correct?.includes(
                                index
                              )}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex justify-between items-center">
                  <div className="font-bold">Time Per Question:</div>
                  <div className="text-xl font-mono font-bold">
                    <span className="invisible absolute whitespace-pre pointer-events-none">
                      {timePerQuestion || "0"}
                    </span>
                    <input
                      className="focus:outline-none w-[ch] min-w-0 text-center bg-transparent"
                      style={{
                        width: `${String(timePerQuestion).length + 1}ch`,
                      }}
                      value={timePerQuestion}
                      onChange={handleTimeChange}
                    />
                    s
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/4 h-full ">
            <div className="h-2/3 p-6 space-y-4 overflow-y-auto overflow-x-hidden">
              <div className="flex justify-between items-center ">
                <p className="text-3xl font-medium">Questions</p>
                <div className="space-x-2 items-center flex">
                  {selected.length > 0 && (
                    <Button
                      variant={"destructive"}
                      className="flex items-center h-8 gap-x-2"
                      onClick={handleDeleteSelected}
                    >
                      <Trash className="h-4 w-4" />
                      Delete Selected
                    </Button>
                  )}
                  <Button
                    onClick={() => [
                      setCurrentlySelecting(!currentlySelecting),
                      currentlySelecting && setSelected([]),
                    ]}
                    variant={"ghost"}
                  >
                    <BoxSelect />
                  </Button>
                  <Button onClick={() => addQuestion()} className="h-8 gap-x-2">
                    Add Question
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setShowsAnswers(!showAnswers)}
                    variant={"outline"}
                    className="h-8 gap-x-2 transition-all transform"
                  >
                    {!showAnswers ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeClosed className="h-4 w-4" />
                    )}
                    {!showAnswers ? "Show Answers" : "Hide Answers"}
                  </Button>
                </div>
              </div>
              <div className="space-y-3 overflow-y-auto p-2 overflow-x-hidden">
                <AnimatePresence>
                  {questions?.map((q, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        default: { type: "tween" },
                        opacity: { ease: "linear" },
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileTap={{ scale: 0.95, transition: { duration: 0.15 } }}
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`p-4 cursor-pointer rounded-md border overflow-hidden group shadow-md transition-all ${selectedQuestionId === q.id && "hover:cursor-default bg-foreground/10"}`}
                    >
                      <div className="flex justify-between">
                        <span className="flex items-center gap-x-2 w-1/3 truncate">
                          {currentlySelecting && (
                            <Checkbox
                              value={selected.includes(q.id)}
                              checked={selected.includes(q.id)}
                              onClick={() => {
                                if (selected.includes(q.id)) {
                                  // remove q.id from selected
                                  setSelected((prev) =>
                                    prev.filter((id) => id !== q.id)
                                  );
                                } else {
                                  // add q.id to selected
                                  setSelected((prev) => [...prev, q.id]);
                                }
                              }}
                            />
                          )}
                          <div
                            className={`p-2 rounded-md bg-foreground/75 shadow-md border-b-2 border-r-2 transition-all group-hover:rounded-xl ${selectedQuestionId === q.id && "rounded-xl"} `}
                          >
                            <span className="font-semibold text-background">
                              Q{index + 1}
                            </span>
                          </div>
                          {!showAnswers
                            ? q.text
                            : `${q?.correct?.map((ans) => q.answers[parseInt(ans)].text).join(", ")}
                            `}
                        </span>{" "}
                        <div className="flex gap-x-2 items-center">
                          <Select
                            value={q.type} // 👈 show current type
                            onValueChange={(val) => [
                              updateQuestionType(q.id, val),
                              setSelectedQuestionId(q.id),
                            ]} // 👈 update state
                          >
                            <SelectTrigger className="h-3/4 gap-x-1">
                              <SelectValue placeholder="Select Question Type" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Question Type</SelectLabel>
                                <SelectItem value="MULTIPLE_CHOICE">
                                  Multiple Answers
                                </SelectItem>
                                <SelectItem value="TRUE_FALSE">
                                  True or False
                                </SelectItem>
                                <SelectItem value="SHORT_ANSWER">
                                  Short Answer
                                </SelectItem>
                                <SelectItem value="LIST_ORDER">
                                  List Order
                                </SelectItem>
                                <SelectItem value="SELECT">Select</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-x-2">
                          <Button
                            onClick={() => setSelectedQuestionId(q.id)}
                            className="h-6 px-1"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => addQuestion(q)}
                            variant={"outline"}
                            className="h-6 px-1"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => [
                              deleteQuestion(q.id),
                              setSelectedQuestionId(questions[index - 1].id),
                            ]}
                            variant={"destructive"}
                            className="h-6 px-1"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="h-1/3 p-6 space-y-6">
              <span className="text-2xl font-medium">Import Questions</span>
              <div className="p-6 h-[80%] grid grid-cols-2 items-center gap-x-4 ">
                <Button className="p-6 shadow-md flex items-center transition-all hover:gap-x-0 gap-x-2 group">
                  <div className="p-2 bg-accent rounded-lg group-hover:bg-transparent transition-all ">
                    {" "}
                    <SiAnki className="group-hover:-rotate-12 transition-all" />
                  </div>{" "}
                  Anki Flashcards
                </Button>
                <Button className="p-6 shadow-md flex items-center transition-all hover:gap-x-0 gap-x-2 group">
                  <div className="p-2 bg-accent rounded-lg group-hover:bg-transparent transition-all ">
                    {" "}
                    <SiQuizlet className="group-hover:text-blue-500 transition-all" />
                  </div>{" "}
                  Quizlet
                </Button>
                <Button className="p-6 shadow-lg flex items-center transition-all hover:gap-x-0 gap-x-2 group col-span-2">
                  <div className="p-2 bg-accent rounded-lg group-hover:bg-transparent transition-all ">
                    {" "}
                    <FileSpreadsheet className="h-4 w-4 group-hover:text-red-500 group-hover:scale-125 transition-all" />
                  </div>{" "}
                  Spreadsheets
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute">
          <Drawer
            open={openQuizDrawer}
            onClose={() => setOpenQuizDrawer(false)} // will fire on outside click
          >
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{quizTitle} — Settings </DrawerTitle>
                <DrawerDescription>
                  Edit this quizzes settings
                </DrawerDescription>
              </DrawerHeader>

              <div className="grid grid-cols-2 p-4 gap-4">
                <div className="space-y-2">
                  <span className="text-3xl font-medium">Quiz Info</span>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <div className="relative space-y-2">
                      <span>Quiz name</span>
                      <div>
                        {" "}
                        <Input
                          onChange={handleTitleChange}
                          value={quizTitle}
                          defaultValue={quizTitle}
                        />
                      </div>
                    </div>
                    <div className="relative space-y-2">
                      <span>Quiz description</span>
                      <div>
                        {" "}
                        <Input
                          onChange={handleDescChange}
                          defaultValue={quizDesc}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-1 grid gap-6 grid-cols-2">
                  <div className="space-y-2">
                    {" "}
                    <span className="text-3xl font-medium">
                      Gameplay Options
                    </span>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <Card className="flex items-center justify-between p-2 shadow-sm">
                        <div className="flex items-center gap-x-2">
                          <Shuffle className="h-4 w-4" /> Shuffle Questions
                        </div>
                        <Switch />
                      </Card>
                      <Card className="flex items-center justify-between p-2 shadow-sm">
                        <div className="flex items-center gap-x-2">
                          <SiAnswer /> Shuffle Answers
                        </div>
                        <Switch />
                      </Card>
                      <Card className="flex items-center justify-between p-2 shadow-sm">
                        <div className="flex items-center gap-x-2">
                          <FaLightbulb /> Enable Hints
                        </div>
                        <Switch />
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {" "}
                    <span className="text-3xl font-medium">
                      Visibility Options{" "}
                    </span>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <Card className="flex items-center justify-between p-2 shadow-sm">
                        <div className="flex items-center gap-x-2">
                          <MdPublic /> Public Quiz
                        </div>
                        <Switch />
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              <DrawerFooter>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => submitQuiz()}>Publish</Button>
                  <DrawerClose asChild>
                    <button className="px-4 py-2 bg-[#ff0000] duration-250 transition-all hover:bg-red-400 text-white rounded-md cursor-pointer">
                      Close
                    </button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
