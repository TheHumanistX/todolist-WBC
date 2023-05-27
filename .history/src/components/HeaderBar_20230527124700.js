import React, { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { format, getMonth } from 'date-fns';
import { TodoContext } from '../context/TodoContext';

const HeaderBar = ({ taskList }) => {
    const { selectedTaskList } = useContext(TodoContext);
    const currentMonth = getMonth(new Date());
    // We don't want a period after May because it won't abbreviate may since it is already 3 letters long.
    const currentDate = currentMonth === 4 ? format(new Date(), 'MMM do, yyyy') : format(new Date(), 'MMM. do, yyyy');
    const { listId, listName, tasks } = selectedTaskList || {};
    const tasksCompleted = selectedTaskList ? tasks.filter((task) => task.completed).length : null;
    const totalTasks = selectedTaskList ? tasks.length : null;
    return (
        
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} width='100%' height='50px' padding="0px 30px" borderRadius='25px'  bgcolor='cardBackgroundColor.main' >
            
            <Typography variant="h6">{`List: ${ selectedTaskList ? listName : ""}`}</Typography>
            <Typography variant="h6">Tasks Completed: {selectedTaskList ? `${tasksCompleted} of ${totalTasks}` : ""}</Typography>
            <Typography variant="h6">{`Date: ${currentDate}`}</Typography>
            
        </Box>
    );
};

export default HeaderBar;