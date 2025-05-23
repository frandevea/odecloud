/** @type {import('tailwindcss').Config} */
module.exports = {
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
    },
  },
  plugins: [],
};
