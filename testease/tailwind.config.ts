import type { Config } from 'tailwindcss';

<<<<<<< HEAD
const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      // center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    screens: {
      mobile: '480px',
      tablet: '744px',
      miniLaptop: '1280px',
      laptop: '1440px',
      desktop: '1728px'
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
=======
export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px'
        }
      },
      screens: {
        sm: '480px',
        md: '744px',
        lg: '1280px',
        xl: '1440px',
        '2xl': '1728px'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
>>>>>>> f80d6be2701fdbb072e657b9c07cf2e74140032a
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
<<<<<<< HEAD
          ring: 'hsl(var(--sidebar-ring))'
=======
          ring: 'hsl(var(--sidebar-ring))',
          active: 'hsl(var(--sidebar-button-active-foreground))'
        },
        status: {
          generating: 'hsl(var(--status-generating))',
          done: 'hsl(var(--status-done))',
          seen: 'hsl(var(--status-seen))',
          error: 'hsl(var(--status-error))'
>>>>>>> f80d6be2701fdbb072e657b9c07cf2e74140032a
        }
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
<<<<<<< HEAD
      }
    },
    darkMode: ['class'],
    safelist: ['dark'],
    plugins: [require('tailwindcss-animate')]
  }
};
=======
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
>>>>>>> f80d6be2701fdbb072e657b9c07cf2e74140032a

  safelist: ['dark'],
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')]
} satisfies Config;
