import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Heading = ({ children, className }: Props) => {
  return (
    <h2 className={cn("mb-2 pl-2 text-left text-2xl font-bold", className)}>
      {children}
    </h2>
  );
};
