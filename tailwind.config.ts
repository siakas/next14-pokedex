import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [nextui()],
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
    borderColor: {
      black: {
        900: '#202020',
        950: '#02010a',
      },
    },
    extend: {
      backgroundColor: {
        black: {
          900: '#202020',
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
}
export default config
