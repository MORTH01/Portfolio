import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#FF5722',
          'orange-light': '#FF6B3D',
          'orange-dark': '#E64A19',
        },
        dark: {
          bg: '#000000',
          card: '#1A1A1A',
          'card-light': '#2A2A2A',
          text: '#CCCCCC',
        },
        // Editorial palette for the /covault launch page (warm textured canvas, white cards, obsidian ink).
        vault: {
          canvas: '#FAF9F6',
          card: '#FFFFFF',
          ink: '#0D0D0D',
          dark: '#111111',
          accent: '#FF6B00',
          line: 'rgba(13,13,13,0.08)',
          'line-dark': 'rgba(247,247,245,0.16)',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.03)',
      },
      transitionTimingFunction: {
        kinetic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)'],
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
};
export default config;

