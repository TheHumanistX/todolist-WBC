// Import necessary libraries and components.
import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { RemoveCircleOutline, Check } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { TodoContext } from '../../context/TodoContext';

// Define the Task component.
const Task = ({ task }) => {
  const theme=useTheme();
  // Destructure the properties of task and context.
  const { taskId, taskName, completed } = task;
  const {
    selectedTask,
    setSelectedTask,
    selectedTaskList,
    handleTaskDelete,
    handleTaskToggleCompleted,
  } = useContext(TodoContext);

  // Helper function to decide the background color based on taskId.
  const backgroundColor = () =>
    taskId % 2 === 0 ? 'cardBackgroundColor.alternate1' : 'cardBackgroundColor.alternate2';

  // Helper function to decide the icon color based on taskId.
  const iconColor = () =>
    taskId % 2 === 0 ? 'cardBackgroundColor.alternate2' : 'cardBackgroundColor.alternate1';
  // Helper function to decide the border color based on taskId.
  const borderColor = () =>
    taskId % 2 === 0 ? 'cardBorderColor.main' : 'cardBorderColor.alternate';
  
  // Set selectedTask to null.
  const setSelectedTaskNull = () => setSelectedTask(null);

  // Handler for task click.
  const handleTaskClick = () => setSelectedTask(task);

  // Handler for delete task.
  const handleDeleteTask = () => {
    setSelectedTask(task);
    handleTaskDelete(selectedTaskList.listId, task.taskId);
    setSelectedTaskNull();
  };

  // Handler for toggle completed.
  const handleToggleCompleted = (e) => {
    e.stopPropagation();
    handleTaskToggleCompleted(selectedTaskList.listId, taskId);
  };

  // The style for the icons.
  const iconStyle = { color: iconColor(), width: 35, height: 35 };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box 
      display= 'flex'
      alignItems= 'center'
      justifyContent= 'flex-start'
      boxSizing= 'border-box'
      padding= '0 20px'
      width= '90%'
      height= '60px'
      backgroundColor= {backgroundColor()}
      borderRadius= '12px'
      border= '2px solid'
      borderColor= {borderColor()}
      onClick={handleTaskClick}>
        <Typography variant="h6" sx={{
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? 'textColor.completed' : 'textColor.primary',
        }}
        style={{ color: theme.palette.textColor.primary }}>{taskName}</Typography>
        {selectedTask === task && (
          <>
            <Check id={taskId} onClick={handleToggleCompleted} sx={{ ...iconStyle, ml: 'auto' }} />
            <RemoveCircleOutline onClick={handleDeleteTask} sx={iconStyle} />
          </>
        )}
      </Box>
    </div>
  );
}

export default Task;
