import PokemonList from '@/components/elements/pokemon-list/PokemonList'

const PageDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const pageId: number = Number(id)

  // offset の値をページ番号から取得
  const offset: number = (pageId - 1) * 30

  return <PokemonList offset={offset} />
}

export default PageDetail
