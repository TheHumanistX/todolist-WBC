import React, { useContext } from 'react';
import { TextField, TextareaAutosize, IconButton, InputAdornment, Typography, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Check, Clear, CloseOutlined } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';

const TaskEdit = ({
    taskName,
    setTaskName,
    dueDate,
    setDueDate,
    description,
    setDescription,
    handleCancel,
    selectedTask,
}) => {
    const { handleTaskUpdate, setEditMode } = useContext(TodoContext);

    const handleConfirm = () => {
        const updatedTask = {
            ...selectedTask,
            taskName,
            dueDate,
            description,
        };
        handleTaskUpdate(updatedTask); // Use the provided onConfirm prop
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        setTaskName(selectedTask.taskName);
        setDueDate(format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy'));
        setDescription(selectedTask.description);
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