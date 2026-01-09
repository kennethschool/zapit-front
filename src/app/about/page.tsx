import { TeamSection } from "@/components/about/team-section";
import { MissionSection } from "@/components/about/mission-section";
import { Timeline } from "@/components/about/timeline";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export function meta() {
  return [
    { title: "About Zapit" },
    {
      name: "description",
      content:
        "Learn about Zapit's mission to improve learning through engaging, interactive experiences.",
    },
  ];
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">About Zapit</h1>
        <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
          Zapit on a mission to improve learning through engaging,
          interactive experiences.
        </p>
      </section>

      <MissionSection />

      <Timeline />

      <TeamSection />

      <section className="bg-primary/10 rounded-2xl p-8 my-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to ZAP through quizzes?
          </h2>
 
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
