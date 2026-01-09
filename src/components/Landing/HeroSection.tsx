"use client";
import React from "react";
import { motion } from "framer-motion";
import { SparklesText } from "../magicUI/sparkles";
import Link from "next/link";
import { Button } from "../ui/button";
import Nav from "../layout/navbar";
import { LightningBoltIcon } from "../icons/lightning-bolt-icon";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden  from-white to-yellow-50 dark:bg-black">
      <div className="dark:animate-move-pattern hero-pattern-no-bg absolute inset-0 opacity-50"></div>

      <div className="container relative px-4 py-16 md:py-24 lg:py-32 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex space-x-2 items-center justify-center px-4 py-2 rounded-full border bg-regular-light backdrop-blur-[1px] border-yellow-100 text-yellow-800 mb-6">
              <LightningBoltIcon className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Learning reimagined</span>
            </div>
            <SparklesText>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Master any subject—
                <br />
                <span className="relative">
                  faster, smarter,
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute h-3 bg-yellow-300/30 bottom-2 left-0 -z-10"
                  ></motion.span>
                </span>
                <br />
                and with a little fun.
              </h1>
            </SparklesText>

            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              The interactive learning platform that makes education engaging
              through games, quizzes, and friendly competition.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="px-8 py-6 text-lg font-medium">
                  Get Started
                </Button>
              </Link>
              <Link href="/join">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-medium"
                >
                  Join a Game
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 shadow-xl overflow-hidden backdrop-blur-sm border border-primary/10">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>

              <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary py-4 px-6 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <LightningBoltIcon className="h-6 w-6 text-black" />
                    <span className="font-bold text-black">
                      GAME CODE: XY42Z
                    </span>
                  </div>
                  <div className="text-black font-medium">Players: 24</div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Science Quiz</h3>
                    <p className="text-muted-foreground">Question 3 of 10</p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg mb-6">
                    <p className="text-lg font-medium text-center">
                      Which planet is known as the Red Planet?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-blue-600 transition-colors">
                      Earth
                    </div>
                    <div className="bg-red-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-red-600 transition-colors">
                      Mars
                    </div>
                    <div className="bg-yellow-500 text-black p-4 rounded-lg text-center cursor-pointer hover:bg-yellow-600 transition-colors">
                      Venus
                    </div>
                    <div className="bg-green-500 text-white p-4 rounded-lg text-center cursor-pointer hover:bg-green-600 transition-colors">
                      Jupiter
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <div className="font-bold">Time Left:</div>
                    <div className="text-xl font-mono font-bold">15s</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-40 h-40 bg-primary rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="absolute pulse -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-background">
              <LightningBoltIcon className="w-6 h-6 text-black" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
