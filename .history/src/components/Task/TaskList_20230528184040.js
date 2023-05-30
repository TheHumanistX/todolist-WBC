import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ProgressBar, SmallMenu, VerticalDots, ListEdit } from '../';
import { TodoContext } from '../../context/TodoContext';


const TaskList = ({ taskList }) => {
    const { selectedTaskList, setSelectedTaskList, handleTaskListClick, setCurrentListTitle, handleEditTaskList, handleListDelete } = useContext(TodoContext);

    const [menuAnchorElement , setMenuAnchorElement ] = useState(null);
    console.log('TaskList: ', taskList)
    const { listId, listName, tasks } = taskList;
    
     // Calculate totalTasks and tasksCompleted based on tasks array
    const totalTasks = tasks.length;
    const tasksCompleted = tasks.filter(task => task.completed).length;
    const progress = (tasksCompleted / totalTasks) * 100;
    console.log('listId: ', listId)

    const backgroundColor = () => {
        if (listId % 2 === 0) {
            return 'cardBackgroundColor.main';
        } else {
            return 'cardBackgroundColor.alternate';
        }
    };
    

    const handleClick = (event) => {
        setMenuAnchorElement (event.currentTarget);
      };
    
      const handleClose = () => {
        setMenuAnchorElement (null);
      };
    


    return (
        <div>

            <Box
                boxSizing='border-box'
                border='2px solid'
                padding='20px'
                borderColor='cardBackgroundColor.alternate'
                backgroundColor={backgroundColor()}
                height='auto'
                width='100%'
                borderRadius='12px'
                display='flex'
                alignItems='center'
                onClick={() => handleTaskListClick(taskList)}
            >
                <Box
                    display='flex'
                flexDirection='column'
                flexGrow={1}
                >
                <Typography variant="h5" gutterBottom>{listName}</Typography>
                <Typography variant="body2">{`${tasksCompleted} of ${totalTasks} Tasks Complete`}</Typography>
                <ProgressBar margin='10px 0 0 0' width='80%' progress={progress} />
            </Box>
            <VerticalDots id={listId} onClick={handleClick} 
            sx={{ ml: 'auto' }} />
            
        </Box>
            <SmallMenu menuAnchorElement ={anchorEl} handleClose={handleClose} handleEdit={handleEditTaskList.bind(null, listId)} handleDelete={handleListDelete.bind(null, listId)} />
            <ListEdit />
        </div>


    );
};

export default TaskList;