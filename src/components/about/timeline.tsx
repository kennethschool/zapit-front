import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";

export function Timeline() {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">The Journey</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The evolution of Zapit from concept to revolutionary learning platform
        </p>
      </div>

      <div className="relative overflow-y-auto max-h-96">
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-screen w-0.5 bg-primary shadow-lg shadow-amber-200"></div>

        <div className="space-y-12 p-4">
          <div className="relative">
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Idea Phase</h3>
                <p className="text-lg text-muted-foreground">
                  This is where I (Ken) recognised the need for more engaging
                  learning tools in the market of education and then began
                  thinking about how I would acheive this.{" "}
                </p>
              </div>

              <div className="absolute dark:animate-pulse-shadow left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 bg-primary rounded-full w-10 h-10 flex items-center justify-center z-10">
                <LightningBoltIcon className="h-5 w-5 text-white" />
              </div>

              <div className="md:w-1/2 md:pl-12">
                <div className="bg-muted rounded-lg p-4 inline-block">
                  <span className="text-sm font-semibold">2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0 ADD-THIS-LATER-md:order-1">
                <div className="bg-muted rounded-lg p-4 inline-block">
                  <span className="text-sm font-semibold">2025</span>
                </div>
              </div>

              <div className="absolute dark:animate-pulse-shadow left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 bg-primary rounded-full w-10 h-10 flex items-center justify-center z-10">
                <LightningBoltIcon className="h-5 w-5 text-white" />
              </div>

              <div className="md:w-1/2 md:pl-12 md:order-none">
                <h3 className="text-xl font-bold mb-2">Development</h3>
                <p className="text-lg text-muted-foreground">
                  Initial prototypes were created and tested with a small group
                  of classmates.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Platform Launch</h3>
                <p className="text-lg text-muted-foreground">
                  Zapit officially launched with core features for quizzes,
                  flashcards, and interactive learning games.
                </p>
              </div>

              <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 bg-muted bg - primary rounded-full w-10 h-10 flex items-center justify-center z-10">
                <LightningBoltIcon className="h-5 w-5 text-primary text - white" />
              </div>

              <div className="md:w-1/2 md:pl-12">
                <div className="bg - primary bg-muted rounded-lg p-4 inline-block">
                  <span className="text-sm font-semibold text - black">
                    Scheduled 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0 ADD-THIS-LATER-md:order-1">
                <div className="bg-muted rounded-lg p-4 inline-block">
                  <span className="text-sm font-semibold">The Future</span>
                </div>
              </div>

              <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 bg-muted rounded-full w-10 h-10 flex items-center justify-center z-10">
                <LightningBoltIcon className="h-5 w-5 text-primary" />
              </div>

              <div className="md:w-1/2 md:pl-12 md:order-none">
                <h3 className="text-xl font-bold mb-2">Expanding Horizons</h3>
                <p className="text-lg text-muted-foreground">
                  Zapit's roadmap includes advanced AI features, expanded
                  content libraries, and tools for schools, jobs and
                  universities worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
