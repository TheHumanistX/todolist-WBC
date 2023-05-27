import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AddButton, TaskList } from './';

const Lists = ({ taskLists, onTaskListClick }) => {
    

    const taskListsLength = taskLists.length;

    const handleAddList = () => {
        // Handle adding a new task list
        
    };

    return (
        <Box
            width="100%"
            height="100%"
            bgcolor="cardBackgroundColor.main"
            p={2}
            display="flex"
            flexDirection="column"
            borderRadius="22px"
            boxSizing="border-box"
        >
            <Typography variant="h5" mb={2}>
                Lists ({taskListsLength})
            </Typography>

            {taskLists.map((taskList) => {
                console.log('taskList.listId: ', taskList.listId)
               return <TaskList key={taskList.listId} taskList={taskList} onTaskListClick={onTaskListClick} />
            })}

            <Card variant="plain" sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <AddButton onClick={handleAddList}/>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Lists;