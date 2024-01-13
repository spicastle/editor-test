import type { Config } from 'tailwindcss'

const unit = {};
const htmlFontSize = 16;
for ( let count = 0; count <= 3000; count++ ) {
  unit[ count ] = ( count / htmlFontSize ) + "rem";
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  presets: [
    {
      theme: {
        spacing     : unit,
        fontSize    : unit,
        borderRadius: unit,
        extend      : {
          lineHeight: unit,
        },
      },
    },
  ],
  plugins: [],
}
export default config
