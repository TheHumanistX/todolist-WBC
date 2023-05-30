import React, { useState, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { TodoContext } from '../../context/TodoContext';
import { CardContainer, TaskEdit, TaskView, TaskAdd } from '../';
 
const TaskDetails = ({ onDelete }) => {
    const { selectedTask, selectedTaskList, addTaskMode, editMode } = useContext(TodoContext);
    console.log('selectedTask: ', selectedTask)
    console.log('selectedTaskList at top of TaskDetails: ', selectedTaskList)

    if (!selectedTask && !addTaskMode) {
        return (
            <CardContainer>
                <Typography variant="h5">
                    Please select a task to see the details.
                </Typography>
            </CardContainer>
        );
    }

    const handleDelete = () => {
        onDelete(selectedTask.taskId);
    };

    return (
        <CardContainer>
            {addTaskMode ? (
                <TaskAdd />
            ) :

                !editMode ? (
                    <>
                        <TaskView />
                    </>
                ) : (
                    <>
                        <TaskEdit />
                    </>
                )}
        </CardContainer>
    );

};

export default TaskDetails;