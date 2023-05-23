import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    backgroundColor: {
      default: '#52A7CC',
    },
    textColor: {
      primary: '#000000',
      completed: 'rgb(169,169,169, 0.5)',
    },
    buttonColor: {
      main: '#A5D4DC',
    },
    cardBackgroundColor: {
      main: '#F2F4F8',
      alternate: '#D9D9D9',
    },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
  },
});

export default theme;