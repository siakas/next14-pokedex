'use client'

import Heading from '@/components/elements/pokemon-detail/Heading'
import { Species } from '@/types'
import { eggGroupMapping } from '@/utils/translator'
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

interface Props {
  species: Species
}

const HatchData = ({ species }: Props) => {
  return (
    <div className="rounded-lg dark:bg-transparent">
      <Heading>タマゴと性別</Heading>
      <Table aria-label="タマゴと性別" hideHeader isStriped>
        <TableHeader>
          <TableColumn>名前</TableColumn>
          <TableColumn>役割</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="font-semibold">タマゴグループ</TableCell>
            <TableCell className="text-left">
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
          <TableRow key="2">
            <TableCell className="font-semibold">孵化サイクル</TableCell>
            <TableCell>{species.hatch_counter}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="font-semibold">性別</TableCell>
            <TableCell className="flex flex-row">
              {species.gender_rate < 0 ? (
                <span>なし</span>
              ) : (
                <>
                  <span>♂ {(100 / 8) * (8 - species.gender_rate)}%</span>
                  <Divider
                    className="mx-2 h-auto bg-gray-600"
                    orientation="vertical"
                  />
                  <span>♀ {(100 / 8) * species.gender_rate}%</span>
                </>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default HatchData
