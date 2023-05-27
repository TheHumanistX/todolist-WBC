import React, { useState, useContext, useEffect } from 'react';
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
import { utcToZonedTime } from 'date-fns-tz';
import { TodoContext } from '../context/TodoContext';

const TaskDetails = ({ onEdit, onDelete, onConfirm }) => {
    const { selectedTask } = useContext(TodoContext);
    console.log('selectedTask: ', selectedTask)
    console.log('selectedTask.dueDate: ', selectedTask ? selectedTask.dueDate : '')
    const task = selectedTask;
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [dueDateV, setDueDateV] = useState(null);
    const [description, setDescription] = useState("");
    
    useEffect(() => {
        setTaskName(selectedTask ? selectedTask.taskName : "");
        setDescription(selectedTask ? selectedTask.description : "");
        setDueDateV(selectedTask ? format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy') : null);
        console.log('dueDateV: ', dueDateV)
        console.log('selectedTask.dueDate: ', selectedTask ? selectedTask.dueDate : null)
    }, [selectedTask]);
    console.log('dueDateV: ', dueDateV)
    
    if (!selectedTask) {
        return (
            <Box
                width="30vw"
                height="100%"
                bgcolor="cardBackgroundColor.main"
                p={2}
                display="flex"
                flexDirection="column"
                borderRadius='22px'
                justifyContent="center"
                alignItems="center"
                boxSizing="border-box"
            >
                <Typography variant="h5">
                    Please select a task to see the details.
                </Typography>
            </Box>
        );
    }
    const createdDate = selectedTask.createdDate ? format(utcToZonedTime(new Date(selectedTask.createdDate), 'UTC'), 'MM/dd/yyyy') : "";
    const dueDate = selectedTask.dueDate ? format(new Date(selectedTask.dueDate), 'MM/dd/yyyy') : "";
    console.log('dueDate: ', dueDate)   
    const currentDate = format(new Date(), 'MM/dd/yyyy');


    const handleEdit = () => {
        console.log('Made into handleEdit')
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setTaskName(selectedTask.taskName);
        setDueDateV(selectedTask.dueDate);
        setDescription(selectedTask.description);
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
        onDelete(selectedTask.taskId);
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
                        {dueDate && (
                            <Typography variant="h6" mb={1}>
                                Due: {dueDateV}
                            </Typography>
                        )}
                    </Box>
                    <Divider variant="middle" />
                    <Typography variant="h2" mb={2} mt={4} textAlign='center'>
                        {taskName}
                    </Typography>
                    <Typography variant="h5"
                        sx={{ ml: '40px' }}
                    >Information</Typography>
                    <TextareaAutosize
                        minRows={15}
                        value={description}
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
                    {console.log('Passed into the edit mode')}
                    <Typography variant="subtitle1" mb={1}>
                        Created: {createdDate}
                        {console.log('Edit createdDate: ', createdDate)}
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
                    {console.log('Made through Task Title TextField')}
                    {task &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {console.log('Made past LocalizationProvider')}
                            {console.log('Is date valid?', isNaN(dueDateV))}
                            {console.log('dueDateV Type: ', typeof dueDateV)}
                            <DatePicker
                                label="Due Date"
                                value={new Date(utcToZonedTime(dueDateV, 'UTC'))}
                                onChange={(newValue) => setDueDateV(newValue)}
                                slotProps={{TextField}}
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
                        <IconButton onClick={handleCancel} size="small">
                            <Delete />
                        </IconButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TaskDetails;