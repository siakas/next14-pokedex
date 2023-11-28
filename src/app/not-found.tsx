import PageBack from '@/components/elements/pokemon-detail/PageBack'

const RootNotFound = () => {
  return (
    <div className="flex w-full flex-col justify-center rounded-lg border border-black-900 dark:bg-black-900 sm:h-[calc(100vh-5rem)]">
      <div className="relative top-[-5rem]">
        <p className="mb-8 text-center text-9xl font-extrabold tracking-widest text-white">
          404
        </p>
        <p className="text-center text-4xl font-bold">
          お探しのページはありません
        </p>
        <PageBack className="mt-20" />
      </div>
    </div>
  )
}

export default RootNotFound
