import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Task, AddButton, CardContainer } from './';

const Tasks = ({ taskList }) => {
    if (!taskList) {
        return (
            <Box
                width="31vw"
                height="100%"
                bgcolor="cardBackgroundColor.main"
                p={2}
                // ml={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRadius='22px'
                boxSizing="border-box"
            >
                <Typography variant="h5" mb={2}>
                    Please select a task list.
                </Typography>
            </Box>
        );
    }
   
    const tasksCompleted = taskList.tasks.filter((task) => task.completed);
    console.log('tasks completed: ', tasksCompleted)
    const tasksOutstanding = taskList.tasks.filter((task) => !task.completed);
    console.log('tasks outstanding: ', tasksOutstanding)

    const handleAddTask = () => {
        // Handle adding a new task
        console.log('Add a new task');
    };

    return (
        <Box
            width="31vw"
            height="100%"
            bgcolor="cardBackgroundColor.main"
            p={2}
            // ml={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderRadius='22px'
            boxSizing="border-box"
        >
            <Typography variant="h5" mb={2}>
                {taskList.listName} Tasks
            </Typography>
            <Typography variant="h6" mb={2}>
            Outstanding ({tasksOutstanding.length}): 
            </Typography>
            {taskList.tasks.map((task) => (
                <Task key={task.taskId} task={task} />
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
