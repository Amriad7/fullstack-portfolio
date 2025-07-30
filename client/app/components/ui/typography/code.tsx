import * as React from "react";
import { cn } from "~/lib/utils";

export const Code = ({
  className,
  children,
  ...props
}: React.ComponentProps<"code">) => {
  return (
    <code
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
};
