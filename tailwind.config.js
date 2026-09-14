/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm paper ground, ink text, one accent. Nothing else.
        // Ratios below are measured against canvas #F7F5F0.
        canvas: {
          DEFAULT: '#F7F5F0',
          raised: '#EFECE4',
        },
        ink: {
          DEFAULT: '#191813',  // 16.4:1 — headlines, primary text
          soft: '#55524A',     //  7.2:1 — body prose
          muted: '#6E6A61',    //  5.0:1 — mono labels, captions
        },
        accent: {
          DEFAULT: '#A84A26',  //  5.3:1 — burnt sienna, used sparingly
        },
      },
      fontFamily: {
        // Three families, three distinct jobs. No overlap.
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial display scale — tight leading, negative tracking
        'display-sm': ['clamp(2.5rem, 7vw, 4rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display': ['clamp(3.25rem, 10vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        label: '0.16em',
      },
      maxWidth: {
        shell: '76rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
