"use client";

import { motion } from "framer-motion";
import {
  Users,
  LineChart,
  Zap,
  Award,
  Clock,
  Brain,
  Gamepad2,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: <Gamepad2 className="h-10 w-10 text-primary" />,
    title: "Interactive Game Modes",
    description:
      "Choose from multiple engaging game formats including quizzes, flashcards, and team challenges.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Real-time Multiplayer",
    description:
      "Compete with classmates in live sessions with instant feedback and dynamic leaderboards.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: "Progress Tracking",
    description:
      "See learning progress with detailed analytics and personal insights.",
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "Adaptive Learning",
    description:
      "AI-powered system that adjusts to your learning pace and focuses on areas needing improvement.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Vast Content Library",
    description:
      "Access thousands of pre-made quizzes or easily create your own custom content.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Time-Based Challenges",
    description:
      "Test knowledge under pressure with timed questions that keep learning exciting.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Instant Feedback",
    description:
      "Receive immediate results and explanations to reinforce learning on the spot.",
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Achievements & Rewards",
    description:
      "Earn badges, trophies, and points to stay motivated throughout your learning journey.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Features designed for better learning
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to make education interactive, engaging, and
            effective
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-250"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
