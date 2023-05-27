import React, { useState, useContext } from 'react';
import {
    Box,
    Typography,
    IconButton,
    TextField,
    TextareaAutosize,
    InputAdornment,
    Card,
    Divider
} from '@mui/material';
import { Check, Clear, Delete, EditNote } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import TaskContext from '.. /context/TaskContext';

const TaskDetails = ({ onEdit, onDelete, onConfirm }) => {
    const { selectedTask } = useContext(TaskContext);
    const task = selectedTask;
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(task ? task.taskName : "");
    const [dueDateV, setDueDateV] = useState(task? new Date(task.dueDate) : "");
    const [description, setDescription] = useState(task ? task.description : "");

    if (!task) {
        return (
            <Box
                width="680px"
                height="1060px"
                bgcolor="cardBackgroundColor.main"
                p={2}
                display="flex"
                flexDirection="column"
                borderRadius='22px'
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h5">
                    Please select a task to see the details.
                </Typography>
            </Box>
        );
    }
    const createdDate = task.createdDate ? format(new Date(task.createdDate), 'MM/dd/yyyy') : "";
    const dueDate = task.dueDate ? format(new Date(task.dueDate), 'MM/dd/yyyy') : "";
    const currentDate = task ? format(new Date(), 'MM/dd/yyyy') : "";

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setTaskName(task.taskName);
        setDueDateV(task.dueDate);
        setDescription(task.description);
    };

    const handleConfirm = () => {
        const updatedTask = {
            ...task,
            taskName,
            dueDate,
            description,
        };
        onConfirm(updatedTask);
        setEditMode(false);
    };

    const handleDelete = () => {
        onDelete(task.taskId);
    };
    return (
        <Box
            width="680px"
            height="1060px"
            bgcolor="cardBackgroundColor.main"
            p={2}
            display="flex"
            flexDirection="column"
            borderRadius='22px'
        >
            {!editMode ? (
                <>
                    <Box display="flex" justifyContent="space-between" padding={5} boxSizing='border-box'>
                        <Typography variant="h6" mb={1}>
                            Created: {createdDate}
                        </Typography>
                        {dueDateV && (
                            <Typography variant="h6" mb={1}>
                                Due: {dueDateV}
                            </Typography>
                        )}
                    </Box>
                    <Divider variant="middle" />
                    <Typography variant="h2" mb={2} mt={4} textAlign='center'>
                        {task.taskId}
                    </Typography>
                    <Typography variant="h5"
                        sx={{ ml: '40px' }}
                    >Information</Typography>
                    <TextareaAutosize
                        minRows={15}
                        value={task.description}
                        disabled
                        style={{ width: '600px', height: '685px', borderRadius: '12px', borderColor: 'backgroundColor.default', resize: 'none', margin: 'auto', padding: '12px' }}
                    />
                    <Card variant='plain' sx={{ mt: 'auto', ml: 'auto', backgroundColor: 'cardBackgroundColor.main' }}>
                        <IconButton onClick={handleEdit}>
                            <EditNote
                                sx={{ color: 'buttonColor.main', width: 45, height: 45 }}

                            />
                        </IconButton>
                    </Card>
                </>
            ) : (
                <>
                    <Typography variant="subtitle1" mb={1}>
                        Created: {currentDate}
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
                    {task &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Due Date"
                                value={dueDate}
                                onChange={(newValue) => setDueDateV(newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                fullWidth
                                margin="normal"
                            />
                        </LocalizationProvider>
                    }
                    <TextareaAutosize
                        minRows={15}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '600px', height: '685px', borderRadius: '12px', borderColor: 'backgroundColor.default', resize: 'none', margin: 'auto', padding: '12px' }}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <IconButton onClick={handleConfirm} size="small">
                            <Check />
                        </IconButton>
                        <IconButton onClick={handleDelete} size="small">
                            <Delete />
                        </IconButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TaskDetails;