import { Button } from "~/components/ui/button";
import pfp from "../../assets/pfp.png";
import Heading from "~/components/ui/heading";
import { P } from "~/components/ui/typography";
import Fancy from "~/components/ui/typography/fancy";
import SocialButtons from "~/components/social-buttons";
import GlowEffect from "~/components/glow-effect";

const About = () => {
  return (
    <div className="py-30 relative">
      <GlowEffect />
      {/* ABOUT SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-center px-6 gap-20">
        <img
          src={pfp}
          alt="Amriad's profile picture"
          className="size-60 rounded-md"
        />

        <div className="space-y-8 max-w-lg ">
          <Heading
            className="lg:text-start"
            description="The Guy Behind the Code"
          >
            Who is <Fancy>Amriad</Fancy>
          </Heading>
          <P className="text-muted-foreground italic text-center lg:text-start">
            I'm a fullstack developer based in Algeria with a CS background and
            a self-taught mindset. I enjoy building modern web apps, constantly
            learnning and improving my skills in the field.
          </P>
          <div className="flex items-center justify-center lg:justify-start gap-6">
            <Button size="lg">Download CV</Button>
            <SocialButtons />
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
