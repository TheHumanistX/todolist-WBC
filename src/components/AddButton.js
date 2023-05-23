import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddButton = ({ onClick }) => {

  return (
    <IconButton
      onClick={onClick}
    >
      <AddCircleIcon 
      sx={{ color: 'buttonColor.main' }}
      fontSize='large'
      />
    </IconButton>
  );
};

export default AddButton;
