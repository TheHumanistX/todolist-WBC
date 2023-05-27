import React, { useState, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { TodoContext } from '../../context/TodoContext';
import { CardContainer, TaskEdit, TaskView, TaskAdd } from '../';


const TaskDetails = ({ onEdit, onDelete, onConfirm }) => {
    const { selectedTask, selectedTaskList, addTaskMode, editMode, setAddTaskMode, handleTaskAdd } = useContext(TodoContext);
    console.log('selectedTask: ', selectedTask)
    console.log('selectedTaskList at top of TaskDetails: ', selectedTaskList)
 
    // const [taskName, setTaskName] = useState("");
    // const [dueDate, setDueDate] = useState(null);
    // const [description, setDescription] = useState("");

    // useEffect(() => {
    //     if (selectedTask) {
    //         setTaskName(selectedTask ? selectedTask.taskName : "");
    //         setDescription(selectedTask ? selectedTask.description : "");
    //         setDueDate(selectedTask ? format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy') : null);
    //     }
    // }, [selectedTask]);


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
                        <TaskView
                            createdDate={format(utcToZonedTime(new Date(selectedTask.createdDate), 'UTC'), 'MM/dd/yyyy')}
                            dueDate={dueDate}
                            taskName={taskName}
                            description={description}                            
                        />
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