// Import necessary modules and components.
import React, { useState, useContext } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { ProgressBar, SmallMenu, VerticalDots, ListEdit } from '..';
{ useTheme } from '@mui/material/styles';
import { TodoContext } from '../../context/TodoContext';

// The main functional component of the file.
const TaskList = ({ taskList, theme }) => {
    const theme=useTheme();
    // Using the useContext hook to get necessary values and functions from the TodoContext.
    const { selectedTaskList, setSelectedTaskList, handleTaskListClick, handleEditTaskList, handleListDelete } = useContext(TodoContext);

    // Using useState to store the anchor element for the menu.
    const [menuAnchorElement , setMenuAnchorElement ] = useState(null);

    // Destructuring listId, listName, and tasks from the taskList prop.
    const { listId, listName, tasks } = taskList;
    
    // Calculating the total number of tasks and the number of completed tasks based on the tasks array.
    const totalTasks = tasks.length;
    const tasksCompleted = tasks.filter(task => task.completed).length;
    const progress = totalTasks === 0 ? 0 : (tasksCompleted / totalTasks) * 100;

    // Function to determine the background color based on whether the listId is even or odd.
    const backgroundColor = () => {
        return listId % 2 === 0 ? 'cardBackgroundColor.alternate1' : 'cardBackgroundColor.alternate2';
    };

    const borderColor = () => {
        return listId % 2 === 0 ? 'cardBorderColor.main' : 'cardBorderColor.alternate';
    };
    
    // Function to handle clicks, setting the anchor element for the menu.
    const handleMenuOpen = (event) => {
        setMenuAnchorElement(event.currentTarget);
    };
    
    // Function to handle closing the menu, resetting the anchor element to null.
    const handleMenuClose = () => {
        setMenuAnchorElement(null);
    };

    // The main render function, displaying a Box component with information about the task list.
    return (
        <div>
            <Box
                boxSizing='border-box'
                height='auto'
                width='100%'
                border='2px solid'
                borderColor={borderColor()}
                borderRadius='12px'
                padding='20px'
                backgroundColor={backgroundColor()}
                display='flex'
                alignItems='center'
                onClick={() => handleTaskListClick(taskList)}
            >
                <Stack   
                flexGrow={1}
                >
                    <Typography variant="h5" gutterBottom>{listName}</Typography>
                    <Typography variant="body2">{`${tasksCompleted} of ${totalTasks} Tasks Complete`}</Typography>
                    <ProgressBar margin='10px 0 0 0' width='80%' progress={progress} theme={theme} />
                </Stack>
                <VerticalDots id={listId} onClick={handleMenuOpen} 
                sx={{ ml: 'auto' }} 
            />
            
        </Box>

        {/* This is the SmallMenu component, which takes several props to handle menu actions. */}
        <SmallMenu 
            anchorEl={menuAnchorElement} 
            handleClose={handleMenuClose} 
            handleEdit={handleEditTaskList.bind(null, listId)} 
            handleDelete={handleListDelete.bind(null, listId)} 
        />

        {/* The ListEdit component. Ensure it isn't supposed to receive any props. */}
        <ListEdit />

        </div>
    );
};

// Exporting the TaskList component as the default export.
export default TaskList;
