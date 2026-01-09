"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { AnimatePresence, motion } from "framer-motion";
import { Users } from "lucide-react";
import { TypingAnimation } from "../magicUI/typing-animation";

interface GameLobbyProps {
  gameCode: string;
  players: Array<{ id: string; name: string; avatar: string }>;
  onStart: () => void;
}

export function GameLobby({ gameCode, players, onStart }: GameLobbyProps) {
  const [countdown, setCountdown] = useState<number | null>(null);

  const [gameModeInstructions, setGameModeInstructions] = useState([
    "Hi mom",
    "Lmao",
    "Boy",
    "omg",
  ]);
  const [insIndex, setInsIndex] = useState(0);

  useEffect(() => {
    if (insIndex < gameModeInstructions.length - 1) {
      const interval = setInterval(() => {
        setInsIndex((prev) => {
          if (prev < gameModeInstructions.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [insIndex, gameModeInstructions.length]);

  // useEffect(() => {
  //   // auto-start after enough players have joined
  //   const timer = setTimeout(() => {
  //     setCountdown(5);
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onStart();
    }
  }, [countdown, onStart]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4">
      <div className="absolute p-6 w-full top-24 gap-4 flex justify-between ">
        <div className="flex justify-start gap-2 w-1/6  h-[80vh]">
          <Card className="absolute w-1/7 bg-transparent backdrop-blur-xs">
            <CardTitle>
              <h2 className="flex justify-center mt-4 items-center  text-center gap-2">
                Participants <Users />{" "}
              </h2>
            </CardTitle>
            <CardContent className="my-6 overflow-y-auto  max-h-[20vh]">
              <div className=" space-y-4">
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>{" "}
         <Card className="absolute bottom-0 w-1/7 bg-transparent backdrop-blur-xs">
            <CardTitle>
              <h2 className="flex justify-center mt-4 items-center  text-center gap-2">
                Participants <Users />{" "}
              </h2>
            </CardTitle>
            <CardContent className="my-6 overflow-y-auto  max-h-[20vh]">
              <div className=" space-y-4">
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>{" "}
        </div>{" "}
         <div className="flex justify-end gap-2 w-1/6  h-[80vh]">
          <Card className="absolute w-1/7 bg-transparent backdrop-blur-xs">
            <CardTitle>
              <h2 className="flex justify-center mt-4 items-center  text-center gap-2">
                Participants <Users />{" "}
              </h2>
            </CardTitle>
            <CardContent className="my-6 overflow-y-auto  max-h-[20vh]">
              <div className=" space-y-4">
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>{" "}
         <Card className="absolute bottom-0 w-1/7 bg-transparent backdrop-blur-xs">
            <CardTitle>
              <h2 className="flex justify-center mt-4 items-center  text-center gap-2">
                Participants <Users />{" "}
              </h2>
            </CardTitle>
            <CardContent className="my-6 overflow-y-auto  max-h-[20vh]">
              <div className=" space-y-4">
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
                <Card className="p-3 px-4">
                  <div>
                    <span>Player1</span>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>{" "}
        </div>{" "}
      </div>
      <div className="space-y-2 absolute top-20 text-6xl my-6 text-center">
        {" "}
        <span className="rock-salt-regular">
          See your name on the screen?{" "}
        </span>
        <p className="p-3 rounded-md bg-background/75 backdrop-blur-[2px] font-semibold my-6">BlueRyai</p>
      </div>

      <Card className="w-full max-w-6xl bg-background/80 backdrop-blur-sm transform transition-all">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
              <LightningBoltIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Game Instructions</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-muted-foreground">Tutorial for game mode:</p>
            </div>
          </div>

          <div className="my-12">
            <AnimatePresence>
              {gameModeInstructions.map(
                (i, index) =>
                  index === insIndex && (
                    <motion.div
                      key={i}
                      className="bg-muted ring ring-primary ont-medium rounded-lg p-3 text-center text-balance wrap-break-word"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                     <TypingAnimation className="text-7xl">{i}</TypingAnimation>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
      <Button className="absolute bottom-20 flex w-1/2 items-center gap-2">
        Ready? <div className="p-2.5 rounded-full bg-destructive"></div>
      </Button>
      <span className="absolute bottom-10">Out of 2/3 players are ready</span>
    </div>
  );
}
