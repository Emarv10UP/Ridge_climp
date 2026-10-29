/** @type {import('tailwindcss').Config} */
// RidgeClimb Adventures — design tokens
// Palette derived from the brand mark: alpine navy + glacier ice-blue,
// warmed with a stone neutral and a single rust accent for EXPERT/emphasis.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2545', // deep alpine navy — primary dark, footer, text-on-light headlines
          800: '#0F3D6B',
          700: '#14467A',
        },
        ridge: {
          DEFAULT: '#1A5C9E', // mid-blue — secondary actions, links
          light: '#2E7BC4',
        },
        glacier: {
          DEFAULT: '#7FB8C9', // ice-blue from the logo's mountain face — signature accent
          light: '#B8DCE3',
          dark: '#4E8FA3',
        },
        stone: {
          DEFAULT: '#E8E2D6', // warm neutral background, replaces sterile gray-blue
          50: '#F5F2EA',
          100: '#EDE7D9',
        },
        rust: '#C9472B', // single warm accent — EXPERT badge, rare emphasis only
        success: '#3D8B5F',
        warning: '#C97F2B',
        danger: '#C9472B',
        ink: {
          DEFAULT: '#16213A',
          secondary: '#5B6478',
        },
        border: '#DDD6C7',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', '"Archivo Black"', 'sans-serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero: 'clamp(2.25rem, 4.2vw, 4.25rem)',
      },
      borderRadius: {
        card: '0.5rem',
      },
      backgroundImage: {
        contour: "url('/images/contour-pattern.svg')",
      },
    },
  },
  plugins: [],
};
