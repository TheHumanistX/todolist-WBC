import React, { useContext, eseEffect } from 'react';
import { Typography, Card, IconButton, Divider, TextareaAutosize, Box } from '@mui/material';
import { EditNote } from '@mui/icons-material';
import { TodoContext } from '../../context/TodoContext';

const TaskView = () => {

  const { handleEdit, selectedTask } = useContext(TodoContext);

  useEffect(() => {
    console.log('Selected task:', selectedTask);
  }, [selectedTask]);
  
  return (
    <>
      <Box display="flex" justifyContent="space-between" padding={5} boxSizing='border-box' width='100%'>
      <Typography variant="h6" mb={1}>
        Created: {selectedTask.createdDate}
      </Typography>
      {selectedTask.dueDate && (
                            <Typography variant="h6" mb={1}>
                                Due: {selectedTask.dueDate}
                            </Typography>
                        )}
      </Box>
      <Divider variant="middle" width='80%' />
      <Typography variant="h2" mb={2} mt={4} textAlign='center'>
        {selectedTask.taskName}
      </Typography>
      <Typography variant="h5" sx={{ ml: '40px' }}>Information</Typography>
      <TextareaAutosize
        minRows={15}
        value={selectedTask.description}
        disabled
        style={{
          width: '80%',
          height: '50%',
          borderRadius: '12px',
          borderColor: 'backgroundColor.default',
          resize: 'none',
          margin: 'auto',
          padding: '12px',
        }}
      />
      <Card
        variant="plain"
        sx={{ mt: 'auto', ml: 'auto', backgroundColor: 'cardBackgroundColor.main' }}
      >
        <IconButton onClick={handleEdit}>
          <EditNote sx={{ color: 'buttonColor.main', width: 45, height: 45 }} />
        </IconButton>
      </Card>
    </>
  );
};

export default TaskView;