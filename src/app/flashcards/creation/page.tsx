"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SiQuizlet } from "react-icons/si";
import { FaFilePdf } from "react-icons/fa6";
import {
  ChevronDown,
  ChevronRight,
  CircleQuestionMark,
  CreditCard,
  Delete,
  Earth,
  Edit,
  Eye,
  FileText,
  Layers,
  Plus,
  PlusCircle,
  SaveAll,
  Search,
  Send,
  Sparkles,
  SquareDashed,
  Trash,
  Youtube,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { RecentActivity } from "~/components/admin/recent-activity";
import { UserGrowth } from "~/components/admin/user-growth";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

/*helper functions  */

function findDeckById(decks, targetId) {
  for (const deck of decks) {
    if (deck.id === targetId) {
      return deck;
    }
    const found = findDeckById(deck.subdecks, targetId);
    if (found) return found;
  }
  return null;
}

function addDeckById(decks, targetId, newDeck) {
  return decks.map((deck) => {
    if (deck.id === targetId) {
      return { ...deck, subdecks: [...deck.subdecks, newDeck] };
    }
    return { ...deck, subdecks: addDeckById(deck.subdecks, targetId, newDeck) };
  });
}

function editDeckById(decks, targetId, updates) {
  return decks.map((deck) => {
    if (deck.id === targetId) {
      return { ...deck, ...updates };
    }
    return {
      ...deck,
      subdecks: editDeckById(deck.subdecks, targetId, updates),
    };
  });
}

function addCardToDeck(decks, deckId, newCard) {
  return decks.map((deck) => {
    if (deck.id === deckId) {
      return { ...deck, cards: [...deck.cards, newCard] };
    }
    return {
      ...deck,
      subdecks: addCardToDeck(deck.subdecks, deckId, newCard),
    };
  });
}

function editCardById(decks, cardId, updatedCard) {
  return decks.map((deck) => {
    const updatedCards = deck.cards.map((card) =>
      card.id === cardId ? { ...card, ...updatedCard } : card
    );
    return {
      ...deck,
      cards: updatedCards,
      subdecks: editCardById(deck.subdecks, cardId, updatedCard),
    };
  });
}

function deleteCardById(decks, cardId) {
  return decks.map((deck) => ({
    ...deck,
    cards: deck.cards.filter((card) => card.id !== cardId),
    subdecks: deleteCardById(deck.subdecks, cardId),
  }));
}

function Deck({
  allDecks,
  setDecks,
  deck,
  setSelectedDeckId,
  isSub,
  selectedDeckId,
  setCurrentCard,
}) {
  const [deckName, setDeckname] = useState(deck.name);
  const [isOpen, setIsOpen] = useState(false); // <-- toggle for dropdown
  const isSelected = selectedDeckId === deck.id;

  function handleChange() {
    setDecks((prev) => editDeckById(prev, deck.id, { name: deckName }));
  }

  return (
    <div
      className={`${isSub && "border-l-4 p-2 border-accent hover:border-l"} ${
        isSelected && "border-l-8"
      }`}
      style={{ marginLeft: "20px" }}
    >
      <div
        className="flex items-center space-x-2 text-foreground hover:text-black hover:bg-accent cursor-pointer w-fit m-2 p-2 rounded-md"
        onClick={() => {
          setSelectedDeckId(deck.id);
          setCurrentCard({});
        }}
      >
        {deck.subdecks.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent selecting deck on toggle click
              setIsOpen((prev) => !prev);
            }}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}

        <Layers />
        {isSelected ? (
          <input
            onBlur={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleChange()}
            onChange={(e) => setDeckname(e.target.value)}
            autoFocus
            className="text-2xl bg-transparent w-fit flex focus:outline-none"
            value={deckName}
          />
        ) : (
          <span className="text-2xl">{deck.name}</span>
        )}
      </div>

      {isOpen && deck.subdecks.length > 0 && (
        <div className="ml-4">
          {deck.subdecks.map((subdeck) => (
            <Deck
              key={subdeck.id}
              setDecks={setDecks}
              allDecks={allDecks}
              selectedDeckId={selectedDeckId}
              isSub={true}
              setSelectedDeckId={setSelectedDeckId}
              deck={subdeck}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FlashcardCreation() {
  const [youtubeLink, SetYoutubeLink] = useState("");
  const [quizletLink, SetQuizletLink] = useState("");
  const [rawText, SetRawText] = useState("");
  const [isflashcardPublic, setIsFlashcardPublic] = useState(false);
  const [AIimportType, setAIimportType] = useState("");
  const [tabSetting, setSettingTab] = useState("settings");
  const [currentCard, setCurrentCard] = useState({});
  const [editedCardQ, setEditedCardQ] = useState("");
  const [editedCardA, setEditedCardA] = useState("");
  const [editingFlashcard, setEditingFlashcard] = useState(false);
  const [toggleback, setToggleBack] = useState(false);
  const [preview, setPreview] = useState(null);
  const [height, setHeight] = useState(250); // default 250px tall
  const [isResizing, setIsResizing] = useState(false);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const { data: session } = authClient.useSession();

  const [flashcardsetName, setFlashcardsetName] = useState("");
  const [desc, setDesc] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        setHeight(Math.min(Math.max(newHeight, 150), window.innerHeight * 0.9));
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const [decks, setDecks] = useState([
    {
      id: "1",
      name: "Math",
      cards: [
        { id: "101", question: "2+2?", answer: "4" },
        { id: "102", question: "3*3?", answer: "9" },
      ],
      subdecks: [
        {
          id: "2",
          name: "Algebra",
          cards: [{ id: "201", question: "x+2=5, x=?", answer: "3" }],
          subdecks: [
            {
              id: "3",
              name: "Linear Equations",
              cards: [{ id: "301", question: "2x+3=7, x=?", answer: "2" }],
              subdecks: [],
            },
          ],
        },
      ],
    },
  ]);

  const [selectedDeckId, setSelectedDeckId] = useState("1");
  const selectedDeck = findDeckById(decks, selectedDeckId) ?? decks[0];
  const [fileName, setFileName] = useState("");

  const uploadSet = async () => {
    const res = await fetch("/api/v1/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: flashcardsetName,
        description: desc,
        //@ts-ignore
        authorId: parseInt(session?.user.id),
        subdecks: decks, // your full nested deck structure
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data.flashcardSet);

      toast.success("Flashcard created!");
    }
  };

  const handlepdfFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <div className="container justify-self-center w-screen py-4 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Flashcards Creation & Generation
        </h1>

        <div className="h-[80vh] w-full flex">
          <div className="w-3/5 h-full">
            <div className="mb-8 space-y-3">
              <span className="text-4xl">Card Preview</span>
              <div className="space-x-2 flex justify-center my-4">
                <span>Toggle Backside </span>
                <Switch
                  className="self-center"
                  checked={toggleback}
                  onClick={() => setToggleBack(!toggleback)}
                ></Switch>
              </div>
            </div>
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, rotateY: toggleback ? 180 : 0 }}
              className="w-full h-2/4"
            >
              <Card
                className="absolute w-full h-full bg-background p-4 rounded-2xl shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="w-full p-1">
                  {!editingFlashcard ? (
                    <p className="font-semibold">
                      {currentCard.question || "N/A"}
                    </p>
                  ) : (
                    <Input
                      onChange={(e) => setEditedCardQ(e.target.value)}
                      onBlur={() =>
                        setDecks((prev) =>
                          editCardById(prev, currentCard.id, {
                            question: editedCardQ,
                          })
                        )
                      }
                      value={editedCardQ}
                      className="text-lg text-center text-foreground font-semibold"
                    />
                  )}
                </div>
                <div className="h-full w-full p-12">
                  {" "}
                  <div
                    className={`w-full h-full border-4 border-foreground/75 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer relative ${
                      isDragging ? "bg-foreground/20" : "hover:bg-foreground/10"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleRemove}
                          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center">
                        <span className="text-5xl font-semibold text-center">
                          Attach Image
                        </span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </Card>

              <Card
                className="absolute w-full h-full bg-yellow-200 p-4 rounded-2xl shadow-lg"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-black">
                  {!editingFlashcard ? (
                    <p className="text-lg text-black font-semibold">
                      Answer: {currentCard.answer}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p>Answer:</p>
                      <Input
                        onChange={(e) => setEditedCardA(e.target.value)}
                        onBlur={() =>
                          setDecks((prev) =>
                            editCardById(prev, currentCard.id, {
                              answer: editedCardA,
                            })
                          )
                        }
                        value={editedCardA}
                        className="text-lg mx-2 text-black bg-transparent text-center font-semibold"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="w-2/5 h-full overflow-y-auto">
            <div className="relative p-6 space-y-6">
              <div className="text-left space-y-2">
                <span className="text-foreground flex items-center gap-x-2 text-3xl font-semibold">
                  AI Import <Sparkles />
                </span>
                <div className="space-y-4">
                  {" "}
                  {AIimportType === "youtube" && (
                    <div className="p-3 border border-foreground/25 rounded-md space-y-2 transform transition-all">
                      <div className="space-x-2 flex items-center">
                        <Label className="text-1xl">Youtube</Label>{" "}
                        <FaYoutube className="text-[#ff0000] h-6 w-6" />
                      </div>
                      <Input
                        onChange={(e) => SetYoutubeLink(e.target.value)}
                        className="truncate"
                        placeholder="Insert Youtube link e.g. https://www.youtube.com/watch?v=Mfr8pi-jvu0&t=45919s"
                      ></Input>
                      {AIimportType === "youtube" && youtubeLink !== "" && (
                        <Button variant={"outline"} className="w-full">
                          Start Import
                        </Button>
                      )}
                    </div>
                  )}
                  {AIimportType === "quizlet" && (
                    <div className="p-3 border border-foreground/25 rounded-md space-y-2 transform transition-all">
                      <div className="space-x-2 flex items-center">
                        <Label className="text-1xl">Quizlet</Label>{" "}
                        <SiQuizlet className="text-[#4255FF]  h-6 w-6" />
                      </div>
                      <Input
                        onChange={(e) => SetQuizletLink(e.target.value)}
                        className="truncate"
                        placeholder="Insert Quizlet flashcard link e.g. https://quizlet.com/gb/371344634/ocr-computer-science-a-level-paper-1-flash-cards/?funnelUUID=465bfd05-c561-4e0d-8ed5-db1fbd919cd9"
                      ></Input>
                      {AIimportType === "quizlet" && quizletLink !== "" && (
                        <Button variant={"outline"} className="w-full">
                          Start Import
                        </Button>
                      )}
                    </div>
                  )}
                  {AIimportType === "pdf" && (
                    <div className="p-3 border border-foreground/25 rounded-md space-y-2 transform transition-all">
                      <div className="space-x-2 flex items-center">
                        <Label className="text-1xl" htmlFor="pdf-upload">
                          PDF file
                        </Label>
                        <FaFilePdf className="text-red-500 h-6 w-6" />
                      </div>

                      <div className="p-4">
                        <input
                          id="pdf-upload"
                          type="file"
                          accept="application/pdf"
                          onChange={handlepdfFileChange}
                          className="hidden"
                        />

                        <label
                          htmlFor="pdf-upload"
                          className="p-4 border w-full cursor-pointer block text-center rounded-md hover:border-dashed transition-all transform"
                        >
                          {fileName ? "Change PDF" : "Click to upload PDF"}
                        </label>

                        {fileName && (
                          <>
                            <p className="mt-2 text-sm text-gray-600">
                              Selected: {fileName}
                            </p>
                            <Button variant={"outline"} className="w-full my-2">
                              Start Import
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {AIimportType === "raw" && (
                    <div className="p-3 border border-foreground/25 rounded-md space-y-2 transform transition-all">
                      <div className="space-x-2 flex items-center">
                        <Label className="text-1xl">Raw Text</Label>{" "}
                        <FileText className="text-foreground" />
                      </div>
                      <Textarea
                        onChange={(e) => SetRawText(e.target.value)}
                        className="min-h-[250px]"
                        placeholder="Insert notes..."
                      ></Textarea>
                      {AIimportType === "raw" && rawText !== "" && (
                        <Button variant={"outline"} className="w-full">
                          Start Import
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() =>
                      setAIimportType(
                        AIimportType === "youtube" ? "" : "youtube"
                      )
                    }
                    variant={"ghost"}
                    className={`flex gap-x-2 items-center border ${AIimportType === "youtube" && "bg-accent text-accent-foreground"}`}
                  >
                    {"YouTube"}
                    <FaYoutube className="text-[#ff0000]  h-8 w-8" />
                  </Button>
                  <Button
                    onClick={() =>
                      setAIimportType(
                        AIimportType === "quizlet" ? "" : "quizlet"
                      )
                    }
                    variant="ghost"
                    className={`flex gap-x-2 items-center border ${AIimportType === "quizlet" && "bg-accent text-accent-foreground"}`}
                  >
                    Quizlet
                    <SiQuizlet className="text-[#4255FF]  h-6 w-6" />
                  </Button>
                  <Button
                    onClick={() =>
                      setAIimportType(AIimportType === "pdf" ? "" : "pdf")
                    }
                    variant={"ghost"}
                    className={`flex gap-x-2 items-center border ${AIimportType === "pdf" && "bg-accent text-accent-foreground"}`}
                  >
                    {"PDF"}
                    <FaFilePdf className="text-red-500 h-6 w-6" />
                  </Button>{" "}
                  <Button
                    onClick={() =>
                      setAIimportType(AIimportType === "raw" ? "" : "raw")
                    }
                    variant={"ghost"}
                    className={`flex gap-x-2 items-center border ${AIimportType === "raw" && "bg-accent text-accent-foreground"}`}
                  >
                    {"Raw Text"}
                    <FileText />
                  </Button>
                </div>
              </div>

              <div className="text-left space-y-2 h-screen">
                <div className="flex justify-between">
                  <span className="text-foreground flex items-center gap-x-2 text-3xl font-semibold">
                    Flashcard Hierarchy <Layers />
                  </span>
                  <div className="space-x-2">
                    <Button
                      className={`${!selectedDeck && "hidden"}`}
                      variant="outline"
                      onClick={() => setSelectedDeckId(decks[0].id)}
                    >
                      <SquareDashed />
                    </Button>
                    <Button
                      onClick={() => {
                        const newDeck = {
                          id: Date.now().toString(),
                          name: "New deck",
                          cards: [],
                          subdecks: [],
                        };
                        setDecks((prev) =>
                          addDeckById(prev, selectedDeck.id, newDeck)
                        );
                        setSelectedDeckId(newDeck.id);
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                <span className="text-foreground flex items-center gap-x-2 text-2xl">
                  Deck Selected: {selectedDeck?.name}
                </span>
                <div className="rounded-md border h-[10vh] sm:h-[20vh] md:h-[30vh] lg:h-[35vh] xl:h-[60vh] p-4 mb-40 overflow-y-auto">
                  {decks.map((deck) => (
                    <Deck
                      setCurrentCard={setCurrentCard}
                      key={deck.id}
                      setDecks={setDecks}
                      allDecks={decks}
                      selectedDeckId={selectedDeckId}
                      setSelectedDeckId={setSelectedDeckId}
                      deck={deck}
                      isSub={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 inset-x-0 border-t-8 border-accent w-full bg-background flex flex-col"
            style={{ height }}
          >
            <div
              className="h-2 cursor-row-resize bg-accent/50 hover:bg-accent transition-colors"
              onMouseDown={() => setIsResizing(true)}
            />

            <div className="p-6 flex justify-between gap-2 overflow-y-auto flex-1">
              <div className="w-3/5 h-full space-y-3 p-2 overflow-y-auto">
                <div className="flex justify-between">
                  <span className="text-2xl font-semibold">
                    Flashcards in this deck
                  </span>
                  <div className="gap-x-2 w-fit flex justify-end">
                    <div className="relative w-3/5">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input placeholder="Search..." className="pl-10" />
                    </div>
                    <Button
                      onClick={() => {
                        const newCard = {
                          id: Date.now().toString(),
                          question: "New Question",
                          answer: "New Answer",
                        };
                        setDecks((prev) =>
                          addCardToDeck(prev, selectedDeck.id, newCard)
                        );
                        setCurrentCard(newCard);
                      }}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="w-full h-full space-y-2 mb-6">
                  {selectedDeck?.cards?.map((card) => (
                    <div
                      key={card.id}
                      className="border-l-2 items-center p-2 flex justify-between hover:border-l-4 hover:border-accent"
                    >
                      <div className="space-x-6 flex truncate mx-2">
                        <div className="space-x-2">
                          <span>Q:</span>
                          <span>{card.question}</span>
                        </div>
                        <div className="space-x-2">
                          <span>A:</span>
                          <span>{card.answer}</span>
                        </div>
                      </div>
                      <div className="space-x-4 flex">
                        <Button
                          onClick={() => {
                            if (currentCard.id === card.id) {
                              setCurrentCard({});
                            } else {
                              setCurrentCard(card);
                              setEditedCardQ(card.question);
                              setEditedCardA(card.answer);
                            }
                          }}
                          className="p-2 h-fit"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() =>
                            editingFlashcard
                              ? setEditingFlashcard(false)
                              : currentCard.id === card.id &&
                                setEditingFlashcard(true)
                          }
                          variant="outline"
                          className="p-2 h-fit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          className="p-2 h-fit"
                          onClick={() =>
                            setDecks((prev) => deleteCardById(prev, card.id))
                          }
                        >
                          <Delete className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-2/5 h-full space-y-3 p-2 overflow-y-auto">
                <div className="flex justify-between">
                  <span className="text-2xl font-semibold">
                    Super deck settings
                  </span>
                  <div className=" gap-x-2 w-fit flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="gap-x-2"
                          variant={"destructive"}
                          onClick={() => {
                            const newCard = {
                              id: Date.now().toString(),
                              question: "New Question",
                              answer: "New Answer",
                            };
                            setDecks((prev) =>
                              addCardToDeck(prev, selectedDeck.id, newCard)
                            );
                            setCurrentCard(newCard);
                          }}
                        >
                          Delete
                          <Trash className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. It will permanently
                            this superdeck.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button variant="destructive">Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button className="gap-x-2" variant={"secondary"}>
                      Save
                      <SaveAll className="h-4 w-4" />
                    </Button>{" "}
                    <Button className="gap-x-2" onClick={() => uploadSet()}>
                      Publish
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="w-full h-full space-y-2 mb-6">
                  <Tabs
                    defaultValue={tabSetting}
                    className="space-y-2 text-left justify-start"
                  >
                    <TabsList className="space-x-4 relative bg-foreground/5 p-1 rounded-md">
                      <TabsTrigger
                        onClick={() => setSettingTab("settings")}
                        value="settings"
                        className={`p-1.5 text rounded-md trnasform transition-all ${tabSetting === "settings" && "bg-primary/25"}`}
                      >
                        Settings
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      className="grid grid-cols-2 gap-4"
                      value="settings"
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="rounded-md w-full h-full flex justify-between">
                            <Label className="flex gap-x-2 p-0.5 items-center shadow-md">
                              <Earth /> Public Flashcard
                            </Label>
                            <Switch
                              onClick={() =>
                                setIsFlashcardPublic((prev) => !prev)
                              }
                              checked={isflashcardPublic}
                              className="shadow-md"
                            ></Switch>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="rounded-md w-full h-full gap-x-4 flex justify-between">
                            <Label className="flex gap-x-2 p-0.5 items-center shadow-md">
                              Name
                            </Label>
                            <Input
                              value={flashcardsetName}
                              onChange={(e) =>
                                setFlashcardsetName(e.target.value)
                              }
                            ></Input>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="rounded-md w-full h-full gap-x-4 flex justify-between">
                            <Label className="flex gap-x-2 p-0.5 items-center shadow-md">
                              Description
                            </Label>
                            <Input
                              value={desc}
                              onChange={(e) => setDesc(e.target.value)}
                            ></Input>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
