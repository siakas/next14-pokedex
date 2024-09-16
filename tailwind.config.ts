import { fontFamily } from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-normal',
    'bg-fighting',
    'bg-flying',
    'bg-poison',
    'bg-ground',
    'bg-rock',
    'bg-bug',
    'bg-ghost',
    'bg-steel',
    'bg-fire',
    'bg-water',
    'bg-grass',
    'bg-electric',
    'bg-psychic',
    'bg-ice',
    'bg-dragon',
    'bg-dark',
    'bg-fairy',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: [
          'var(--font-inter)',
          'var(--font-noto-sans-jp)',
          ...fontFamily.sans,
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        black: {
          900: '#202020',
          925: '#18181b',
          950: '#02010a',
        },
        bug: '#9fa525',
        dark: '#4f4648',
        dragon: '#5462d5',
        electric: '#f8d030',
        fairy: '#ffb1ff',
        fighting: '#ffa202',
        fire: '#fe612d',
        flying: '#96c9ff',
        ghost: '#6e4570',
        grass: '#42bf25',
        ground: '#ab793b',
        ice: '#43d8ff',
        normal: '#999',
        poison: '#984ecf',
        psychic: '#ff6380',
        rock: '#bcb889',
        steel: '#6baed3',
        water: '#2a91ff',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
}
export default config
