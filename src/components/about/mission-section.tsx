"use client";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import { useState } from "react";
import { BorderBeam } from "../magicUI/borderBeams";

export function MissionSection() {
  const [logoHover, setLogoHoverState] = useState(false);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div
          onMouseLeave={() => setLogoHoverState(false)}
          onMouseOver={() => setLogoHoverState(true)}
          className={`bg-primary/10 transition-all rounded-full w-16 h-16 flex items-center justify-center mb-6 ${
            logoHover ? "hero-pattern-no-bg dark:ring ring-yellow-500" : ""
          }`}
        >
          <LightningBoltIcon className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg mb-6 text-muted-foreground">
          Zapit is an upcoming innovative learning platform designed to
          change engagement between students and teachers. We believe
          learning should be engaging, effective, and most importantly - fun!
        </p>
        <p className="text-lg text-muted-foreground">
          By blending the best features of popular platforms like Kahoot,
          Quizlet, Seneca, and Blooket, we've introduced fresh ideas to make
          learning more engaging, efficient, and user-friendly for everyone
          involved.
        </p>
      </div>

      <div className="relative  rounded-xl p-8">
        <BorderBeam
          duration={6}
          delay={3}
          initialOffset={20}
          size={200}
          className="from-transparent via-yellow-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={1}
          size={200}
          className="from-transparent via-yellow-300 to-transparent"
        />
        <h3 className="text-xl font-semibold mb-4">What Sets Us Apart</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <span className="font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium mb-1">Adaptive Learning</h4>
              <p className="text-muted-foreground">
                Our platform accommodates different learning styles by
                suggesting personalised content based on performance and
                identifying key areas for revision.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <span className="font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium mb-1">Gamified Competition</h4>
              <p className="text-muted-foreground">
                With leaderboards, fun minigames, timed challenges, and detailed
                progress reports, we create a vibrant, motivating atmosphere for
                development.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <span className="font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium mb-1">Creator Empowerment</h4>
              <p className="text-muted-foreground">
                Both students and teachers can create quizzes, flashcards, and
                interactive lessons, making learning a collaborative experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
