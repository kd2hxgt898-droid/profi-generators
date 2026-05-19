import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gold: {
          50: '#FBF6E9',
          100: '#F2E4B6',
          200: '#E9D08A',
          300: '#DFBC60',
          400: '#D4A24C',
          500: '#B8862F',
          600: '#8E661F',
          700: '#634814',
          800: '#3F2E0C',
          900: '#221806',
        },
        navy: {
          50: '#E6E9F0',
          100: '#B7BFD2',
          200: '#8995B5',
          300: '#5C6B97',
          400: '#3D4F7E',
          500: '#23365E',
          600: '#152444',
          700: '#0F1A33',
          800: '#0A1224',
          900: '#070C18',
          950: '#04060F',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hero: ['Literata', 'Georgia', 'ui-serif', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,162,76,0.55)' },
          '50%': { boxShadow: '0 0 0 18px rgba(212,162,76,0)' },
        },
        'flow-current': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-120' },
        },
        'glow-windows': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        'hero-gen-start': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(-2px, 1px) rotate(-0.35deg)' },
          '50%': { transform: 'translate(2px, -1px) rotate(0.25deg)' },
          '75%': { transform: 'translate(-1px, 1px) rotate(-0.15deg)' },
        },
        'blackout-ring': {
          '0%': { transform: 'scale(0.92)', opacity: '0.65' },
          '100%': { transform: 'scale(1.45)', opacity: '0' },
        },
        'gen-steam': {
          '0%, 100%': { opacity: '0.35', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.55', transform: 'translateY(-6px) scale(1.05)' },
        },
        'gen-shake': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-1.5px, 1px)' },
          '40%': { transform: 'translate(1.5px, -1px)' },
          '60%': { transform: 'translate(-1px, -0.5px)' },
          '80%': { transform: 'translate(1px, 0.5px)' },
        },
        'moon-shimmer': {
          '0%, 100%': { opacity: '0.14', transform: 'translate(-1.5%, -1%) scale(1)' },
          '50%': { opacity: '0.26', transform: 'translate(1.5%, 0.5%) scale(1.02)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out both',
        'pulse-gold': 'pulse-gold 2.4s ease-out infinite',
        'flow-current': 'flow-current 2s linear infinite',
        'glow-windows': 'glow-windows 4s ease-in-out infinite',
        'hero-gen-start': 'hero-gen-start 0.45s ease-in-out infinite',
        'blackout-ring': 'blackout-ring 2.1s cubic-bezier(0.4,0,0.2,1) infinite',
        'gen-steam': 'gen-steam 2.8s ease-in-out infinite',
        'gen-shake': 'gen-shake 0.35s ease-in-out infinite',
        'moon-shimmer': 'moon-shimmer 8s ease-in-out infinite',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg,#F2C674 0%,#D4A24C 50%,#8E661F 100%)',
        'navy-gradient': 'linear-gradient(180deg,#070C18 0%,#0A1224 60%,#0F1A33 100%)',
        'glass-light':
          'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        gold: '0 18px 40px -18px rgba(212,162,76,0.55)',
        'gold-lg': '0 30px 80px -20px rgba(212,162,76,0.45)',
        glass: '0 10px 40px -16px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [animate],
};

export default config;
