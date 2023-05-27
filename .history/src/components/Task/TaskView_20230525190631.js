import React from 'react';
import { Typography, Card, IconButton, Divider, TextareaAutosize, Box } from '@mui/material';
import { EditNote } from '@mui/icons-material';

const TaskView = ({ createdDate, dueDate, taskName, description, handleEdit }) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" padding={5} boxSizing='border-box' width='100%'>
      <Typography variant="h6" mb={1}>
        Created: {createdDate}
      </Typography>
      {dueDate && (
                            <Typography variant="h6" mb={1}>
                                Due: {dueDate}
                            </Typography>
                        )}
      </Box>
      <Divider variant="middle" />
      <Typography variant="h2" mb={2} mt={4} textAlign='center'>
        {taskName}
      </Typography>
      <Typography variant="h5" sx={{ ml: '40px' }}>Information</Typography>
      <TextareaAutosize
        minRows={15}
        value={description}
        disabled
        style={{
          width: '600px',
          height: '685px',
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