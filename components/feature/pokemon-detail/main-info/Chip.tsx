import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Chip = ({ children }: Props) => {
  return (
    <h3 className="relative mt-auto box-border inline-flex h-7 max-w-fit items-center justify-between whitespace-nowrap rounded-full bg-gray-700 px-1 text-sm text-white">
      <span className="flex-1 px-2 font-bold text-inherit">{children}</span>
    </h3>
  );
};
