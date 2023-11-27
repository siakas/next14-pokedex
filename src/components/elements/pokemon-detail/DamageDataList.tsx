'use client'

import { MultipliersObject } from '@/utils/getWeaknesses'
import { typesMapping } from '@/utils/translator'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'

interface Props {
  weaknesses: MultipliersObject
}

const DamageDataList: React.FC<Props> = ({ weaknesses }) => {
  const renderRow = (multiplier: number) => (
    <TableRow key={multiplier}>
      <TableCell className="w-20 font-semibold">{`${multiplier}x`}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {Object.entries(weaknesses).map(
            ([key, value]) =>
              value === multiplier && (
                <span
                  className={clsx(
                    'text-shadow block w-[4.8rem] rounded py-1 text-center text-xs font-semibold leading-normal text-white',
                    `bg-${key}`,
                  )}
                  key={key}
                >
                  {typesMapping[key]}
                </span>
              ),
          )}
        </div>
      </TableCell>
    </TableRow>
  )

  return (
    <Table aria-label="弱点タイプ" hideHeader isStriped>
      <TableHeader>
        <TableColumn>弱点倍率</TableColumn>
        <TableColumn>タイプ</TableColumn>
      </TableHeader>
      <TableBody>
        {renderRow(4)}
        {renderRow(2)}
        {renderRow(0.5)}
        {renderRow(0.25)}
        {renderRow(0)}
      </TableBody>
    </Table>
  )
}

export default DamageDataList
