// Import required libraries and components.
import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { TodoContext } from '../../context/TodoContext';
import { CardContainer, TaskEdit, TaskView, TaskAdd } from '../';

// Define the TaskDetails component.
const TaskDetails = ( ) => {
  // Use the useContext Hook to get the needed values from TodoContext.
  const { selectedTask, addTaskMode, editMode } = useContext(TodoContext);

  // If no task is selected and the user is not in addTaskMode, display a message prompting the user to select a task.
  if (!selectedTask && !addTaskMode) {
    return (
      <CardContainer>
        <Typography variant="h5">
          Please select a task to see the details.
        </Typography>
      </CardContainer>
    );
  }


  // If user is in addTaskMode, display the TaskAdd component. 
  // If user is in editMode, display the TaskEdit component. 
  // Otherwise, display TaskView component.
  return (
    <CardContainer>
      {addTaskMode ? (
        <TaskAdd />
      ) :
      editMode ? (
        <TaskEdit />
      ) : (
        <TaskView />
      )}
    </CardContainer>
  );
};

// Export the TaskDetails component as the default export.
export default TaskDetails;
