"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { Award, Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface Player {
  id: string;
  nickname: string;
  name: string;
  score: number;
  avatar: string;
}

interface GameResultsProps {
  players: Player[];
  onPlayAgain: () => void;
  onExit: () => void;
}

export function GameResults({
  players,
  onPlayAgain,
  onExit,
}: GameResultsProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // push the winner to the spotlight
  const winner = players[0];
  const runnersUp = players.slice(1, 5);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4">
      {showConfetti && <ConfettiEffect />}
      <div className="absolute end-10 p-6 bg-black hidden">
        <Card className="p-3 space-y-6">
          <CardTitle className="text-center">Lucky Draw</CardTitle>
          <CardContent className="grid grid-cols-4 gap-2">
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
            <div className="py-2 px-4 bg-amber-300 font-mono text-4xl text-black">
              ?
            </div>{" "}
          </CardContent>
        </Card>
      </div>
      <div className="w-full max-w-5xl">
        <motion.div
          className="bg-gradient-to-r text-black text-6xl from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20 rounded-xl p-6 mb-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-semibold mb-4">Winner</h2>
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-2">
              <div className="text-7xl mb-2">{winner.avatar}</div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <div className="font-bold mb-1">{winner.nickname}</div>
            <div className="text-6xl font-mono">{winner.score} pts</div>
          </div>
        </motion.div>

        <Card className="mb-8 bg-transparent backdrop-blur-[2px]">
          <CardContent className="p-4 ">
            <h2 className="font-semibold mb-4">Top Players</h2>
            {runnersUp.map((player, index) => (
              <motion.div
                key={player.id}
                className="flex items-center justify-between py-3 my-2 last:my-0 border-b last:border-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center text-4xl">
                  <div className="bg-muted w-8 h-8 text-2xl rounded-full flex items-center justify-center mr-3">
                    {index + 2}
                  </div>
                  <div className="mr-3 text-xl">{player.avatar}</div>
                  <div className="font-medium">{player.nickname}</div>
                </div>
                <div className="font-mono text-4xl font-semibold">
                  {player.score}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="outline" className="sm:flex-1" onClick={onExit}>
            Exit
          </Button>
          <Button className="sm:flex-1" onClick={onPlayAgain}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
          <Button variant="outline" className="sm:flex-1">
            <Download className="h-4 w-4 mr-2" />
            Save Results
          </Button>
        </div>
      </div>
    </div>
  );
}

function ConfettiEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        const colors = ["#FFC107", "#FF9800", "#FF5722", "#4CAF50", "#2196F3"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: "-20px",
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
              zIndex: 50,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: Math.random() * 360,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: animationDuration,
              delay: animationDelay,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
