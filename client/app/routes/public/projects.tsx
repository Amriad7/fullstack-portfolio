import GlowEffect from "~/components/glow-effect";
import ProjectCard from "~/components/project-card";
import Heading from "~/components/ui/heading";
import Fancy from "~/components/ui/typography/fancy";

const project = {
  title: "Personal Portfolio Website",
  description:
    " A modern portfolio site to showcase my skills, experience, and projects. It includes a fully integrated blog where I write about web development and tech topics.",
  features: [
    "Admin dashboard for managing content",
    "Role-based access with authentication",
    "Responsive design with theme toggle",
    "Integrated blog with rich text editor",
  ],
  stack: ["React", "Shadcn", "Tailwind", "Node", "Express"],
};
const Projects = () => {
  return (
    <div className="py-30 ralative">
      <GlowEffect />
      {/* PROJECTS SECTION */}
      <section className="m-auto space-y-20 p-6">
        <Heading description="What I've being working on">
          Latest <Fancy>Projects</Fancy>
        </Heading>
        <div>
          <ProjectCard {...project} />
        </div>
      </section>
    </div>
  );
};

export default Projects;
