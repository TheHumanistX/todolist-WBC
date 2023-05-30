import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { TodoContext } from '../../context/TodoContext';
import { CardContainer, TaskEdit, TaskView, TaskAdd } from '../';
 
const TaskDetails = ({ onDelete }) => {
    const { selectedTask, selectedTaskList, addTaskMode, editMode } = useContext(TodoContext);

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