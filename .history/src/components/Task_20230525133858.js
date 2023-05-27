import React, { useState, useContext} from 'react';
import { Box, Typography } from '@mui/material';
import { TodoContext } from '../context/TodoContext';
import { SmallMenu, VerticalDots } from './';

const Task = ({ task }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { taskId, taskName, dueDate, completed, description } = task;
    const { selectedTask, setSelectedTask } = useContext(TodoContext);
    const backgroundColor = () => {
        if (taskId % 2 === 0) {
            return 'cardBackgroundColor.main';
        } else {
            return 'cardBackgroundColor.alternate';
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
      };

    return (
        <div>
            <Box
                display="flex"
                alignItems='center'
                justifyContent='space-between'
                boxSizing='border-box'
                padding='0 20px'
                width='600px'
                height='60px'
                backgroundColor={backgroundColor()}
                borderRadius='12px'
                border='2px solid'
                borderColor='cardBackgroundColor.alternate'
                onClick = {() => handleTaskClick(task)}
            >
                <Typography
                    variant="h6"
                    sx={{
                        textDecoration: completed ? "line-through" : "none",
                        color: completed ? "textColor.completed" : "textColor.primary",
                    }}
                >{taskName}
                </Typography>

                <VerticalDots id={taskId} onClick={handleClick} />

            </Box>
            <SmallMenu anchorEl={anchorEl} handleClose={handleClose} />

        </div>
    );
}

export default Task;
