import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetPokemonList } from '@/hooks/useGetPokemonList'

export const PageNavigation = () => {
  const { handlePrevButton, handleNextButton, offset } = useGetPokemonList()

  return (
    <div className="my-6 flex justify-between">
      <Button
        onClick={handlePrevButton}
        className="bg-blue-500 pr-6 hover:bg-blue-700"
        disabled={offset === 0}
      >
        <ChevronLeft className="mr-2 size-5" />
        前の30件
      </Button>
      <Button
        onClick={handleNextButton}
        className="bg-blue-500 pl-6 hover:bg-blue-700"
      >
        次の30件
        <ChevronRight className="ml-2 size-5" />
      </Button>
    </div>
  )
}
