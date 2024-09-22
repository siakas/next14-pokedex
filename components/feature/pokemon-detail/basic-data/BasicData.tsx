import { DataCard } from "@/components/feature/pokemon-detail/DataCard";
import { Heading } from "@/components/feature/pokemon-detail/Heading";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import { growthRateMapping, statsMapping } from "@/utils/translator";

export const BasicData = () => {
  const { pokemon, species, abilities } = usePokemonDetailStore((state) => ({
    pokemon: state.pokemon,
    species: state.species,
    abilities: state.abilities,
  }));

  // 倒したときに得られる努力値を取得
  const effortYield = pokemon?.stats.find((stat) => stat.effort !== 0);

  if (!pokemon || !species || !abilities) return null;

  return (
    <div className="w-full lg:w-4/6">
      <Heading>基礎データ</Heading>
      <DataCard>
        <Table className="leading-6">
          <TableBody>
            <TableRow>
              <TableCell className="w-36 font-bold">特性：</TableCell>
              <TableCell>
                <ul className="flex flex-col">
                  {abilities.map((ability, index) => (
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
                    {statsMapping[effortYield.stat.name]}＋{effortYield.effort}
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DataCard>
    </div>
  );
};
