// Import necessary modules from React, Material UI, and TodoContext, along with other components.
import React, { useContext } from 'react';
import { Typography, Card, CardContent, Stack, IconButton } from '@mui/material';
import { AddButton, TaskList, ListAdd, ListEdit } from '../';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { TodoContext } from '../../context/TodoContext';

// This is the main functional component of the file.
const Lists = ({ toggleColorMode, themeMode }) => {
    const theme=useTheme();
    // Using the useContext hook to get the task lists and setOpen function from the TodoContext.
    const { taskLists, setOpen } = useContext(TodoContext);

    // Getting the length of the task lists.
    const taskListsLength = taskLists.length;

    // This component displays a Box that contains a list of TaskList components, and AddButton, ListAdd, and ListEdit components.
    return (
        <Stack
            width="100%"
            height="100%"
            bgcolor="cardBackgroundColor.main"
            p={2}
            borderRadius="22px"
            boxSizing="border-box"
        >
            {/* This Typography component displays the title "Lists" and the number of task lists. */}
            <Typography variant="h5" mb={2}>
                Lists ({taskListsLength})
            </Typography>

            {/* This block maps over the taskLists array and creates a TaskList component for each task list. */}
            {taskLists.map((taskList) => {
                return <TaskList key={taskList.listId} taskList={taskList} theme={themeMode} />
            })}

            {/* This Card component contains an AddButton component. The button calls the setOpen function from TodoContext when clicked. */}
            <Card variant="plain" sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <IconButton onClick={toggleColorMode} color="inherit" sx={{ position: 'absolute', bottom: 0, left: 0 }}>
                        {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <AddButton onClick={() => setOpen(true)} />
                </CardContent>
            </Card>

            {/* These are the ListAdd and ListEdit components. */}
            <ListAdd />
            <ListEdit />

        </Stack>
    );
};

// Exporting the Lists component as the default export.
export default Lists;
