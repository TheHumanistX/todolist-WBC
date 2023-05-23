import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ProgressBar, SmallMenu } from './';

const TaskList = ({ taskList }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    console.log('TaskList: ', taskList)
    const { id, name, tasksCompleted, totalTasks } = taskList;
    const progress = (tasksCompleted / totalTasks) * 100;

    // Create a function that will set the background color of the Box dependent on wheter the 'id' is even or odd
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
    
    const handleClose = () => { setAnchorEl(null); };

    return (
        <div>

            <Box
                boxSizing='border-box'
                border='2px solid'
                padding='10px'
                borderColor='cardBackgroundColor.alternate'
                backgroundColor= {backgroundColor()}
                height='115px'
                width='380px'
                borderRadius='12px'
            >
                <Box display="flex" justifyContent="space-between" height='60%'>
                    <Typography variant="h6">{name}</Typography>
                    <IconButton onClick={handleClick}>
                        <MoreVertIcon style={{ position: "absolute", top: "60%" }} />
                    </IconButton>
                </Box>
                <Typography variant="body2">{`${tasksCompleted} of ${totalTasks} Tasks Complete`}</Typography>
                <ProgressBar margin='10px 0 0 0' width='80%' progress={progress} />
            </Box>
            <SmallMenu anchorEl={anchorEl} handleClose={handleClose} />
        </div>


    );
};

export default TaskList;