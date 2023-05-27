import React, { useContext, useEffect } from 'react';
import { TextField, TextareaAutosize, IconButton, InputAdornment, Typography, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Check, Clear, CloseOutlined } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const TaskEdit = () => {
    const { handleTaskUpdate, setEditMode, selectedTask, taskName, setTaskName, dueDate, setDueDate, description, setDescription, selectedTaskList } = useContext(TodoContext);

    // useEffect(() => {
    //     if (selectedTask) {
    //         setTaskName(selectedTask ? selectedTask.taskName : "");
    //         setDescription(selectedTask ? selectedTask.description : "");
    //         setDueDate(selectedTask ? format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy') : null);
    //     }
    // }, [selectedTask]);


    const handleConfirm = () => {
        if (taskName.trim() === '') {
            alert('Task Title cannot be empty');
            return;
        }
        let formattedDueDate = dueDate;
        if (dueDate) {
            formattedDueDate = format(utcToZonedTime(dueDate, 'UTC'), 'MM/dd/yyyy');
        }
        const updatedTask = {
            ...selectedTask,
            taskName,
            dueDate: formattedDueDate,
            description,
        };
        handleTaskUpdate(selectedTaskList.listId, updatedTask); // Use the provided onConfirm prop
    };

    const handleCancel = () => {
        setEditMode(false);

    };

    return (
        <>
            <Typography variant="subtitle1" mb={1}>
                Created: {selectedTask.createdDate}
            </Typography>
            <Divider variant="middle" />
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
                    <Check
                        sx={{ color: 'buttonColor.main' }}
                        fontSize='large'
                    />
                </IconButton>
                <IconButton onClick={handleCancel} size="small">
                    <CloseOutlined
                        sx={{ color: 'buttonColor.main' }}
                        fontSize='large'
                    />
                </IconButton>
            </Box>
        </>
    );
};

export default TaskEdit;