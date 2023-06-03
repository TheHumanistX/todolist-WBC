import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#28333E' : '#52A7CC',
    },
    backgroundColor: {
      default: mode === 'dark' ? '#1C2025' : '#52A7CC',
    },
    textColor: {
      primary: mode === 'dark' ? '#E7EBEE' : '#000000',
      completed: mode === 'dark' ? 'rgba(169,169,169, 0.5)' : 'rgba(169,169,169, 0.5)',
    },
    buttonColor: {
      main: mode === 'dark' ? '#EFC9A4' : '#A5D4DC',
    },
    cardBackgroundColor: {
      main: mode === 'dark' ? '#39434B' : '#F2F4F8',
      alternate1: mode === 'dark' ? '#28333E' : '#D9D9D9',
      alternate2: mode === 'dark' ? '#525A60' : '#F2F4F8',
    },
    cardBorderColor: {
      main: mode === 'dark' ? '#28333E' : '#D9D9D9',
      alternate: mode === 'dark' ? '#525A60' : '#D9D9D9',
    },
    progressBar: {
      empty: mode === 'dark' ? '#E7EBEE' : '#F2F4F8',
      fill: mode === 'dark' ? '#EFC9A4' : '#52A7CC',
      stroke: mode === 'dark' ? '#39434B' : '#D9D9D9',
    },
    hrTextArea: {
      main: mode === 'dark' ? '#28333E' : '#52A7CC',
  }},
  typography: {
    fontFamily: '"Nunito", sans-serif',
  },
});

const theme = (mode) => createTheme(getDesignTokens(mode));

export default theme;