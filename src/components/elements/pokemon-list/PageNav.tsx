import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Button, Link } from '@nextui-org/react'
import clsx from 'clsx'

interface Props {
  page: number
}

const PageNav = ({ page }: Props) => {
  return (
    <div className="mt-6 flex justify-between">
      <Button
        as={Link}
        className={clsx(
          page === 1 && 'pointer-events-none invisible opacity-0',
        )}
        color="primary"
        href={`/page/${page - 1}`}
        size="lg"
        startContent={<ChevronLeftIcon height={24} width={24} />}
      >
        前の30件
      </Button>
      <Button
        as={Link}
        color="primary"
        endContent={<ChevronRightIcon height={24} width={24} />}
        href={`/page/${page + 1}`}
        size="lg"
      >
        次の30件
      </Button>
    </div>
  )
}

export default PageNav
