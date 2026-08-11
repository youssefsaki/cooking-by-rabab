import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium hospitality palette
        ink: '#171412',
        muted: '#6B645C',
        paper: '#F7F4F0',
        surface: '#FFFFFF',
        line: '#E8E2DA',
        // Primary #ed843e
        clay: {
          DEFAULT: '#ed843e',
          soft: '#f19f68',
          deep: '#ab5f2d',
        },
        sand: '#e8c4a0',

        'dark-blue': '#084869',
        
        primary: '#ed843e',
        secondary: '#f19f68',
        accent: '#ab5f2d',
        white: '#FFF',
        
        'primary-dark': '#ab5f2d',
        'primary-light': '#f19f68',
        'primary-pale': '#fdf0e8',
        
        'warm-gray': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        
        cream: '#F7F4F0',
        'warm-white': '#fefefe',
        'soft-beige': '#F7F4F0',
        'cozy-gray': '#f8f9fa',
        
        'text-primary': '#171412',
        'text-secondary': '#6B645C',
        'text-muted': '#6B645C',
        
        orange: {
          400: '#f19f68',
          500: '#ed843e',
          600: '#d17437',
        },
        
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        }
      },
    fontFamily: {
      sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      display: ['var(--font-newsreader)', 'Georgia', 'serif'],
    },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-tablet': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'subheading': ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
        'subheading-mobile': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
