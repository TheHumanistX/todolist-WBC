import React from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import { Task, AddButton } from './';

const Tasks = ({ taskList }) => {
    const tasks = [
        { id: 1, name: 'Task 1', completed: false },
        { id: 2, name: 'Task 2', completed: true },
        { id: 3, name: 'Task 3', completed: false },
    ];
    const tasksCompleted = tasks.filter((task) => task.completed);
    console.log('tasks completed: ', tasksCompleted)
    const tasksOutstanding = tasks.filter((task) => !task.completed);
    console.log('tasks outstanding: ', tasksOutstanding)

    const handleAddTask = () => {
        // Handle adding a new task
        console.log('Add a new task');
    };

    return (
        <Box
            width="680px"
            height="1060px"
            bgcolor="cardBackgroundColor.main"
            p={2}
            // ml={2}
            display="flex"
            flexDirection="column"
            borderRadius='22px'
        >
            <Typography variant="h5" mb={2}>
                {taskList.name} Tasks
            </Typography>
            <Typography variant="h6" mb={2}>
            Outstanding ({tasksOutstanding.length}): 
            </Typography>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
            
            <Card variant="plain" onClick={handleAddTask} sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <AddButton />
                </CardContent>
            </Card>
        </Box>
    );
};

export default Tasks;
