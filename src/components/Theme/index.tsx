import {
  createTheme,
  createText,
  createBox,
  BaseTheme,
} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme: BaseTheme = createTheme({
  colors: {
    primaryLight: '#faf6d7',
    primary: '#dec81b',
    secondary: '#312e38',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      color: 'white',
      textAlign: 'center',
    },
    title: {
      fontSize: 28,
    },
  },
  breakpoints: {},
});

export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export type Theme = typeof theme;

export default theme;
