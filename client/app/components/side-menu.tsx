import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Logo from "./logo";
import Fancy from "./ui/typography/fancy";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { H4 } from "./ui/typography";
import NavMenu from "./nav-menu";
import { useRef } from "react";

const SideMenu = () => {
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Sheet>
      <Button
        ref={closeRef}
        size="icon"
        variant="outline"
        className="lg:hidden"
        asChild
      >
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
      </Button>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <Logo />

            <Fancy className="text-xl font-extrabold">Amriad</Fancy>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navigation Menu
          </SheetDescription>
        </SheetHeader>{" "}
        <NavMenu
          orientation="vertical"
          onItemClick={() => closeRef.current?.click()}
        />
      </SheetContent>
    </Sheet>
  );
};
export default SideMenu;
