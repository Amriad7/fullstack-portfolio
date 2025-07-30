import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { H3, H4, List, P } from "./ui/typography";

type ProjectCardProps = React.ComponentProps<"div"> & {
  title: string;
  description: string;
  features: string[];
  stack: string[];
};

const ProjectCard = ({
  title,
  description,
  features,
  stack,
}: ProjectCardProps) => {
  return (
    <div className="border flex m-auto items-center flex-col lg:items-start lg:flex-row max-w-4xl gap-4 p-4 rounded-2xl bg-card">
      <div className="bg-accent size-full max-w-xs aspect-square rounded-xl"></div>
      <div className="p-2">
        <H3 className="uppercase">{title}</H3>
        <P className="text-muted-foreground mb-6">{description}</P>
        <H4>Key Features</H4>
        <List className="text-muted-foreground mb-12">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </List>
        <H4>Tech Stack</H4>
        <div className="space-x-2 space-y-2 mt-3">
          {stack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="space-x-4 mt-12">
          <Button>Live Demo</Button>
          <Button variant="outline">Project Page</Button>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
