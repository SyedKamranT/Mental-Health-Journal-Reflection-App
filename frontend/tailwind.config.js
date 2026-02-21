/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          pure: '#000000',
          card: '#1a1a2e',
          surface: '#16213e',
          border: '#1e2a3a',
          hover: '#1f2937',
        },
        calm: {
          blue: '#B6CAEB',
          'blue-deep': '#8AA2C8',
          'blue-muted': '#6b8bb5',
        },
        accent: {
          pink: '#F5B8DA',
          'pink-deep': '#E09CC3',
          yellow: '#F7D768',
          'yellow-deep': '#E8C84D',
          olive: '#9AAB63',
          'olive-deep': '#808E53',
        },
        text: {
          primary: '#E8E8F0',
          secondary: '#9CA3AF',
          muted: '#6B7280',
          accent: '#B6CAEB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow-blue': '0 0 40px rgba(182, 202, 235, 0.1)',
        'glow-pink': '0 0 40px rgba(245, 184, 218, 0.1)',
        'inner-soft': 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
