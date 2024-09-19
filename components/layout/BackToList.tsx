import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const BackToList = () => {
  return (
    <Button
      asChild
      className="bg-blue-500 text-white hover:bg-blue-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
    >
      <Link href="/">一覧へ戻る</Link>
    </Button>
  )
}
