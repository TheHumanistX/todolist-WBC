import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import theme from './theme/theme';
import { Grid, Box, Stack } from '@mui/material';
import { Lists, Tasks, HeaderBar, WalletConnect, TaskDetails } from './components';
import { TodoProvider } from './context/TodoContext';
import todoListData from './data/todoListData';
import { boxSizing } from '@mui/system';

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

  const handleTaskUpdate = (updatedTask) => {
    // Find the index of the task list containing the current task
    const taskListIndex = taskLists.findIndex(
      (taskList) => taskList.listId === updatedTask.listId
    );
  
    // Find the index of the task to be updated within its list
    const taskIndex = taskLists[taskListIndex].tasks.findIndex(
      (task) => task.taskId === updatedTask.taskId
    );
  
    // Create a new task list with the updated task
    const updatedTaskList = {
      ...taskLists[taskListIndex],
      tasks: [
        ...taskLists[taskListIndex].tasks.slice(0, taskIndex),
        updatedTask,
        ...taskLists[taskListIndex].tasks.slice(taskIndex + 1),
      ],
    };
 

  console.log('selectedTaskList: ', selectedTaskList)

  console.log('taskListsJSON: ', taskListsJSON);
  console.log('todoListData: ', todoListData);
  console.log('taskLists');

  return (
    <ThirdwebProvider>
      <TodoProvider>
        <ThemeProvider theme={theme}>
          <Box bgcolor="backgroundColor.default" style={{ padding: "23px 34px", height: "100vh", boxSizing: 'border-box' }}>
            <Grid container gap='3vw' justifyContent='center' style={{ height: "100%" }}>
              <Grid item container xs={3}>
                <Lists taskLists={taskLists} onTaskListClick={handleTaskListClick} />
              </Grid>
              <Grid item container xs={8}>
                <Stack width='100%' spacing={2}>
                  <Box display='flex' gap='3vw'>
                    <HeaderBar taskList={selectedTaskList} />
                    <WalletConnect />
                  </Box>
                  <Box display='flex' gap='3vw' height='100%'>
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
