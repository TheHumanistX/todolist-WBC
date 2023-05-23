import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Task, AddButton } from './';

const Tasks = ({ taskList }) => {
    if (!taskList) {
        return (
            <Box
                width="680px"
                height="80%"
                bgcolor="cardBackgroundColor.main"
                p={2}
                // ml={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRadius='22px'
            >
                <Typography variant="h5" mb={2}>
                    Please select a task list.
                </Typography>
            </Box>
        );
    }
    const tasks = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
        { id: 3, title: 'Task 3', completed: false },
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
            height="100%"
            bgcolor="cardBackgroundColor.main"
            p={2}
            // ml={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderRadius='22px'
        >
            <Typography variant="h5" mb={2}>
                {taskList.listName} Tasks
            </Typography>
            <Typography variant="h6" mb={2}>
            Outstanding ({tasksOutstanding.length}): 
            </Typography>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}

            <Card variant="plain" sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <AddButton onClick={handleAddTask} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default Tasks;
