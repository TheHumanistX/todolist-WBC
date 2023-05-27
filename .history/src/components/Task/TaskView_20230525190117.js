import React from 'react';
import { Typography, Card, IconButton, Divider, TextareaAutosize } from '@mui/material';
import { EditNote } from '@mui/icons-material';

const TaskDetailsViewMode = ({ createdDate, taskName, description, handleEdit }) => {
  return (
    <>
      <Typography variant="h6" mb={1}>
        Created: {createdDate}
      </Typography>
      <Divider variant="middle" />
      <Typography variant="h2" mb