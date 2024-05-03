const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@medusajs/ui-preset')],
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      transitionProperty: {
        width: 'width margin',
        height: 'height',
        bg: 'background-color',
        display: 'display opacity',
        visibility: 'visibility',
        padding: 'padding-top padding-right padding-bottom padding-left',
      },
      fontFamily: {
        raleway: ['var(--font-raleway)', ...defaultTheme.fontFamily.serif],
        roboto: ['var(--font-roboto)', ...defaultTheme.fontFamily.serif],
        gotag: ['var(--font-gotag)', ...defaultTheme.fontFamily.sans],
        poppins: ['var(--font-poppins)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        border: 'var(--border)',
        input: {
          DEFAULT: 'var(--input)',
          placeholder: 'var(--input-placeholder)',
          foreground: 'var(--input-foreground)',
        },
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        neutral: {
          DEFAULT: 'var(--neutral)',
          foreground: 'var(--neutral-foreground)',
        },
        price: {
          DEFAULT: 'var(--price-default)',
          sale: 'var(--price-sale)',
        },
        status: {
          success: 'var(--success-status)',
          warning: 'var(--warning-status)',
          error: 'var(--error-status)',
          info: 'var(--info-status)',
          pending: 'var(--pending-status)',
        },
      },
      borderRadius: {
        none: '0px',
        soft: '2px',
        base: '4px',
        rounded: '8px',
        large: '16px',
        circle: '9999px',
      },
      maxWidth: {
        '8xl': '100rem',
      },
      fontSize: {
        '3xl': '2rem',
      },
      flex: {
        'carousel-full': 'var(--flex-carousel-full)',
        'carousel-half': 'var(--flex-carousel-half)',
        'carousel-sm': 'var(--flex-carousel-sm)',
        'carousel-lg': 'var(--flex-carousel-lg)',
        'carousel-xl': 'var(--flex-carousel-xl)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-radix')(),
    require('daisyui'),
    require('tailwindcss-animate'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.backface-visible': {
          'backface-visibility': 'visible',
          '-moz-backface-visibility': 'visible',
          '-webkit-backface-visibility': 'visible',
          '-ms-backface-visibility': 'visible',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-moz-backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
          '-ms-backface-visibility': 'hidden',
        },
      });
    }),
  ],
};
