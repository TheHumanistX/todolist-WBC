import React, { useState, useContext} from 'react';
import { Box, Typography } from '@mui/material';
import { RemoveCircleOutline, Check } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';
import { SmallMenu, VerticalDots } from '../';


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

    
        const iconColor = () => {
            if (taskId % 2 === 0) {
                return 'cardBackgroundColor.alternate';
            } else {
                return 'cardBackgroundColor.main';
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
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
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
                <RemoveCircleOutline id={taskId} sx={{ color: iconColor(), width: 45, height: 45, ml:'auto'}} />
                <Check id={taskId} sx={{ color: iconColor(), width: 45, height: 45 }} />
                

            </Box>
            

        </div>
    );
}

export default Task;