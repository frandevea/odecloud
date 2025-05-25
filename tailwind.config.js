/** @type {import('tailwindcss').Config} */
const { hairlineWidth } = require('nativewind/theme');

module.exports = {
  darkMode: 'class',
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        Poppins_Regular: ['Poppins-Regular'],
        Poppins_Medium: ['Poppins-Medium'],
        Poppins_SemiBold: ['Poppins-SemiBold'],
        Poppins_Bold: ['Poppins-Bold'],
        Poppins_ExtraBold: ['Poppins-ExtraBold'],
        Poppins_Black: ['Poppins-Black'],
        Poppins_ExtraLight: ['Poppins-ExtraLight'],
        Poppins_Light: ['Poppins-Light'],
        Poppins_Thin: ['Poppins-Thin'],
        Poppins_BlackItalic: ['Poppins-BlackItalic'],
        Poppins_BoldItalic: ['Poppins-BoldItalic'],
        Poppins_ExtraBoldItalic: ['Poppins-ExtraBoldItalic'],
        Poppins_ExtraLightItalic: ['Poppins-ExtraLightItalic'],
        Poppins_Italic: ['Poppins-Italic'],
        Poppins_LightItalic: ['Poppins-LightItalic'],
        Poppins_MediumItalic: ['Poppins-MediumItalic'],
        Poppins_SemiBoldItalic: ['Poppins-SemiBoldItalic'],
        Poppins_ThinItalic: ['Poppins-ThinItalic'],
        Poppins_RegularItalic: ['Poppins-RegularItalic'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
