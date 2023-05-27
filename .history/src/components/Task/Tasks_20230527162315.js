import React, { useContext } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { Task, AddButton, CardContainer } from '../';
import { TodoContext } from '../../context/TodoContext';

const Tasks = ( ) => {
    const { selectedTaskList, setAddTaskMode } = useContext(TodoContext);
 
    if (!selectedTaskList) {
        return (
            <CardContainer>
                <Typography variant="h5" mb={2}>
                    Please select a task list.
                </Typography>
            </CardContainer>
        );
    }

    const tasksCompleted = selectedTaskList.tasks.filter((task) => task.completed);
    const tasksOutstanding = selectedTaskList.tasks.filter((task) => !task.completed);

    const handleAddTask = () => {
        // Handle adding a new task
        console.log('Selected Task List In Tasks: ', selectedTaskList)
        setAddTaskMode(true);
    };

    return (
        <CardContainer>
            <Box>
            <Typography variant="h5" mb={2}>
                {selectedTaskList.listName} Tasks
            </Typography>
            <Typography variant="h6" mb={2}>
                Outstanding ({tasksOutstanding.length}):
            </Typography>
            {selectedTaskList && selectedTaskList.tasks.map((task) => (
                <Task key={task.taskId} task={task} />
            ))}
            </Box>
            <Card variant="plain" sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <AddButton onClick={() => handleAddTask()} />
                </CardContent>
            </Card>
        </CardContainer>
    );
};

export default Tasks;
