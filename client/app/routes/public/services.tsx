import Heading from "~/components/ui/heading";
import Fancy from "~/components/ui/typography/fancy";
import { CodeXml, PencilRuler, Database, Braces } from "lucide-react";
import ServiceCard from "~/components/service-card";
import GlowEffect from "~/components/glow-effect";

const services = [
  {
    icon: <CodeXml className="size-7 stroke-white" />,
    title: "Fullstack Web\n Developement",
    description:
      "Custom web applications built from front to back — scalable, secure, and optimized for performance. I handle everything from the UI to the database.",
  },
  {
    icon: <PencilRuler className="size-7 stroke-white" />,
    title: "UI/UX Design &\n Implementation",
    description:
      "User-focused interfaces that are intuitive, modern, and responsive. I design clean UIs and bring them to life with tools like Figma, React, and Tailwind.",
  },
  {
    icon: <Database className="size-7 stroke-white" />,
    title: "Databases \n Management",
    description:
      "Designing and managing structured, scalable databases (MySQL, MongoDB). I handle schema design, optimization, and data integrity for high-performance apps",
  },
  {
    icon: <Braces className="size-7 stroke-white" />,
    title: "Design to Code\n Conversion",
    description:
      "Turn your Figma, Sketch, or XD designs into production-ready, pixel-accurate code with fully responsive layouts.",
  },
];

const Services = () => {
  return (
    <div className="px-6 py-30 relative">
      <GlowEffect />
      {/* PROJECTS SECTION */}
      <section className="space-y-26">
        <Heading description="My Top Quality Services">
          What I <Fancy>Offer</Fancy>
        </Heading>
        <div className="flex flex-wrap justify-center gap-12">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Services;
