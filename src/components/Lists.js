import React from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import { AddButton, TaskList } from './';

const Lists = () => {
    const taskLists = [
        { id: 1, name: 'Errands', tasksCompleted: 3, totalTasks: 8, completed: false },
        { id: 2, name: 'Yardwork', tasksCompleted: 1, totalTasks: 5, completed: true },
        { id: 3, name: 'Home Chores', tasksCompleted: 5, totalTasks: 10, completed: false },
    ];

    console.log(taskLists);
    console.log(taskLists.length);
    console.log(taskLists[0]);
    console.log(taskLists[1]);
    console.log(taskLists[2]);
    console.log(taskLists[0].id);

    const taskListsLength = taskLists.length;

    const handleAddList = () => {
        // Handle adding a new task list
        console.log('Add a new task list');
    };

    return (
        <Box
            width="410px"
            height="1155px"
            bgcolor="cardBackgroundColor.main"
            p={2}
            display="flex"
            flexDirection="column"
            borderRadius="22px"
        >
            <Typography variant="h5" mb={2}>
                Lists ({taskListsLength})
            </Typography>

            {taskLists.map((taskList) => {
            console.log('After Map taskList: ', taskList)
               return <TaskList key={taskList.id} taskList={taskList} />
            })}

            <Card variant="plain" onClick={handleAddList} sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <AddButton />
                </CardContent>
            </Card>
        </Box>
    );
};

export default Lists;
