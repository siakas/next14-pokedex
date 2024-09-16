import { clamp } from 'lodash-es'
import { DataCard } from '@/components/feature/pokemon-detail/DataCard'
import { Heading } from '@/components/feature/pokemon-detail/Heading'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Pokemon } from '@/types'
import { statsMapping } from '@/utils/translator'

type Props = {
  pokemon: Pokemon
}

export const StatData = ({ pokemon }: Props) => {
  /** ステータス値ごとにプログレスバーのスタイルを変更 */
  const statRanker = (stat: number): string => {
    const rank = clamp(Math.ceil(stat / 30), 1, 6)
    return `stat-rank-${rank}`
  }

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
            {pokemon.stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell className="py-3">
                  {statsMapping[stat.stat.name]}
                </TableCell>
                <TableCell className="py-3 text-right">
                  {stat.base_stat}
                </TableCell>
                <TableCell className="py-3">
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
  )
}
