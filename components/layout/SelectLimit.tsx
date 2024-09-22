import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIMIT_OPTIONS } from "@/consts/limit";
import { isValidLimit } from "@/lib/utils";
import { usePokemonListStore } from "@/store/pokemonListStore";

export const SelectLimit = () => {
  const { limit, setLimit } = usePokemonListStore((state) => ({
    limit: state.limit,
    setLimit: state.actions.setLimit,
  }));

  const handleChange = (value: string) => {
    const newLimit = Number(value);
    if (isValidLimit(newLimit)) {
      setLimit(newLimit);
    }
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder={`${limit}件`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {LIMIT_OPTIONS.map((i) => (
            <SelectItem key={i} value={i.toString()} className="cursor-pointer">
              {i}件
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
