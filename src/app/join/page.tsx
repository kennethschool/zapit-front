"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { InputOTP } from "~/components/ui/input-otp";
import { Label } from "~/components/ui/label";
import { useTheme } from "~/components/theme/ThemeProvider";
import { authClient } from "@/lib/auth-client";
import { getWS, useWebSocket } from "@/components/connections/wsClient";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  gameCode: z
    .string()
    .min(4, { message: "Game code must be at least 6 characters" })
    .max(8, { message: "Game code can't be longer than 8 characters" }),
  nickname: z
    .string()
    .min(2, { message: "Nickname must be at least 5 characters" })
    .max(15, { message: "Nickname can't be longer than 15 characters" }),
});

export default function JoinGamePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [joiningGame, SetJoiningGame] = useState(false);
  const [joinVisibility, setJoinVisibility] = useState(false);
  const maxNicknameLength = 12;
  const minNicknameLength = 2;
  const maxDigits = 5;

  useEffect(() => {
    if (value.length === maxDigits && name.length > minNicknameLength) {
      setJoinVisibility(true);
    } else {
      setJoinVisibility(false);
    }
  }, [value, name]);

  const handleChange = (e) => {
    const input = e.target.value;
    // just allow numbers and limit length
    if (/^[0-9]*$/.test(input) && input.length <= maxDigits) {
      setValue(input);
    }
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxNicknameLength) {
      setName(input);
    }
  };

  const { data: session } = authClient.useSession();

  const ws = getWS();

  ws.onmessage = (e) => {
    console.log("Message:", e.data);

    const data = JSON.parse(e.data);
    console.log(data.code);

    if (data.type === "joined-lobby") {
      router.push(`/host/lobby/${data.code}`);
    }
  };

  const joinGame = () => {
    //console.log(session?.user);
    ws.send(
      JSON.stringify({
        type: "join-lobby",
        code: value,
        nickname: name,
        userData: session?.user,
      })
    );
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {joiningGame && (
        <motion.svg
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="animated-pattern bg-background z-50 gap-x-8 w-full h-full inset-0 absolute opacity-100"
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
              patternTransform="rotate(45)"
            >
              <g>
                <path
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
                  fontSize="48"
                  fill={theme === "dark" ? "white" : "black"}
                  className="font-bold outline-none text-xl tracking-tight transition-all duration-150 uppercase"
                >
                  zapit
                </text>
              </g>

              <g transform="translate(100,50)">
                <path
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
                  fontSize="48"
                  fill={theme === "dark" ? "white" : "black"}
                  className="font-bold outline-none text-xl tracking-tight transition-all duration-150 uppercase"
                >
                  zapit
                </text>
              </g>

              <animateTransform
                attributeName="patternTransform"
                type="translate"
                from="0,0"
                to="200,0"
                dur="0.3s"
                repeatCount="indefinite"
                additive="sum" // 🔑 keeps the rotate(45) while adding translate()
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#zapitPattern)" />
        </motion.svg>
      )}

      {!joiningGame && (
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-block p-4 border border-yellow-100 rounded-full mb-4">
              <LightningBoltIcon className="h-12 w-12 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Join a Game</h1>
            <p className="text-muted-foreground">
              Enter the game code and your nickname to join
            </p>
          </div>

          <div className="text-center">
            <Input
              value={value}
              className="text-center mb-4 inner"
              onChange={handleChange}
              placeholder={`Enter up to ${maxDigits} digits`}
              type="text"
            />
            <Label
              className={`w-fit ${value.length === maxDigits && "text-green-400"}`}
            >
              {value.length} / {maxDigits} characters
            </Label>
          </div>
          <div className="text-center mt-3">
            <Input
              value={name}
              className="text-center mb-4 inner"
              onChange={handleNameChange}
              placeholder={`Custom 12 character name`}
              type="text"
            />
            <Label
              className={`w-fit ${name.length > minNicknameLength && "text-green-400"}`}
            >
              {name.length} / {maxNicknameLength} characters
            </Label>
          </div>

          {joinVisibility && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-center mt-3"
            >
              <Button onClick={() => [SetJoiningGame(true), joinGame()]}>
                Join Game
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
