import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { RemoveCircleOutline, Check } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';


const Task = ({ task }) => {
    const { taskId, taskName, dueDate, completed, description } = task;
    const { selectedTask, setSelectedTask, selectedTaskList, handleTaskDelete, handleTaskToggleCompleted } = useContext(TodoContext);
    const backgroundColor = () => {
        if (taskId % 2 === 0) {
            return 'cardBackgroundColor.main';
        } else {
            return 'cardBackgroundColor.alternate';
        }
    };

    const iconColor = () => {
        if (taskId % 2 === 0) {
            return 'cardBackgroundColor.alternate';
        } else {
            return 'cardBackgroundColor.main';
        }
    };
    const setSelectedTaskNull = () => {
        setSelectedTask(null);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleDeleteTask = () => {
        setSelectedTask(task);
        handleTaskDelete(selectedTaskList.listId, selectedTask.taskId);
        setSelectedTask(null);

    };

    const handleToggleCompleted = (e) => {
        e.stopPropagation(); // Prevents triggering other click events (like handleTaskClick)
        handleTaskToggleCompleted(selectedTaskList.listId, taskId);
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box
                display="flex"
                alignItems='center'
                justifyContent='flex-start'
                boxSizing='border-box'
                padding='0 20px'
                width='90%'
                height='60px'
                backgroundColor={backgroundColor()}
                borderRadius='12px'
                border='2px solid'
                borderColor='cardBackgroundColor.alternate'
                onClick={() => handleTaskClick(task)}
            >
                <Typography
                    variant="h6"
                    sx={{
                        textDecoration: completed ? "line-through" : "none",
                        color: completed ? "textColor.completed" : "textColor.primary",
                    }}
                >{taskName}
                </Typography>
                {selectedTask === task &&
                    <>
                        <Check id={taskId} onClick={handleToggleCompleted} sx={{ color: iconColor(), width: 35, height: 35, ml: 'auto' }} />
                        <RemoveCircleOutline onClick={handleDeleteTask} sx={{ color: iconColor(), width: 35, height: 35 }} />
                    </>
                }

            </Box>


        </div>
    );
}

export default Task;