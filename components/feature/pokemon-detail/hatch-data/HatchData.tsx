import { DataCard } from '@/components/feature/pokemon-detail/DataCard'
import { Heading } from '@/components/feature/pokemon-detail/Heading'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import type { Species } from '@/types'
import { eggGroupMapping } from '@/utils/translator'

type Props = {
  species: Species
}

export const HatchData = ({ species }: Props) => {
  return (
    <div className="w-full lg:w-4/6">
      <Heading>タマゴと性別</Heading>
      <DataCard>
        <Table className="leading-6">
          <TableBody>
            <TableRow>
              <TableCell className="w-36 font-bold">タマゴグループ：</TableCell>
              <TableCell>
                <ul className="flex">
                  {species.egg_groups.map((group, index) => (
                    <li
                      className="[&:not(:first-child)]:before:mx-2 [&:not(:first-child)]:before:content-['/']"
                      key={index}
                    >
                      {eggGroupMapping[group.name]}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">孵化サイクル：</TableCell>
              <TableCell>{species.hatch_counter}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">性別：</TableCell>
              <TableCell>
                {species.gender_rate < 0 ? (
                  <span>なし</span>
                ) : (
                  <>
                    <span>♂ {(100 / 8) * (8 - species.gender_rate)}%</span>
                    <span className="ml-5">
                      ♀ {(100 / 8) * species.gender_rate}%
                    </span>
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DataCard>
    </div>
  )
}
