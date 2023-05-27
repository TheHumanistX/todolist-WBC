import React, { useState, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { TodoContext } from '../../context/TodoContext';
import { CardContainer, TaskEdit, TaskView, TaskAdd } from '../';


const TaskDetails = ({ onEdit, onDelete, onConfirm }) => {
    const { selectedTask, displayAddTaskForm, setDisplayAddTaskForm } = useContext(TodoContext);
    console.log('selectedTask: ', selectedTask)
    console.log('selectedTask.dueDate: ', selectedTask ? selectedTask.dueDate : '')

    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (selectedTask) {
            setTaskName(selectedTask ? selectedTask.taskName : "");
            setDescription(selectedTask ? selectedTask.description : "");
            setDueDate(selectedTask ? format(utcToZonedTime(new Date(selectedTask.dueDate), 'UTC'), 'MM/dd/yyyy') : null);
            console.log('dueDate: ', dueDate)
            console.log('selectedTask.dueDate: ', selectedTask ? selectedTask.dueDate : null)
        }
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
        onConfirm(updatedTask); // Use the provided onConfirm prop
        setEditMode(false);
    };

    const handleDelete = () => {
        onDelete(selectedTask.taskId);
    };

    return (
        <CardContainer>
            {displayAddTaskForm ? (
                <TaskAdd
                handleConfirm={(newTaskData) => {
                    // Generate a unique taskId for the new task (this could be done in an improved way)
                    const uniqueTaskId = Math.max(...taskList.tasks.map(task => task.taskId)) + 1;
                    
                    // Create the new task object with the newTaskData and additional required properties
                    const newTask = {
                      taskId: uniqueTaskId,
                      completed: false,
                      createdDate: new Date(),
                      ...newTaskData
                    };
                    
                    // Add the new task to the current task list
                    const updatedTasks = [...taskList.tasks, newTask];
                  
                    // Update the context and local state with the updated tasks list
                    const updatedTaskList = { ...taskList, tasks: updatedTasks };
                    setTaskLists(taskLists.map(list => list.listId === taskList.listId ? updatedTaskList : list));
                    localStorage.setItem("taskLists", JSON.stringify(taskLists));
                        // Set displayAddTaskForm back to false
                        setDisplayAddTaskForm(false);
                    }}
                    handleCancel={() => setDisplayAddTaskForm(false)}
                />
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