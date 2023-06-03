// Import required libraries and components
import React, { useContext } from 'react';
import { Typography, Card, CardContent, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Task, AddButton, CardContainer } from '../';
import { TodoContext } from '../../context/TodoContext';

// Tasks component
const Tasks = () => {
const theme = useTheme();
  // Use the TodoContext to access required states and functions
  const { selectedTaskList, setAddTaskMode } = useContext(TodoContext);

  // Display a message if no task list is selected
  if (!selectedTaskList) {
    return (
      <CardContainer>
        <Typography variant="h5">Please select a task list.</Typography>
      </CardContainer>
    );
  }

  // Separate tasks into completed and outstanding tasks
  const tasksOutstanding = selectedTaskList.tasks.filter(
    (task) => !task.completed
  );

  // Function to handle adding a new task
  const handleAddTask = () => {
    // Enable the task addition mode
    setAddTaskMode(true);
  };
  // Return the Tasks component JSX structure
  return (
    <CardContainer>
      {/* Display the selected task list's name as a header */}
      <Typography variant="h5" mb={2}>
        {selectedTaskList.listName} Tasks
      </Typography>
      {/* Display the count of outstanding tasks */}
      <Typography variant="h6" mb={2}>
        Outstanding ({tasksOutstanding.length}):
      </Typography>
      {/* Render a flex container to display tasks */}
      <Stack
        width="100%"
        p={2}
        borderRadius="22px"
        justifyContent="stretch"
        alignItems="center"
        boxSizing="border-box"
      >
        {/* Map over the tasks array and render Task components for each task */}
        {selectedTaskList &&
          selectedTaskList.tasks.map((task) => (
            <Task key={task.taskId} task={task} />
          ))}
      </Stack>
      {/* Render a card containing the AddButton component */}
      <Card
        variant="plain"
        sx={{
          backgroundColor: 'cardBackgroundColor.main',
          mt: 'auto',
          ml: 'auto',
        }}
      >
        <CardContent>
          {/* AddButton triggers the handleAddTask function onClick */}
          <AddButton onClick={handleAddTask} />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

// Export the Tasks component for reusability
export default Tasks;