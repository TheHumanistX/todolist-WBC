import React, { useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import theme from './theme/theme';
import { Grid, Box, Stack } from '@mui/material';
import { Lists, Tasks, HeaderBar, WalletConnect, TaskDetails } from './components';
import { TodoProvider } from './context/TodoContext';
import todoListData from './data/todoListData';

function App() {
  
  // Check if task list data exists in local storage
  const taskListsJSON = localStorage.getItem('taskLists');
  // If there's no data in Local Storage, store the initial data
  if (taskListsJSON === null) {
    // Store the initial task lists in Local Storage
    localStorage.setItem('taskLists', JSON.stringify(todoListData));
  }

  // Parse the data from local storage or use the initial task lists
  const initialData = taskListsJSON !== null ? JSON.parse(taskListsJSON) : todoListData;

  // Set up state with the initial data
  const [taskLists, setTaskLists] = useState(initialData);
  const [selectedTaskList, setSelectedTaskList] = useState(null);
  // const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskListClick = (taskList) => {
    setSelectedTaskList(taskList);
  };

  // const handleTaskClick = (task) => {
  //   setSelectedTask(task);
  // };

  console.log('selectedTaskList: ', selectedTaskList)

  console.log('taskListsJSON: ', taskListsJSON);
  console.log('todoListData: ', todoListData);
  console.log('taskLists');

  return (
    <ThirdwebProvider>
      <TodoProvider>
        <ThemeProvider theme={theme}>
          <Box bgcolor="backgroundColor.default" style={{ padding: "23px 34px", height: "97vh" }}>
            <Grid container gap='3vw' justifyContent='center' style={{ height: "90%" }}>
              <Grid item container xs={3}>
                <Lists taskLists={taskLists} onTaskListClick={handleTaskListClick} />
              </Grid>
              <Grid item container xs={8}>
                <Stack width='100%' spacing={2}>
                  <Box display='flex' gap='3vw'>
                    <HeaderBar taskList={selectedTaskList} />
                    <WalletConnect />
                  </Box>
                  <Box display='flex' height='100%'>
                    <Tasks taskList={selectedTaskList} />
                    <TaskDetails />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </TodoProvider>
    </ThirdwebProvider>
  );
}

export default App;
