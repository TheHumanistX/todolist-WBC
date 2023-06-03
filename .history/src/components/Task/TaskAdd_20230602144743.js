// Import required modules and components from libraries
import React, { useState, useContext } from 'react';
import { Box, TextField, TextareaAutosize, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { Check, CloseOutlined } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';

// Define TaskAdd component
const TaskAdd = () => {
  const theme = useTheme();
  // Destructure and useContext hook to obtain variables and functions from TodoContext
  const {
    handleTaskAdd,
    selectedTaskList,
    setAddTaskMode,
    dueDate,
    setDueDate,
    description,
    setDescription,
    taskName,
    setTaskName,
  } = useContext(TodoContext);

  // Creating a new Date() object and converting it from UTC time to the local time zone 
  // using the utcToZonedTime function. It then formats the resulting date using the format 
  // function to display it in the format of MM/dd/yyyy. The resulting date is stored in the 
  // createdDate state variable.
  // No setter function is because this state variable is only being used to store a value that 
  // is being calculated once at initialization and never updated again.
  const [createdDate] = useState(format(utcToZonedTime(new Date(), 'UTC'), 'MM/dd/yyyy'));

  // handleConfirm function to validate input, format due date, add the task, and reset input fields
  const handleConfirm = () => {
    // Validate task name, making sure it's not empty
    if (taskName.trim() === '') {
      alert('Task Title cannot be empty');
      return;
    }

    // Validate if the due date is not in the past
    if (dueDate && new Date(dueDate) < new Date()) {
      alert('Due Date cannot be in the past');
      return;
    }

    // Set unique taskId based on the length of existing tasks
    const newTaskId = selectedTaskList.tasks.length + 1;

    // Format due date if provided
    let formattedDueDate = dueDate;
    if (dueDate) {
      // Taking the dueDate variable and converting it from UTC time to the local time zone 
      // using the utcToZonedTime function. It then formats the resulting date using the format 
      // function to display it in the format of MM/dd/yyyy. The resulting date is stored in 
      // the formattedDueDate variable.
      formattedDueDate = format(utcToZonedTime(dueDate, 'UTC'), 'MM/dd/yyyy');
    }

    // Call handleTaskAdd to add the new task to the selected task list
    handleTaskAdd(selectedTaskList.listId, {
      taskId: newTaskId,
      taskName,
      createdDate,
      dueDate: formattedDueDate,
      completed: false,
      description,
    });

    // Reset input fields and exit add task mode
    setTaskName('');
    setDueDate(null);
    setDescription('');
    setAddTaskMode(false);
  };

  // handleCancel function to exit add task mode and clear context variables
  const handleCancel = () => {
    setAddTaskMode(false);
    setTaskName('');
    setDueDate(null);
    setDescription('');
  };

  // Render TaskAdd component
  return (
    <>
      {/* Container for Task Title input field */}
      <Box padding={5} boxSizing='border-box' width='100%' mb={1}>
        <TextField
          label="Task Title"
          value={taskName}
          // Update the state variable when the task name changes
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          autoFocus
        />
      </Box>

      {/* Date picker container */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Due Date"
          value={dueDate}
          // Update the state variable when the due date changes
          onChange={(newValue) => setDueDate(newValue)}
          // Render the date picker input field
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
      {/* Textarea for Task Description */}
      <TextareaAutosize
        // Set minimum row height and placeholder
        minRows={15}
        placeholder="Task Description"
        value={description}
        // Update the state variable when the description changes
        onChange={(e) => setDescription(e.target.value)}
        // Apply inline styles to the TextareaAutosize component
        style={{
          width: '80%',
          height: '60%',
          borderRadius: '12px',
          borderColor: theme.palette.hrTextArea.main,
          outlineColor: theme.palette.hrTextArea.main,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.cardBackgroundColor.alternate2,
          resize: 'none',
          margin: 'auto',
          padding: '12px',
        }}
      />
      {/* Action buttons container */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        {/* Confirm button with check icon */}
        <IconButton onClick={handleConfirm} size="small">
          <Check
            sx={{ color: 'button.main' }}
            fontSize="large"
          />
        </IconButton>
        {/* Cancel button with close icon */}
        <IconButton onClick={handleCancel} size="small">
          <CloseOutlined
            sx={{ color: 'button.main' }}
            fontSize="large"
          />
        </IconButton>
      </Box>
    </>
  );
}
// Export the TaskAdd component
export default TaskAdd;
