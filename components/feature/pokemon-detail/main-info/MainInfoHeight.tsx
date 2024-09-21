import { Chip } from "@/components/feature/pokemon-detail/main-info/Chip";

type Props = {
  height: number;
};

export const MainInfoHeight = ({ height }: Props) => {
  return (
    <div className="flex flex-col-reverse items-center">
      <Chip>たかさ</Chip>
      <p className="font-bold">
        {(height * 0.1).toFixed(1)} <span className="text-sm">m</span>
      </p>
    </div>
  );
};
