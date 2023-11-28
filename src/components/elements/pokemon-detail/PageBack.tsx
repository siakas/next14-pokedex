'use client'

import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

const PageBack = ({ className }: { className?: string }) => {
  const router = useRouter()

  return (
    <div className={clsx('mt-10 flex justify-center', className)}>
      <Button
        color="primary"
        onClick={() => {
          router.push('/')
        }}
        size="lg"
      >
        一覧に戻る
      </Button>
    </div>
  )
}

export default PageBack
