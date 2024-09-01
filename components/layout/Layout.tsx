import { Inter, Noto_Sans_JP } from 'next/font/google'
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
      {children}
    </div>
  )
}

export default Layout
