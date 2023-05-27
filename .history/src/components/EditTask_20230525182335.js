import React from 'react';
import { TextField, TextareaAutosize, IconButton, InputAdornment } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Check, Clear, CloseOutlined } from '@mui/icons-material';

const EditTask =({
    taskName,
    setTaskName,
    dueDate,
    setDueDate,
    description,
    setDescription,
    handleConfirm,
    handleCancel,
    selectedTask,
  }) => {
    return (
      <>
        <TextField
          label="Task Title"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCancel} size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {selectedTask && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={new Date(dueDate)}
              onChange={(newValue) => setDueDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>
        )}
        <TextareaAutosize
          minRows={15}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: '600px',
            height: '685px',
            borderRadius: '12px',
            borderColor: 'backgroundColor.default',
            resize: 'none',
            margin: 'auto',
            padding: '12px',
          }}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <IconButton onClick={handleConfirm} size="small">
            <Check />
          </IconButton>
          <IconButton onClick={handleCancel} size="small">
            <Delete />
          </IconButton>
        </Box>
      </>
    );
  };
  
  export default EditTask;