'use client'

import Heading from '@/components/elements/pokemon-detail/Heading'
import { Pokemon } from '@/types'
import { statsMapping } from '@/utils/translator'
import {
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { clamp } from 'lodash-es'

interface Props {
  pokemon: Pokemon
}

const StatData = ({ pokemon }: Props) => {
  // ステータス値ごとにプログレスバーのスタイルを変更
  const statRanker = (stat: number): string => {
    const rank = clamp(Math.ceil(stat / 30), 1, 6)
    return `stat-rank-${rank}`
  }

  return (
    <div className="w-full sm:w-full lg:w-4/6">
      <div className="rounded-lg dark:bg-transparent">
        <Heading>
          種族値（
          {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}）
        </Heading>
        <Table className="h-full w-full">
          <TableHeader>
            <TableColumn className="w-28">ステータス</TableColumn>
            <TableColumn className="w-16">値</TableColumn>
            <TableColumn align="center">&nbsp;</TableColumn>
          </TableHeader>
          <TableBody>
            {pokemon.stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell>{statsMapping[stat.stat.name]}</TableCell>
                <TableCell className="text-right">{stat.base_stat}</TableCell>
                <TableCell>
                  <Progress
                    className="w-full"
                    classNames={{
                      indicator: statRanker(stat.base_stat),
                    }}
                    maxValue={180}
                    radius="sm"
                    size="lg"
                    value={stat.base_stat}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default StatData
