import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1633',
        coal: '#0f1d40',
        graphite: '#14244f',
        steel: '#1b2d5f',
        line: 'rgba(255,255,255,0.09)',
        paper: '#eef2f8',
        paper2: '#e1e8f2',
        bone: '#eef2f8',
        mute: '#a3afc9',
        silver: '#c9d6ec',
        brand: '#349ad6',
        brandDeep: '#14224a',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: { wide2: '0.22em' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};

export default config;
