import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import theme from "./theme/theme";
import { Grid, Box, Stack } from "@mui/material";
import { Lists, Tasks, HeaderBar, WalletConnect, TaskDetails } from "./components";
import { TodoProvider } from "./context/TodoContext";

function App() {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <TodoProvider>
      <ThirdwebProvider>
        <ThemeProvider theme={theme(mode)}>
          <Box bgcolor={theme(mode).palette.backgroundColor.default} style={{ padding: "23px 34px", height: "100vh", boxSizing: 'border-box'}}>
            <Grid container gap='3vw' justifyContent='center' style={{ height: "100%", maxHeight: "100%" }}>
              <Grid item container xs={3}>
                <Lists toggleColorMode={toggleColorMode} themeMode={theme(mode)} />
              </Grid>
              <Grid item container xs={8}>
                <Stack width='100%' spacing={2}>
                  <Box display='flex' gap='3vw'>
                    <HeaderBar />
                    <WalletConnect theme={theme(mode)} />
                  </Box>
                  <Box display='flex' gap='3vw' height='100%' style={{ maxHeight: "100%" }}>
                    <Tasks theme={theme(mode)} />
                    <TaskDetails />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </ThirdwebProvider>
    </TodoProvider>
  );
}

export default App;