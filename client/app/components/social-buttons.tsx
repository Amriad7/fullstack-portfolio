import { Link } from "react-router";
import { Facebook, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

const socialLinks = [
  {
    platform: "github",
    link: "https://github.com/Amriad7",
    icon: <Github className="fill-foreground stroke-0" />,
  },
  {
    platform: "facebook",
    link: "#",
    icon: <Facebook className="fill-foreground stroke-0" />,
  },
  {
    platform: "linked-in",
    link: "#",
    icon: <Linkedin className="fill-foreground stroke-0" />,
  },
];

const SocialButtons = () => {
  return (
    <div className="inline space-x-2">
      {socialLinks.map(({ platform, link, icon }) => (
        <Link to={link} key={platform}>
          <Button variant="outline" size="icon" className="rounded-full">
            {icon}
          </Button>
        </Link>
      ))}
    </div>
  );
};
export default SocialButtons;
