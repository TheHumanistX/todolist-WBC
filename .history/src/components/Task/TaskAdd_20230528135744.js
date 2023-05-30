import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  TextareaAutosize,
  IconButton
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { Check, Clear, CloseOutlined } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';

const TaskAdd = () => {
  const { handleTaskAdd, selectedTaskList, setAddTaskMode, dueDate, setDueDate } = useContext(TodoContext);
  const [taskName, setTaskName] = useState('');
  // const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState('');

  const [createdDate] = useState(format(utcToZonedTime(new Date(), 'UTC'), 'MM/dd/yyyy'));
  console.log('createdDate: ', createdDate)

  const handleConfirm = () => {
    if (taskName.trim() === '') {
      alert('Task Title cannot be empty');
      return;
    }

    if (dueDate && new Date(dueDate) < new Date()) {
      alert('Due Date cannot be in the past');
      return;
  }

    const newTaskId = selectedTaskList.tasks.length + 1;
    let formattedDueDate = dueDate;
    if (dueDate) {
      formattedDueDate = format(utcToZonedTime(dueDate, 'UTC'), 'MM/dd/yyyy');
    }
  
    handleTaskAdd(selectedTaskList.listId, { taskId: newTaskId, taskName, createdDate, dueDate: formattedDueDate, completed: false, description });
    setTaskName('');
    setDueDate(null);
    setDescription('');
    setAddTaskMode(false);
  };

  const handleCancel = () => {
    setAddTaskMode(false);
    
};

  return (
    <>
      <TextField
        label="Task Title"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        autoFocus
        
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
      <TextareaAutosize
        minRows={15}
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', minHeight: '100px', marginTop: '15px' }}
      />
      {console.log('ListId: ', selectedTaskList.listId)}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <IconButton onClick={handleConfirm} size="small">
          <Check
            sx={{ color: 'buttonColor.main' }}
            fontSize="large"
          />
        </IconButton>
        <IconButton onClick={handleCancel} size="small">
          <CloseOutlined
            sx={{ color: 'buttonColor.main' }}
            fontSize="large"
          />
        </IconButton>
      </Box>
    </>
  );
};

export default TaskAdd;