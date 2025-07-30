import { P } from "./ui/typography";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-3 border-t">
      <P className="italic">
        (c) 2025 Amriad.
        <span className="text-muted-foreground"> All rights reserved.</span>
      </P>
    </footer>
  );
};
export default Footer;
