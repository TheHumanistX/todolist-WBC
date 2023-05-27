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
 
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (selectedTask) {
            setTaskName(selectedTask ? selectedTask.taskName : "");
            setDescription(selectedTask ? selectedTask.description : "");
            setDueDate(selectedTask ? format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy') : null);
            // console.log('dueDate: ', dueDate)
            // console.log('selectedTask.dueDate: ', selectedTask ? selectedTask.dueDate : null)
        }
    }, [selectedTask]);


    if (!selectedTask && !addTaskMode) {
        return (
            <CardContainer>
                <Typography variant="h5">
                    Please select a task to see the details.
                </Typography>
            </CardContainer>
        );
    }
   

    // const handleCancel = () => {
    //     setEditMode(false);
    //     setTaskName(selectedTask.taskName);
    //     setDueDate(format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy'));
    //     setDescription(selectedTask.description);
    // };

    // const handleConfirm = () => {
    //     const updatedTask = {
    //         ...selectedTask,
    //         taskName,
    //         dueDate,
    //         description,
    //     };
    //     onConfirm(updatedTask); // Use the provided onConfirm prop
    //     setEditMode(false);
    // };

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