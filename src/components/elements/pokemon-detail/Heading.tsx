import clsx from 'clsx'
import { ReactNode } from 'react'

const Heading = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <h2
      className={clsx(
        'font-inter mb-2 pl-2 text-left text-2xl font-bold',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export default Heading
