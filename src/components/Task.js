import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { SmallMenu, VerticalDots } from './';

const Task = ({ task }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { id, title, completed } = task;

    const backgroundColor = () => {
        if (id % 2 === 0) {
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
                >{title}
                </Typography>

                <VerticalDots id={id} onClick={handleClick} />

            </Box>
            <SmallMenu anchorEl={anchorEl} handleClose={handleClose} />

        </div>
    );
}

export default Task;
