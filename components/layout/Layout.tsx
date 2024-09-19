import { Inter, Noto_Sans_JP } from 'next/font/google'
import { PageBackground } from '@/components/layout/PageBackground'
import { cn } from '@/lib/utils'

const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fontNotoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div
      className={cn(
        fontInter.variable,
        fontNotoSansJp.variable,
        'antialiased font-body',
      )}
    >
      <PageBackground />
      <main className="relative z-10 m-auto mb-16 max-w-7xl px-8 py-5 sm:px-16 sm:py-10">
        {children}
      </main>
    </div>
  )
}

export default Layout
