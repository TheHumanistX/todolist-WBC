import React, { useState } from 'react';
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

const TaskDetails = ({ task, onEdit, onDelete, onConfirm }) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null);
    const [details, setDetails] = useState(task.details);
    const createdOn = format(new Date(task.created), 'MM/dd/yyyy');
    const dueOn = format(new Date(task.dueDate), 'MM/dd/yyyy');
    const currentDate = format(new Date(), 'MM/dd/yyyy');

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setTitle(task.title);
        setDueDate(task.dueDate);
        setDetails(task.details);
    };

    const handleConfirm = () => {
        const updatedTask = {
            ...task,
            title,
            dueDate,
            details,
        };
        onConfirm(updatedTask);
        setEditMode(false);
    };

    const handleDelete = () => {
        onDelete(task.id);
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
                            Created: {createdOn}
                        </Typography>
                        {task.dueDate && (
                            <Typography variant="h6" mb={1}>
                                Due: {dueOn}
                            </Typography>
                        )}
                    </Box>
                    <Divider variant="middle" />
                    <Typography variant="h2" mb={2} mt={4} textAlign='center'>
                        {task.title}
                    </Typography>
                    <Typography variant="h5"
                        sx={{ ml: '40px' }}
                    >Information</Typography>
                    <TextareaAutosize
                        rowsMin={15}
                        value={task.details}
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            margin="normal"
                        />
                    </LocalizationProvider>
                    <TextareaAutosize
                        rowsMin={15}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
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