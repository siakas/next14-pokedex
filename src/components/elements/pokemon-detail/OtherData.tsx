'use client'

import Heading from '@/components/elements/pokemon-detail/Heading'
import { Species } from '@/types'
import {
  Image,
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

const OtherData = ({ species }: Props) => {
  return (
    <div className="rounded-lg dark:bg-transparent">
      <Heading>その他</Heading>
      <Table aria-label="その他" hideHeader isStriped>
        <TableHeader>
          <TableColumn>名前</TableColumn>
          <TableColumn>役割</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="font-semibold">各言語の名称</TableCell>
            <TableCell>
              <ul className="flex flex-col gap-y-1">
                <li className="flex items-center gap-x-1">
                  <Image
                    alt=""
                    src="https://img.icons8.com/?size=256&id=aRiu1GGi6Aoe&format=png"
                    width={20}
                  />{' '}
                  {species.names[8].name}
                </li>
                <li className="flex items-center gap-x-1">
                  <Image
                    alt=""
                    src="https://img.icons8.com/?size=256&id=hTMPE6ntTofO&format=png"
                    width={20}
                  />{' '}
                  {species.names[5].name}
                </li>
                <li className="flex items-center gap-x-1">
                  <Image
                    alt=""
                    src="https://img.icons8.com/?size=256&id=3muzEmi4dpD5&format=png"
                    width={20}
                  />{' '}
                  {species.names[4].name}
                </li>
                <li className="flex items-center gap-x-1">
                  <Image
                    alt=""
                    src="https://img.icons8.com/?size=256&id=-_RS8ho736Fs&format=png"
                    width={20}
                  />{' '}
                  {species.names[2].name}
                </li>
                {/*
                <li className="flex items-center gap-x-1">
                  <Image
                    alt=""
                    src="https://img.icons8.com/?size=256&id=Ej50Oe3crXwF&format=png"
                    width={20}
                  />{' '}
                  {species.names[10].name}
                </li>
                */}
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default OtherData
