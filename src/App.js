import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { TestComponent } from './components';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <TestComponent />
    </div>
    </ThemeProvider>
  );
}

export default App;
