import React from 'react';
import { Typography, Card, IconButton, Divider, TextareaAutosize } from '@mui/material';
import { EditNote } from '@mui/icons-material';

const TaskView = ({ createdDate, taskName, description, handleEdit }) => {
  return (
    <>
      <Typography variant="h6" mb={1}>
        Created: {createdDate}
      </Typography>
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