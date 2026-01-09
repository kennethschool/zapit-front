"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface CountdownTimerProps {
  seconds: number;
}

export function CountdownTimer({ seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    setProgress((timeLeft / seconds) * 100);
  }, [timeLeft, seconds]);
  
  const getColorClass = () => {
    if (timeLeft > seconds * 0.6) return "text-green-600";
    if (timeLeft > seconds * 0.3) return "text-yellow-600";
    return "text-red-600 animate-pulse";
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">Time Remaining</span>
        <span className={`text-lg font-bold font-mono ${getColorClass()}`}>
          {timeLeft}s
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 bg-background transition-all" 
      />
    </div>
  );
}