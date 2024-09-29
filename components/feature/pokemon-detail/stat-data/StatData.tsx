import { DataCard } from "@/components/feature/pokemon-detail/DataCard";
import { Heading } from "@/components/feature/pokemon-detail/Heading";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import { statsMapping } from "@/utils/translator";
import { clamp } from "lodash-es";

export const StatData = () => {
  const { pokemon } = usePokemonDetailStore((state) => ({
    pokemon: state.pokemon,
  }));

  /** ステータス値ごとにプログレスバーのスタイルを変更 */
  const statRanker = (stat: number): string => {
    const rank = clamp(Math.ceil(stat / 30), 1, 6);
    return `stat-rank-${rank}`;
  };

  if (!pokemon) return null;

  return (
    <div className="w-full sm:w-full lg:w-4/6">
      <Heading>
        種族値（
        {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}）
      </Heading>
      <DataCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">ステータス</TableHead>
              <TableHead className="w-16">値</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pokemon.stats.map((stat) => (
              <TableRow key={stat.stat.url}>
                <TableCell>{statsMapping[stat.stat.name]}</TableCell>
                <TableCell className="text-right">{stat.base_stat}</TableCell>
                <TableCell>
                  <Progress
                    aria-label={stat.stat.name}
                    value={stat.base_stat}
                    indicatorClassName={statRanker(stat.base_stat)}
                    max={200}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataCard>
    </div>
  );
};
