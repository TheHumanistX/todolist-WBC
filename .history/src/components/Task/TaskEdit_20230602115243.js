// Import necessary libraries and components
import React, { useContext, useEffect } from 'react';
import { TextField, TextareaAutosize, IconButton, Typography, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Check, CloseOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { TodoContext } from '../../context/TodoContext';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const TaskEdit = () => {
    // Access required values and functions from TodoContext
    const {
        handleTaskUpdate,
        setEditMode,
        selectedTask,
        taskName,
        setTaskName,
        dueDate,
        setDueDate,
        description,
        setDescription,
        selectedTaskList
    } = useContext(TodoContext);
    const theme = useTheme();
    // Set the state values when the selected task changes
    useEffect(() => {
        if (selectedTask) {
            setTaskName(selectedTask.taskName);
            setDescription(selectedTask.description);
            setDueDate(format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy'));
        }
    }, [selectedTask]);

    // Function to handle "confirm" event for task update
    const handleConfirm = () => {
        // Validate task title
        if (taskName.trim() === '') {
            alert('Task Title cannot be empty');
            return;
        }

        // Validate due date is not in the past
        if (dueDate && new Date(dueDate) < new Date()) {
            alert('Due Date cannot be in the past');
            return;
        }

        // Format due date as UTC
        let formattedDueDate = dueDate;
        if (dueDate) {
            formattedDueDate = format(utcToZonedTime(dueDate, 'UTC'), 'MM/dd/yyyy');
        }

        // Update the task object
        const updatedTask = {
            ...selectedTask,
            taskName,
            dueDate: formattedDueDate,
            description,
        };

        // Trigger the handleTaskUpdate function with the updated task and reset state values
        handleTaskUpdate(selectedTaskList.listId, updatedTask);
        setTaskName('');
        setDueDate(null);
        setDescription('');
    };

    // Function to handle "cancel" event for task update
    const handleCancel = () => {
        setEditMode(false);
        setTaskName('');
        setDueDate(null);
        setDescription('');
    };

    // Render the TaskEdit component
    return (
        <>
            {/* Display the task's created date */}
            <Typography variant="h6" mb={1}
            style={{
                color: theme.palette.text.primary
            }}
            >
                Created: {selectedTask.createdDate}
            </Typography>

            {/* Render a horizontal divider */}
            <Divider variant="middle" />
            <Box padding={5} boxSizing='border-box' width='100%' textAlign='center' mb={1}>
                {/* Render the Task Title input field */}
                <TextField
                    label="Task Title"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    fullWidth
                    margin="normal"
                    style ={{
                        borderColor: theme.palette.hrTextArea.main,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.cardBackgroundColor.alternate2,
                    }}
                    // color='hrTextArea.main'
                    
                />
            </Box>

            {/* Render the Due Date picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns} mb={2}>
                <DatePicker
                    label="Due Date"
                    value={new Date(dueDate)}
                    onChange={(newValue) => setDueDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    style ={{
                        color: theme.palette.text.primary
                    }}
                />
            </LocalizationProvider>

            {/* Render the Description textarea */}
            <TextareaAutosize
                minRows={15}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            {/* Render confirm and cancel icons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
                {/* Confirm icon */}
                <IconButton onClick={handleConfirm} size="small">
                    <Check
                        sx={{ color: 'button.main' }}
                        fontSize='large'
                    />
                </IconButton>

                {/* Cancel icon */}
                <IconButton onClick={handleCancel} size="small">
                    <CloseOutlined
                        sx={{ color: 'button.main' }}
                        fontSize='large'
                    />
                </IconButton>
            </Box>
        </>
    );
};

export default TaskEdit;