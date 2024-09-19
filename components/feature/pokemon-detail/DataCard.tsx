import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const DataCard = ({ children }: Props) => {
  return (
    <div className="shadow-small relative z-0 w-full overflow-auto rounded-xl px-4 py-3 dark:bg-black-925">
      {children}
    </div>
  )
}
