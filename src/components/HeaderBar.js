import React from 'react';
import { Typography, Box } from '@mui/material';
import { format, getMonth } from 'date-fns';

const HeaderBar = ({ currentTaskListName, tasksCompleted, totalTasks }) => {
    const currentMonth = getMonth(new Date());
    // We don't want a period after May because it won't abbreviate may since it is already 3 letters long.
    const currentDate = currentMonth === 4 ? format(new Date(), 'MMM do, yyyy') : format(new Date(), 'MMM. do, yyyy');

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} width='680px' height='50px' padding="0px 30px" borderRadius='25px'  bgcolor='cardBackgroundColor.main' margin='20px 0'>
            <Typography variant="h6">{`List: ${currentTaskListName}`}</Typography>
            <Typography variant="h6">{`Tasks Completed: ${tasksCompleted} of ${totalTasks}`}</Typography>
            <Typography variant="h6">{`Date: ${currentDate}`}</Typography>
        </Box>
    );
};

export default HeaderBar;