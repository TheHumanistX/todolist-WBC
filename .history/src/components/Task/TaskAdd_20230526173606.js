import React, { useState } from 'react';
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

const TaskAdd = ({ handleAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [description, setDescription] = useState('');

  const [currentDate] = useState(format(utcToZonedTime(new Date(), 'UTC'), 'MM/dd/yyyy'));
  console.log('currentDate: ', currentDate)

  const handleConfirm = () => {
    if (taskName.trim() === '') {
      alert('Task Title cannot be empty');
      return;
    }

    handleAddTask({ taskName, currentDate, dueDate, description });
    setTaskName('');
    setDueDate(null);
    setDescription('');
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
        minRows={3}
        placeholder="Task Description"
        value={description}
        onChange={(newValue) => {
          const formattedDate = format(utcToZonedTime(newValue, 'UTC'), 'MM/dd/yyyy');
          setDueDate(formattedDate);
        }}
        style={{ width: '100%', minHeight: '100px', marginTop: '15px' }}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <IconButton onClick={handleConfirm} size="small">
          <Check
            sx={{ color: 'buttonColor.main' }}
            fontSize="large"
          />
        </IconButton>
        <IconButton onClick={() => handleAddTask(null)} size="small">
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