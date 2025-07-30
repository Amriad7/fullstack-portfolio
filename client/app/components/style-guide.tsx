import React from "react";
import { H1, H3 } from "./ui/typography";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const StyleGuide = () => {
  const colors = [
    { name: "background", styles: "bg-background text-forground" },
    { name: "primary", styles: "bg-primary text-primary-foreground" },
    { name: "secondary", styles: "bg-secondary text-secondary-foreground" },
    { name: "muted", styles: "bg-muted text-muted-foreground" },
    { name: "accent", styles: "bg-accent text-accent-foreground" },
    { name: "card", styles: "bg-card text-card-foreground" },
    { name: "popover", styles: "bg-popover text-popover-foreground" },

    { name: "destructive", styles: "bg-destructive" },
  ];

  const buttons = {
    variants: [
      "default",
      "secondary",
      "outline",
      "destructive",
      "ghost",
      "link",
    ] as const,
    sizes: ["lg", "default", "sm", "icon"] as const,
  };

  const badges = ["default", "secondary", "outline", "destructive"] as const;

  return (
    <div className="p-4 space-y-12">
      <H1>Style Guide</H1>

      {/* COLORS SECTIONS */}
      <section className="space-y-8">
        <H3>Colors</H3>
        <ul className="flex flex-wrap gap-4">
          {colors.map((color) => (
            <li key={color.name}>
              <ColorCard className={color.styles}>{color.name}</ColorCard>
            </li>
          ))}
        </ul>
      </section>

      {/* BUTTONS SECTION */}
      <section className="space-y-8">
        <H3>Buttons</H3>
        <ul className="space-y-6">
          {buttons.variants.map((variant) => (
            <li key={variant} className="flex gap-4">
              {buttons.sizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {size === "icon" ? <Star /> : variant}
                </Button>
              ))}
            </li>
          ))}
        </ul>
      </section>

      {/* INPUTS SECTION */}
      <section className="space-y-8">
        <H3>Inputs</H3>
        <div className="flex flex-col gap-6">
          <Input placeholder="Text Input" />
          <Textarea placeholder="Text Area" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Dropdown" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Option 1</SelectItem>
              <SelectItem value="dark">Option 2</SelectItem>
              <SelectItem value="system">Option 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3">
            <Switch />
            <Label>Switch</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox />
            <Label>Checkbox</Label>
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <H3>Badges</H3>
        <div className="space-x-4">
          {badges.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </section>
      <section className="space-y-6">
        <H3>Cards</H3>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="space-x-4">
            <Button>Action 1</Button>
            <Button variant="outline">Action 2</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

function ColorCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex justify-center items-center rounded-md size-24",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default StyleGuide;
