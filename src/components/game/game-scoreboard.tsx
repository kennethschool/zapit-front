"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowBigUp, ArrowUpNarrowWide, Trophy } from "lucide-react";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { Progress } from "../ui/progress";

interface Player {
  id: string;
  name: string;
  nickname: string;
  score: number;
  avatar: string;
}

interface GameScoreboardProps {
  players: Player[];
  questionNumber: number;
  totalQuestions: number;
  isGameFinished: boolean;
}

export function GameScoreboard({
  players,
  questionNumber,
  totalQuestions,
  isGameFinished,
}: GameScoreboardProps) {
  //  chop the top 3 players
  const topPlayers = players.slice(0, 3);
  const otherPlayers = players.slice(3);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
            <LightningBoltIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Current Standings</h1>
          <p className="text-muted-foreground">
            Question {questionNumber} of {totalQuestions} completed
          </p>
          <Progress
            value={(questionNumber / totalQuestions) * 100}
            className="h-2 w-1/2  place-self-center-safe my-4 bg-foreground/5 transition-all"
          />
        </div>

        <div className="grid grid-cols-3 gap-48 mb-8 text-5xl">
          {/* 2nd */}
          {topPlayers.length > 1 && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative mb-4">
                <div className="text-5xl">{topPlayers[1].avatar}</div>
                <div className="absolute text-xl -bottom-2 -right-2 bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
                  2
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">{topPlayers[1].nickname}</div>
                <div className="text-muted-foreground">
                  {topPlayers[1].score} pts
                </div>
              </div>
            </motion.div>
          )}

          {/* 1St */}
          {topPlayers.length > 0 && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-4 text-7xl">
                <div className="text-7xl">{topPlayers[0].avatar}</div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold">{topPlayers[0].nickname}</div>
                <div className="text-primary font-medium">
                  {topPlayers[0].score} pts
                </div>
              </div>
            </motion.div>
          )}

          {/* 3rd place */}
          {topPlayers.length > 2 && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative mb-4">
                <div className="text-5xl">{topPlayers[2].avatar}</div>
                <div className="absolute text-xl -bottom-2 -right-2 bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
                  3
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">{topPlayers[2].nickname}</div>
                <div className="text-muted-foreground">
                  {topPlayers[2].score} pts
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <Card className="bg-transparent backdrop-blur-sm overflow-y-auto overflow-x-hidden h-[40vh] text-3xl">
          <CardContent className="p-4 space-y-3">
            <h2 className="font-semibold mb-4">Leaderboard Podium</h2>

            <AnimatePresence>
              {otherPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="flex px-6 absolute w-full items-center justify-between py-3 border-b last:border-0"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    y: index * 100,
                  }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                >
                  <ArrowBigUp className="absolute -left-2 fill-accent" />
                  <div className="bg-[url('/bolt.svg')] rounded-xl w-full p-2 px-4 flex items-center">
                    <div className="bg-muted text-lg w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      {index + 4}th
                    </div>
                    <div className="mr-3 text-xl">{player.avatar}</div>
                    <div className="font-medium">{player.nickname}</div>
                  </div>
                  <div className="font-mono bg-[url('/bolt.svg')] p-3 rounded-xl font-semibold px-2">
                    {player.score}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-muted-foreground text-5xl">
          {isGameFinished && "Game has concluded!"}
        </div>
      </div>
    </div>
  );
}
