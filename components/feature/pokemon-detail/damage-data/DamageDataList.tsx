import clsx from 'clsx'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { typesMapping } from '@/utils/translator'
import type { MultipliersObject } from '@/utils/weaknesses'

type Props = {
  weaknesses: MultipliersObject
}

export const DamageDataList = ({ weaknesses }: Props) => {
  const renderRow = (multiplier: number) => (
    <TableRow className="even:bg-black-900">
      <TableCell className="w-20 font-bold">{`${multiplier}x`}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {Object.entries(weaknesses).map(
            ([key, value]) =>
              value === multiplier && (
                <span
                  key={key}
                  className={clsx(
                    'text-shadow block w-[4.8rem] rounded py-1 text-center text-xs font-bold leading-normal text-white',
                    `bg-${key}`,
                  )}
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
    <Table>
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
