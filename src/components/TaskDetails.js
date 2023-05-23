import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    TextField,
    TextareaAutosize,
    InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { DatePicker } from '@mui/x-date-pickers'
import { format } from 'date-fns';

const TaskDetails = ({ task, onEdit, onDelete, onConfirm }) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [details, setDetails] = useState(task.details);
    console.log('task.created: ', task.created)
    const createdOn = format(new Date(task.created), 'MM/dd/yyyy');
    const dueOn = format(new Date(task.dueDate), 'MM/dd/yyyy');
    console.log('createdOn: ', createdOn);

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
                    <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1" mb={1}>
                        Created: {createdOn}
                    </Typography>
                    {task.dueDate && (
                        <Typography variant="subtitle1" mb={1}>
                            Due: {dueOn}
                        </Typography>
                    )}
                    </Box>
                    <Divider variant="middle" />
                    <Typography variant="h5" mb={2}>
                        {task.title}
                    </Typography>
                    <TextareaAutosize
                        rowsMin={15}
                        value={task.details}
                        disabled
                        style={{ width: '600px' }}
                    />
                    <Typography variant="body1">Information</Typography>
                    <IconButton onClick={handleEdit} size="small">
                        <EditIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography variant="subtitle1" mb={1}>
                        Created: {task.created}
                    </Typography>
                    <hr />
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
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <DatePicker
                        label="Due Date"
                        value={dueDate}
                        onChange={(newValue) => setDueDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        margin="normal"
                    />
                    <TextareaAutosize
                        rowsMin={15}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        style={{ width: '600px' }}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <IconButton onClick={handleConfirm} size="small">
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete} size="small">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TaskDetails;