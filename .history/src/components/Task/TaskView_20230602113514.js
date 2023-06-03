// Importing required modules and components
import React, { useContext } from 'react';
import { Typography, Card, IconButton, Divider, TextareaAutosize, Box } from '@mui/material';
import { EditNote } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';

// TaskView component for displaying the details of a task
const TaskView = () => {
  // Destructure the required fields from the TodoContext
  const { handleEdit, selectedTask } = useContext(TodoContext);

  // Return the TaskView component's JSX
  return (
    <>
      {/* Container for created and due date */}
      <Box display="flex" justifyContent="space-around" padding={5} width='100%'>
        {/* Display the created date */}
        <Typography variant="h6">Created: {selectedTask.createdDate}</Typography>
        {/* Display the due date if available */}
        {selectedTask.dueDate && <Typography variant="h6">Due: {selectedTask.dueDate}</Typography>}
      </Box>
      {/* Horizontal divider */}
      <Divider variant="middle" width="80%" />
      {/* Display the task's name in alarger font */}
      <Typography variant="h2" mb={2} mt={4} textAlign="center">
        {selectedTask.taskName}
      </Typography>
      {/* Display the "Information" title */}
      <Typography variant="h5" ml={2}>
        Information
      </Typography>
      {/* Display the task's description in a non-editable textarea */}
      <TextareaAutosize
        minRows={15}
        value={selectedTask.description}
        disabled
        style={{
          width: '80%',
          height: '60%',
          borderRadius: '12px',
          borderColor: 'hrTextArea.main',
          color: 'text.primary',
          resize: 'none',
          margin: 'auto',
          padding: '12px',
        }}
      />
      {/* Plain card to contain the edit button */}
      <Card variant="plain" sx={{ mt: 'auto', ml: 'auto', backgroundColor: 'cardBackgroundColor.main' }}>
        {/* Edit button to trigger the handleEdit function */}
        <IconButton onClick={handleEdit}>
          <EditNote sx={{ color: 'button.main', width: 45, height: 45 }} />
        </IconButton>
      </Card>
    </>
  );
};

// Export the TaskView component
export default TaskView