import { P } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import Heading from "~/components/ui/heading";
import Fancy from "~/components/ui/typography/fancy";
import GlowEffect from "~/components/glow-effect";

export default function Home() {
  return (
    <div className="py-30 px-6 relative">
      <GlowEffect />
      {/* HERO SECTION */}
      <section className="max-w-xl space-y-8 m-auto text-center">
        <Heading description="A Fullstack Developer">
          Hi, I'm <Fancy>{"<Amriad/>"}</Fancy>
        </Heading>
        <P className="text-muted-foreground italic">
          with the passion for building modern web applications that are
          functional, performant and elegant. Always excited to take new
          challenges.
        </P>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg">Hire Me</Button>
          <Button variant="outline" size="lg">
            View Projects
          </Button>
        </div>
      </section>
    </div>
  );
}
