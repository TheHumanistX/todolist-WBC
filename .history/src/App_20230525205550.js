import React, { useState } from 'react';
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

  const handleTaskAdd = (taskListId, newTaskData) => {
    // Find the task list that the new task should be added to
    const taskList = taskLists.find((list) => list.listId === taskListId);
  
    if (!taskList) {
      console.error('Task list not found for the selected task list ID');
      return;
    }
  
    // Generate a unique taskId for the new task (this could be done in an improved way)
    const uniqueTaskId =
      Math.max(...taskList.tasks.map((task) => task.taskId)) + 1;
  
    // Create the new task object with the newTaskData and additional required properties
    const newTask = {
      taskId: uniqueTaskId,
      completed: false,
      createdDate: new Date(),
      ...newTaskData,
    };
  
    // Add the new task to the current task list
    const updatedTasks = [...taskList.tasks, newTask];
  
    // Update the context and local state with the updated tasks list
    const updatedTaskList = { ...taskList, tasks: updatedTasks };
    const updatedTaskLists = taskLists.map((list) =>
    list.listId === taskListId ? updatedTaskList : list
  );
  
  // Update the state with the new taskLists array
  setTaskLists(updatedTaskLists);
  
  // Update the local storage with the new taskLists array
  localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  const handleTaskUpdate = (updatedTask) => {
    // Find the task list containing the current task
    const taskListToUpdate = taskLists.find(
      (taskList) => taskList.listId === selectedTaskList.listId
    );
  
    // Check if taskListToUpdate exists
    if (!taskListToUpdate) {
      console.error('Task list not found for the selected task');
      return;
    }
  
    // Find the index of the task to be updated within its list
    const taskIndex = taskListToUpdate.tasks.findIndex(
      (task) => task.taskId === updatedTask.taskId
    );
  
    if (taskIndex < 0) {
      console.error('Task not found in the selected task list');
      return;
    } 
    const updatedTaskList = {
      ...taskListToUpdate,
      tasks: [
        ...taskListToUpdate.tasks.slice(0, taskIndex),
        updatedTask,
        ...taskListToUpdate.tasks.slice(taskIndex + 1),
      ],
    };
    const updatedTaskLists = taskLists.map((taskList) =>
    taskList.listId === selectedTaskList.listId ? updatedTaskList : taskList
  );

  // Update the state with the new taskLists array
  setTaskLists(updatedTaskLists);

  // Update the local storage with the new taskLists array
  localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
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
                    <TaskDetails 
                      onConfirm={handleTaskUpdate}
                      onAdd={handleTaskAdd}
                    />
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
