'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const PageBack = () => {
  const router = useRouter()

  return (
    <div className="mt-10 flex justify-center">
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
