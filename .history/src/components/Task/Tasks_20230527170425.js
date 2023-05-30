import React, { useContext, useRef, useLayoutEffect } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { Task, AddButton, CardContainer } from '../';
import { TodoContext } from '../../context/TodoContext';

const Tasks = ( ) => {
    const { selectedTaskList, setAddTaskMode } = useContext(TodoContext);
    
    const componentRef = useRef(null);

    if (!selectedTaskList) {
        return (
            <CardContainer>
                <Typography variant="h5" mb={2}>
                    Please select a task list.
                </Typography>
            </CardContainer>
        );
    }
    useLayoutEffect(() => {
        if (componentRef.current) {
          const height = componentRef.current.offsetHeight;
          console.log('Box height:', height);
          // You can perform any actions or store the height in state as needed
        }
      }, []);
    const tasksCompleted = selectedTaskList.tasks.filter((task) => task.completed);
    const tasksOutstanding = selectedTaskList.tasks.filter((task) => !task.completed);

    const handleAddTask = () => {
        // Handle adding a new task
        console.log('Selected Task List In Tasks: ', selectedTaskList)
        setAddTaskMode(true);
    };


   

    return (
        <CardContainer className='tempClass'>
            <Box 
            width="100%"
            p={2}
            display="flex"
            flexDirection="column"
            borderRadius="22px"
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box"
            ref={componentRef}
            >
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
