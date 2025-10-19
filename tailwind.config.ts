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
        // Custom Colors
        'dark-blue': '#084869',
        
        // Golden Yellow Palette
        primary: '#ffc414',      // Golden Yellow Primary
        secondary: '#ffd633',    // Light Golden Yellow
        accent: '#e6b000',       // Darker Golden Yellow
        white: '#FFF',
        
        // Golden Color Variations
        'primary-dark': '#e6b000',  // Darker Golden Yellow
        'primary-light': '#ffd633', // Light Golden Yellow
        'primary-pale': '#fff4cc',  // Very Light Golden Yellow
        
        // Warm Neutral Palette
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
        
        // Cozy Background Colors
        'cream': '#fefdf8',
        'warm-white': '#fefefe',
        'soft-beige': '#f7f3f0',
        'cozy-gray': '#f8f9fa',
        
        // Text Colors
        'text-primary': '#084869',
        'text-secondary': '#084869',
        'text-muted': '#718096',
        
        // Golden colors for hover effects
        orange: {
          400: '#ffd633',
          500: '#ffc414',
          600: '#e6b000',
        },
        
        // Legacy charcoal colors for compatibility
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
      sans: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
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
