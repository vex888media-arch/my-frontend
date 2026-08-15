/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          accent: '#D4AF37',
          glow: '#FFD700'
        },
        dark: {
          900: '#0B0C10',
          800: '#1F2833',
          card: 'rgba(20, 20, 25, 0.85)'
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'dark-gradient': 'radial-gradient(circle at top, #1a1a24 0%, #08080a 100%)'
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'card-luxury': '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(212, 175, 55, 0.3)'
      }
    },
  },
  plugins: [],
}
