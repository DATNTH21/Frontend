import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    },
    screens: {
      mobile: '480px',
      tablet: '744px',
      miniLaptop: '1280px',
      laptop: '1440px',
      desktop: '1728px'
    }
  },
  plugins: []
};
export default config;
