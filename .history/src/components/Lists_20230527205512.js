import React, { useContext, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AddButton, TaskList, ListAdd, ListEdit } from './';
import { TodoContext } from '../context/TodoContext';

const Lists = () => {

    const {taskLists, setOpen} = useContext(TodoContext);
    const taskListsLength = taskLists.length;

    useEffect(() => {
        console.log("TaskLists:", taskLists);
        console.log("Type of TaskLists:", typeof taskLists);
      }, [taskLists]);

      const renderTaskLists = () => {
        if (Array.isArray(taskLists)) {
          return taskLists.map((taskList) => {
            console.log("taskList.listId: ", taskList.listId);
            return <TaskList key={taskList.listId} taskList={taskList} />;
          });
        } else {
          console.error("taskLists is not an array:", taskLists);
          return null;
        }
      };

    const handleAddList = () => {
        // Handle adding a new task list

    };

    const handleClickOpen = () => {
        setOpen(true);
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
                Lists ({taskLists.length})
            </Typography>
            {renderTaskLists()}
            {taskLists.map((taskList) => {
                console.log('taskList.listId: ', taskList.listId)
               return <TaskList key={taskList.listId} taskList={taskList} />
            })}

            <Card variant="plain" sx={{ backgroundColor: 'cardBackgroundColor.main', mt: 'auto', ml: 'auto' }}>
                <CardContent>
                    <AddButton onClick={handleClickOpen}/>
                </CardContent>
            </Card>
            <ListAdd />
            <ListEdit />

        </Box>
    );
};

export default Lists;