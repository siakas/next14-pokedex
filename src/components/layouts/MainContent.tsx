import { ReactNode } from 'react'

const MainContent = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative z-10 m-auto mb-16 max-w-7xl px-8 py-5 text-white sm:px-16 sm:py-10">
      {children}
    </main>
  )
}

export default MainContent
