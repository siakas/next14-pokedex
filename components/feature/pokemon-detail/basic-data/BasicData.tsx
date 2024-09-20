import { DataCard } from "@/components/feature/pokemon-detail/DataCard";
import { Heading } from "@/components/feature/pokemon-detail/Heading";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetAbilities } from "@/hooks/useGetAbilities";
import type { Pokemon, Species } from "@/types";
import { growthRateMapping, statsMapping } from "@/utils/translator";

type Props = {
  pokemon: Pokemon;
  species: Species;
};

export const BasicData = ({ pokemon, species }: Props) => {
  const { data, isLoading } = useGetAbilities(pokemon.abilities);

  // 倒したときに得られる努力値を取得
  const effortYield = pokemon.stats.find((stat) => stat.effort !== 0);

  return (
    <div className="w-full lg:w-4/6">
      <Heading>基礎データ</Heading>
      <DataCard>
        {isLoading ? (
          <Skeleton className="h-56 w-full bg-gray-900" />
        ) : (
          <Table className="leading-6">
            <TableBody>
              <TableRow>
                <TableCell className="w-36 font-bold">特性：</TableCell>
                <TableCell>
                  <ul className="flex flex-col">
                    {data?.map((ability, index) => (
                      <li key={index}>
                        {ability.jaName}
                        {ability.is_hidden && <>（夢）</>}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">基礎経験値：</TableCell>
                <TableCell>{pokemon.base_experience}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">初期なかよし度：</TableCell>
                <TableCell>{species.base_happiness}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">経験値タイプ：</TableCell>
                <TableCell>
                  {growthRateMapping[species.growth_rate.name]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">取得努力値：</TableCell>
                <TableCell>
                  {effortYield && (
                    <>
                      {statsMapping[effortYield.stat.name]}＋
                      {effortYield.effort}
                    </>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </DataCard>
    </div>
  );
};
