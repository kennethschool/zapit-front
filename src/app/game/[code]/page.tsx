"use client";

import { useState, useEffect } from "react";
import { GameQuestion } from "@/components/game/game-question";
import { GameLobby } from "@/components/game/game-lobby";
import { GameResults } from "@/components/game/game-results";
import { CountdownTimer } from "@/components/game/countdown-timer";
import { GameScoreboard } from "@/components/game/game-scoreboard";
import { LightningBoltIcon } from "~/components/icons/lightning-bolt-icon";
import { FaFire } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTheme } from "~/components/theme/ThemeProvider";
import { Button } from "~/components/ui/button";
import { getWS } from "@/components/connections/wsClient";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type GameState =
  | "lobby"
  | "question"
  | "scoreboard"
  | "results"
  | "game"
  | "disconnected"
  | "reconnecting"
  | "default";

export default function GamePage({ params }: { params: { code: string } }) {
  const [gameState, setGameState] = useState<GameState>("default");
  const router = useRouter();
  const [nickname, SetNickname] = useState("N/A");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isGameFinished, setGameFinished] = useState(false);
  const [viewingAnswers, setViewingAnswers] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isHost, SetIsHost] = useState(false);
  const [players, setPlayers] = useState([
    { id: "1", name: "Player 1", score: 0, avatar: "👨‍🎓" },
    { id: "2", name: "Player 2", score: 0, avatar: "👩‍🎓" },
    { id: "3", name: "Player 3", score: 0, avatar: "🧑‍🎓" },
    { id: "4", name: "Player 1", score: 0, avatar: "👨‍🎓" },
    { id: "5", name: "Player 2", score: 0, avatar: "👩‍🎓" },
    { id: "6", name: "Player 3", score: 0, avatar: "🧑‍🎓" },
  ]);

  const currentQuestion = questions[currentQuestionIndex];

  const [gameLink, setGameLink] = useState("");
  useEffect(() => {
    setGameLink(
      `${window.location.origin}/join/${params.code || "unspecified"}`
    );
  }, [gameLink]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      toast("Copied shareable link!");
      //setCopied(true);
      //setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      toast.error("Failed to copy: " + err);
    }
  };

  const ws = getWS();

  useEffect(() => {
    ws.send(
      JSON.stringify({
        type: "get-lobby",
        code: params.code,
      })
    );

    ws.onmessage = (e) => {
      //console.log("Message:", e.data);
      const data = JSON.parse(e.data);

      if (data.type === "lobby-grabbed") {
        const parsed = JSON.parse(e.data);

        setPlayers(parsed.lobby.clients);

        setQuestions(parsed.lobby.quiz.questions);

        if (parsed.isHost) {
          //toast.info("You are host");
          setGameState("scoreboard");
          SetIsHost(true);
        }
        if (parsed.isPlayer) {
          //toast("You are player");
          setGameState("question");
          SetIsHost(false);
          SetNickname(parsed.user.nickname);
        }
      }

      if (data.type === "player-score-updated") {
        const parsed = JSON.parse(e.data);

        setPlayers(parsed.clients);
      }

      if (data.type === "game-finished") {
        const parsed = JSON.parse(e.data);

        setPlayers(parsed.clients);

        if (parsed.isHost) {
          setGameFinished(true);
        }

        if (parsed.isPlayer) {
          // simulate scoreboard after answering
          setGameState("results");
        }

        //setPlayers(parsed.clients);
      }
    };
  }, [ws]);

  // simulate game flow
  // useEffect(() => {
  //   const timer = setTimeout(
  //     () => {
  //       if (gameState === "lobby") {
  //         //setGameState('question');
  //       } else if (gameState === "question") {
  //         // after question timer expires, show scoreboard
  //         if (currentQuestionIndex < questions.length) {
  //           setGameState("scoreboard");
  //           // Update player scores
  //           setPlayers(
  //             players.map((player) => ({
  //               ...player,
  //               score: player.score + Math.floor(Math.random() * 1000),
  //             }))
  //           );
  //         }
  //       } else if (gameState === "scoreboard") {
  //         if (currentQuestionIndex < MOCK_QUESTIONS.length - 1) {
  //           setCurrentQuestionIndex(currentQuestionIndex + 1);
  //           setGameState("question");
  //         } else {
  //           setGameState("results");
  //         }
  //       }
  //     },
  //     gameState === "lobby"
  //       ? 5000
  //       : gameState === "question"
  //         ? currentQuestion.timeLimit * 1000
  //         : 3000
  //   );
  //   return () => clearTimeout(timer);
  // }, [gameState, currentQuestionIndex, currentQuestion]);

  const handleAnswer = (option: any) => {
    setViewingAnswers(true);
    setAnswered(true);

    // update  player scores
    ws.send(
      JSON.stringify({
        type: "update-score",
        code: params.code,
        score: 20,
      })
    );
    setPlayers(
      players.map((player) => ({
        ...player,
        score: player.score + Math.floor(Math.random() * 1000),
      }))
    );
  };

  const handleFinish = () => {
    //update player scores
    ws.send(
      JSON.stringify({
        type: "finish-game",
        code: params.code,
      })
    );
    setPlayers(
      players.map((player) => ({
        ...player,
        score: player.score + Math.floor(Math.random() * 1000),
      }))
    );
  };

  const { theme } = useTheme();

  return (
    <div className="min-h-[90vh] flex flex-col">
      {" "}
      {gameState !== "reconnecting" && gameState !== "disconnected" && (
        <div>
          {" "}
          <svg
            className="animated-pattern gap-x-8 w-full h-full inset-0 absolute opacity-25"
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
                    fill="yellow"
                    stroke="yellow"
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
                {/* Row 2 offset */}
                <g transform="translate(100,50)">
                  <path
                    viewBox="0 0 24 24"
                    fill="yellow"
                    stroke="yellow"
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
        </div>
      )}
      {gameState === "disconnected" && (
        <>
          <div>
            {" "}
            <svg
              className="fixed gap-x-8 w-[500%] h-[500%] inset-0 opacity-10 rotate-12 -left-1/2"
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
                  {/* Row 2 offset */}
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
          </div>
          <div className="z-30 place-self-center w-1/2  bottom-20 p-6  absolute flex flex-col">
            <div className="self-center text-center">
              <p className="text-5xl font-bold">You have been disconnected</p>
              <p className="text-2xl">Reconnection in progress</p>
            </div>
          </div>
        </>
      )}
      {gameState === "reconnecting" && (
        <>
          <div>
            {" "}
            <svg
              className="fixed gap-x-8 w-[500%] h-[500%] inset-0 opacity-10 -left-1/2"
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
                      className="scale-200 fill-primary stroke-primary"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                  </g>
                  {/* Row 2 offset */}
                  <g transform="translate(100,50)">
                    <path
                      className="scale-160 fill-accent stroke-accent"
                      viewBox="0 0 24 24"
                      fill={`${theme === "dark" ? "white" : "black"}`}
                      stroke={`${theme === "dark" ? "white" : "black"}`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
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
          </div>
          <div className="z-30 place-self-center w-1/2 inset-0  middl p-6  absolute flex flex-col">
            <div className="relative overflow-hidden self-center text-center p-12 rounded-xl border border-foreground/1 bg-background/80">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-16 -mr-16 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
              <p className="text-5xl font-bold">
                ["Reconnecting", "Grabbing past data", "Finally initialising
                client"]
              </p>
              <p className="text-2xl">Reconnection in progress</p>
            </div>
          </div>
        </>
      )}
      <div className="z-20 min-h-[90vh] flex flex-col">
        {gameState === "lobby" && (
          <GameLobby
            gameCode={params.code}
            players={players}
            onStart={() => setGameState("question")}
          />
        )}
        {gameState === "question" && (
          <div className="flex-1 flex flex-col">
            <div className="bg-primary py-2 px-4 text-center text-black">
              <div className="flex items-center space-x-2 w-full justify-around">
                <div className="flex gap-2 items-center">
                  {" "}
                  <LightningBoltIcon className="h-6 w-6 text-black" />
                  <span
                    onClick={copyToClipboard}
                    className="font-bold text-black hover:underline hover:cursor-pointer"
                  >
                    GAME CODE: {params.code}
                  </span>{" "}
                </div>
                {/*<CountdownTimer seconds={currentQuestion.timeLimit} />*/}
                <div className="text-black font-medium flex items-center gap-2">
                  <div className="rounded-full  h-8 w-8 gap-y-4 bg-orange-600">
                    <FaFire className="w-full h-full text-primary" />
                    <span className="text-sm absolute -translate-7.5">2</span>
                  </div>
                  <p>Player: {nickname}</p>
                </div>
              </div>
            </div>

            <GameQuestion
              question={currentQuestion}
              handleFinish={handleFinish}
              onAnswer={handleAnswer}
              viewAnswers={viewingAnswers}
              answered={answered}
              setAnswered={setAnswered}
              setViewingAnswers={setViewingAnswers}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              currentQuestionIndex={currentQuestionIndex}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          </div>
        )}
        {gameState === "scoreboard" && (
          <GameScoreboard
            players={players.sort((a, b) => b.score - a.score)}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            isGameFinished={isGameFinished}
          />
        )}
        {gameState === "results" && (
          <GameResults
            players={players.sort((a, b) => b.score - a.score)}
            onPlayAgain={() => router.push("/join")}
            onExit={() => router.push("/dashboard")}
          />
        )}
      </div>
    </div>
  );
}
