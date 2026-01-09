"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { Copy, Lock, Settings, Unlock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/components/theme/ThemeProvider";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getWS } from "@/components/connections/wsClient";
import { useRouter } from "next/navigation";

interface Player {
  id: string;
  nickname: string;
  avatar: string;
  ready: boolean;
  fingerprint: any;
  ws: any;
}

// mock data for demonstration
const MOCK_PLAYERS: Player[] =
  process.env.NODE_ENV !== "development"
    ? [
        { id: "1", name: "John Doe", avatar: "👨‍🎓", ready: true },
        {
          id: "2",
          name: "Jane Doe",
          avatar: "👩‍🎓",
          ready: true,
        },
        { id: "3", name: "Johnson Doe", avatar: "🧑‍🎓", ready: false },
      ]
    : [];

export default function LobbyPage({ params }) {
  const { theme } = useTheme();
  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS);
  const [locked, setLocked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lobby, SetLobby] = useState({});
  const router = useRouter();
  const [settings, setSettings] = useState({
    allowLateJoin: true,
    showAnswerReview: true,
    randomiseQuestions: true,
    podiumPlaces: 3,
  });

  const ws = getWS();

  useEffect(() => {
    ws.send(
      JSON.stringify({
        type: "get-lobby",
        code: params.id,
      })
    );

    ws.onmessage = (e) => {
      //console.log("Message:", e.data);
      const data = JSON.parse(e.data);

      if (data.type === "lobby-grabbed") {
        const parsed = JSON.parse(e.data);
        SetLobby(parsed.lobby);
        setPlayers(parsed.lobby.clients);
      }
      if (data.type === "game-started") {
        router.push(`/game/${params.id}`);
      }
      if (data.type === "kicked") {
        router.push(`/join`);
      }
      if (data.type === "client-players-update") {
        const parsed = JSON.parse(e.data);
        setPlayers(parsed.players);
      }
      if (data.type === "player-joined") {
        const parsed = JSON.parse(e.data);
        setPlayers(parsed.clients);
      }
      if (data.type === "player-left") {
        const parsed = JSON.parse(e.data);
        setPlayers(parsed.clients);
      }
    };
  }, [ws]);

  const handleKick = (id: any) => {
    //setPlayers((prev) => prev.filter((p) => p.id !== id));
    ws.send(
      JSON.stringify({
        type: "kick",
        code: params.id,
        fingerprint: id,
      })
    );
  };

  const copyGameCode = () => {
    navigator.clipboard.writeText(params.id);
    toast("Game code copied! Share this code with your players.");
  };

  const startGame = () => {
    ws.send(
      JSON.stringify({
        type: "start-game",
        code: params.id,
      })
    );
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-[95vw] h-[80vh]">
        <motion.div className="overflow-hidden relative">
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
          <CardContent
            className={`p-6 relative h-[80vh] ${showSettings ? "hidden" : ""}`}
          >
            <div className="text-center mb-8 z-50">
              <div className="inline-flex pulse p-3 backdrop-blur-sm border border-primary/10 rounded-full mb-4">
                <LightningBoltIcon className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Game Lobby by {lobby && lobby?.host?.data?.username}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileTap={{
                    scale: 0.8,
                    rotate: 4.5,
                    backgroundColor: "lightgreen",
                  }}
                  className="bg-yellow-100 px-6 text-black py-3 rounded-lg font-mono text-2xl font-bold cursor-pointer hover:bg-yellow-200 transition-colors dark:text-black"
                  onClick={copyGameCode}
                >
                  {params.id}
                  <Copy className="inline ml-2 h-4 w-4" />
                </motion.div>
                <p className="text-muted-foreground">
                  Share this code with your players
                </p>
              </div>
            </div>

            <div className="relative h-[50vh]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Players ({players.length})
                </h2>
                <div>
                  <Button
                    onClick={() => setLocked(!locked)}
                    className="transition-all"
                    variant={"ghost"}
                  >
                    {!locked ? (
                      <Lock className="h-4 w-4 mr-2" />
                    ) : (
                      <Unlock className="h-4 w-4 mr-2" />
                    )}
                    {!locked ? <>Lock</> : <>Unlock</>}
                  </Button>{" "}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              <div className="max-h-[350px] overflow-y-auto mb-4 transition-all">
                <div className="flex flex-wrap gap-4 mb-6 justify-center">
                  <AnimatePresence>
                    {players.map((player) => (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`relative w-fit text-ellipsis truncate bg-muted p-4 rounded-lg flex gap-x-8 items-center justify-between group overflow-hidden ${
                          player.ready ? "border-2 border-primary" : ""
                        }`}
                      >
                        <div className="flex items-center z-10">
                          <span className="text-2xl mr-3">{player.avatar}</span>
                          <p className="font-medium truncate">
                            {player.nickname}
                          </p>
                        </div>
                        {player.ready && (
                          <div className="h-2 w-2 rounded-full bg-primary z-10"></div>
                        )}

                        <Button
                          variant={"destructive"}
                          onClick={() => handleKick(player.fingerprint)}
                          className="absolute h-full z-20 inset-0 bg-red-600 text-white font-bold hidden items-center justify-center group-hover:flex transition-opacity"
                        >
                          Kick
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <Button
                className="w-full py-6 text-lg  absolute inset-x-0 bottom-0"
                onClick={startGame}
                disabled={players.length < 1}
              >
                Start Game
              </Button>
            </div>
          </CardContent>
        </motion.div>
        <motion.div className="">
          {" "}
          <CardContent className={`p-6 ${!showSettings ? "hidden" : ""}`}>
            {" "}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Late Join</Label>
                        <p className="text-sm text-muted-foreground">
                          Players can join after game starts
                        </p>
                      </div>
                      <Switch
                        checked={settings.allowLateJoin}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, allowLateJoin: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Answer Review</Label>
                        <p className="text-sm text-muted-foreground">
                          Display correct answers after each question
                        </p>
                      </div>
                      <Switch
                        checked={settings.showAnswerReview}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            showAnswerReview: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Randomise Questions</Label>
                        <p className="text-sm text-muted-foreground">
                          Shuffle question order for each game
                        </p>
                      </div>
                      <Switch
                        checked={settings.randomiseQuestions}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            randomiseQuestions: checked,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Podium Places</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={settings.podiumPlaces}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            podiumPlaces: parseInt(e.target.value) || 3,
                          })
                        }
                      />
                      <p className="text-sm text-muted-foreground">
                        Number of winners to show on podium
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowSettings(!showSettings)}
                      variant={"outline"}
                      className="w-full py-6 text-lg"
                    >
                      Back
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </motion.div>
      </Card>
    </div>
  );
}
