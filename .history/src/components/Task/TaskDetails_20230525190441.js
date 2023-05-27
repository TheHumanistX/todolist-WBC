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
import { TodoContext } from '../../context/TodoContext';
import { CardContainer, TaskEdit, TaskView } from '../';


const TaskDetails = ({ onEdit, onDelete, onConfirm }) => {
    const { selectedTask } = useContext(TodoContext);
    console.log('selectedTask: ', selectedTask)
    console.log('selectedTask.dueDate: ', selectedTask ? selectedTask.dueDate : '')

    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        setTaskName(selectedTask ? selectedTask.taskName : "");
        setDescription(selectedTask ? selectedTask.description : "");
        setDueDate(selectedTask ? format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy') : null);
        console.log('dueDate: ', dueDate)
        console.log('selectedTask.dueDate: ', selectedTask ? selectedTask.dueDate : null)
    }, [selectedTask]);


    if (!selectedTask) {
        return (
            <CardContainer>
                <Typography variant="h5">
                    Please select a task to see the details.
                </Typography>
            </CardContainer>
        );
    }
    const createdDate = selectedTask.createdDate ? format(utcToZonedTime(new Date(selectedTask.createdDate), 'UTC'), 'MM/dd/yyyy') : "";
    const currentDate = format(new Date(), 'MM/dd/yyyy');

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setTaskName(selectedTask.taskName);
        setDueDate(format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy'));
        setDescription(selectedTask.description);
    };

    const handleConfirm = () => {
        const updatedTask = {
            ...selectedTask,
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
        <CardContainer>
            {!editMode ? (
                <>
                       <TaskView
                        createdDate={format(utcToZonedTime(new Date(selectedTask.createdDate), 'UTC'), 'MM/dd/yyyy')}
                        taskName={taskName}
                        description={description}
                        handleEdit={handleEdit}
                    />
                </>
            ) : (
                <>
                    <TaskEdit
                        selectedTask={selectedTask}
                        taskName={taskName}
                        setTaskName={setTaskName}
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                        description={description}
                        setDescription={setDescription}
                        handleConfirm={handleConfirm}
                        handleCancel={handleCancel}
                    />
                </>
            )}
        </CardContainer>
    );

};

export default TaskDetails;