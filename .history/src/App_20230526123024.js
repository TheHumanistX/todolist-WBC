import React, { useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import theme from './theme/theme';
import { Grid, Box, Stack } from '@mui/material';
import { Lists, Tasks, HeaderBar, WalletConnect, TaskDetails } from './components';
import { TodoProvider, TodoContext } from './context/TodoContext';
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
  // const [selectedTaskList, setSelectedTaskList] = useState(null);
  const { selectedTaskList, setSelectedTaskList } = useContext(TodoContext);
  // const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskListClick = (taskList) => {
    setSelectedTaskList(taskList);
  };  

  const handleTaskAdd = (listId, newTask) => {
    // Implement the logic to add a new task to a specific task list
    const taskListToUpdate = taskLists.find((taskList) => taskList.listId === listId);
  
    if (!taskListToUpdate) {
      console.error('Task list not found for the selected task');
      return;
    }
  
    // Construct taskId for the new task
    const newTaskId = `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
    const updatedTask = { ...newTask, taskId: newTaskId, createdDate: new Date(), completed: false };
  
    const updatedTaskList = {
      ...taskListToUpdate,
      tasks: [...taskListToUpdate.tasks, updatedTask],
    };
  
    const updatedTaskLists = taskLists.map((taskList) =>
      taskList.listId === listId ? updatedTaskList : taskList
      );
    
      // Update the state with the new taskLists array
      setTaskLists(updatedTaskLists);
    
      // Update the local storage with the new taskLists array
      localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    };

  const handleTaskUpdate = (updatedTask) => {
    // Find the task list containing the current task
    console.log('handleTaskUpdate updatedTask: ', updatedTask)
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
                    {console.log('selectedTaskList just Before TaskDetails Call in AppJS: ', selectedTaskList)}
                    <TaskDetails 
                      onConfirm={handleTaskUpdate}
                      onTaskAdd={handleTaskAdd}
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
