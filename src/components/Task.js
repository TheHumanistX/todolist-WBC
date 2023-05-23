import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SmallMenu } from './';

const Task = ({ task }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { id, name, completed } = task;

    const backgroundColor = () => {
        if (id % 2 === 0) {
            console.log('Even', id % 2)
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
            >
                <Typography 
                variant="h6"
                sx={{
                    textDecoration: completed ? "line-through" : "none",
                    color: completed ? "textColor.completed" : "textColor.primary",
                }}
                >{name}
                </Typography>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <SmallMenu anchorEl={anchorEl} handleClose={handleClose} />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    );
}

export default Task;
