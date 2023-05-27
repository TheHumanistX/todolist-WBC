import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { Task, AddButton, CardContainer, TaskAdd } from '../';

const Tasks = ({ taskList }) => {
    if (!taskList) {
        return (
            <CardContainer>
                <Typography variant="h5" mb={2}>
                    Please select a task list.
                </Typography>
            </CardContainer>
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
        <CardContainer>
            <Typography variant="h5" mb={2}>
                {taskList.listName} Tasks
            </Typography>
            <Typography variant="h6" mb={2}>
                Outstanding ({tasksOutstanding.length}):
            </Typography>
            {taskList && taskList.tasks.map((task) => (
                <Task key={task.taskId} task={task} />
            ))}

            <Card variant="plain" sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <AddButton onClick={handleAddTask} />
                </CardContent>
            </Card>
        </CardContainer>
    );
};

export default Tasks;
