import type { Config } from 'tailwindcss'

interface IPresetUnit {
  [i:string]: string
}

const presetUnit = (num:number) => {
  const unit: IPresetUnit = {};
  const defaultFontSize:number = 16;
  let i:number = 0;

  while ( i < num + 1) {
    unit[i] = ( i / defaultFontSize ) + "rem";
    i++;
  }

  return unit;
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
        spacing     : presetUnit(1000),
        fontSize    : presetUnit(200),
        borderRadius: presetUnit(2000),
        extend      : {
          lineHeight: presetUnit(2000),
        },
      },
    },
  ],
  plugins: [],
}
export default config
