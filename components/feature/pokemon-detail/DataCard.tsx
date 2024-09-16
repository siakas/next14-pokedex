import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const DataCard = ({ children }: Props) => {
  return (
    <div className="shadow-small relative z-0 flex w-full flex-col justify-between gap-4 overflow-auto rounded-xl p-4 dark:bg-black-925">
      {children}
    </div>
  )
}
