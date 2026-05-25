/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF7F0',
          100: '#F5EFE6',   /* основной — точно из референса */
          200: '#EFE7D9',
          300: '#E8DCC4',
        },
        gold: {
          300: '#D4B87A',
          400: '#C9A56B',
          500: '#B89058',
          600: '#9A7641',
          700: '#7D5E32',
        },
        ink: {
          900: '#2A2520',   /* тёмный шрифт — тёплый чёрный */
          700: '#4A4138',
          500: '#7A6F62',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(184, 134, 11, 0.15)',
        'gold-lg': '0 8px 40px rgba(184, 134, 11, 0.25)',
        'card': '0 2px 40px rgba(0,0,0,0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}


