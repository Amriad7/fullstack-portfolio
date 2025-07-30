import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

const ThemeToggler = () => {
  const { toggleTheme } = useTheme();
  return (
    <Button size="icon" variant="outline" onClick={toggleTheme}>
      <Moon className="fill-foreground hidden dark:inline" />
      <Sun className="fill-foreground inline dark:hidden " />
    </Button>
  );
};
export default ThemeToggler;
