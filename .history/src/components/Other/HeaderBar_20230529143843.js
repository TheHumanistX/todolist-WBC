// Import React, Material UI components and hooks, date-fns functions for date manipulation, and TodoContext.
import React, { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { format, getMonth } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { TodoContext } from '../../context/TodoContext';

// This functional component is used to display a header bar with the task list name, tasks completed, and the current date.
const HeaderBar = ({ taskList }) => {
    // Using the useContext hook to get the currently selected task list from the TodoContext.
    const { selectedTaskList } = useContext(TodoContext);
    
    // Using date-fns to get the current month (0-based index, so May is 4).
    const currentMonth = getMonth(new Date());
    
    // Formatting the current date as a string. If the current month is May (which is 3 letters long and therefore doesn't need an abbreviation),
    // don't put a period after the month abbreviation.
    const currentDate = currentMonth === 4 
        ? format(utcToZonedTime(new Date(), 'UTC'), 'MMM do, yyyy') 
        : format(utcToZonedTime(new Date(), 'UTC'), 'MMM. do, yyyy');

    // Using destructuring to get the listId, listName, and tasks from the selectedTaskList, or setting these values to undefined if selectedTaskList is null.
    const { listId, listName, tasks } = selectedTaskList || {};

    // Counting the number of completed tasks, or setting it to null if selectedTaskList is null.
    const tasksCompleted = selectedTaskList ? tasks.filter((task) => task.completed).length : null;

    // Counting the total number of tasks, or setting it to null if selectedTaskList is null.
    const totalTasks = selectedTaskList ? tasks.length : null;

    // Rendering the header bar using Material UI components.
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} width='100%' height='50px' padding="0px 30px" borderRadius='25px'  bgcolor='cardBackgroundColor.main' >
            <Typography variant="h6">{`List: ${ selectedTaskList ? listName : ""}`}</Typography>
            <Typography variant="h6">Tasks Completed: {selectedTaskList ? `${tasksCompleted} of ${totalTasks}` : ""}</Typography>
            <Typography variant="h6">{`Date: ${currentDate}`}</Typography>
        </Box>
    );
};

// Exporting the HeaderBar component as the default export.
export default HeaderBar;
