import { cn } from "~/lib/utils";

/* .primary-gradient, .braces::after {
  @apply bg-gradient-to-b from-cyan-400 to-indigo-800;
} */

const Fancy = ({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-b from-cyan-400 to-indigo-800 bg-clip-text text-transparent",
        className
      )}
      style={{ WebkitBackgroundClip: "text" }}
      {...props}
    >
      {children}
    </span>
  );
};
export default Fancy;
