import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      default: mode === 'dark' ? '#1C2025' : '#52A7CC',
    },
    text: {
      primary: mode === 'dark' ? '#FFFFFF' : '#000000',
      completed: mode === 'dark' ? 'rgba(169,169,169, 0.5)' : 'rgba(169,169,169, 0.5)',
    },
    button: {
      main: mode === 'dark' ? '#your_dark_color' : '#A5D4DC',
    },
    cardBackgroundColor: {
      main: mode === 'dark' ? '#your_dark_color' : '#F2F4F8',
      alternate: mode === 'dark' ? '#your_dark_color' : '#D9D9D9',
    },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
  },
});

const theme = (mode) => createTheme(getDesignTokens(mode));

export default theme;
// Darkmode :
// Main Background: #1C2025
// Card Backgrounds: #39434B
// Text: #E7EBEE
// Lists/Tasks Alternating Card Colors: #28333E/#525A60
// Vertical Dots Alternating Card Colors: #28333E/#525A60
// HR/Textarea Stroke: #28333E
// Progess Bar Full/Fill: #E7EBEE/#EFC9A4
// Bottom Buttons: #EFC9A4

