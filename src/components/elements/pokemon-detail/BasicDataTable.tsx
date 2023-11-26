'use client' // NextUI の Table コンポーネントはクライアントコンポーネントでないとエラーが出る

import { Pokemon, PokemonAbility, Species } from '@/types'
import { growthRateMapping, statsMapping } from '@/utils/translator'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

interface Props {
  abilities: PokemonAbility[]
  pokemon: Pokemon
  species: Species
}

const BasicDataTable = ({ abilities, pokemon, species }: Props) => {
  // 倒したときに得られる努力値を取得
  const effortYield = pokemon.stats.find((stat) => stat.effort !== 0)

  return (
    <Table
      aria-label="トレーニング情報"
      className="w-full text-left"
      hideHeader
      isHeaderSticky
      isStriped
    >
      <TableHeader>
        <TableColumn>データ</TableColumn>
        <TableColumn>情報</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell className="w-36 font-semibold">特性：</TableCell>
          <TableCell className="whitespace-nowrap">
            <ul className="flex flex-col gap-y-1">
              {abilities.map((ability, index) => (
                <li key={index}>
                  {ability.is_hidden ? (
                    <span>{ability.jaName}（夢）</span>
                  ) : (
                    <span>{ability.jaName}</span>
                  )}
                </li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell className="font-semibold">基礎経験値：</TableCell>
          <TableCell>{pokemon.base_experience}</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell className="font-semibold">初期なかよし度：</TableCell>
          <TableCell>{species.base_happiness}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell className="whitespace-nowrap font-semibold">
            経験値タイプ：
          </TableCell>
          <TableCell>{growthRateMapping[species.growth_rate.name]}</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell className="font-semibold">取得努力値：</TableCell>
          <TableCell>
            {effortYield && (
              <>
                {statsMapping[effortYield.stat.name]} + {effortYield.effort}
              </>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default BasicDataTable
