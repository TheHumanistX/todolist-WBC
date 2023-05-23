import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';

const AddButton = ({ onClick, size = 'large', color, style }) => {
  const theme = useTheme();
  const buttonColor = color || theme.palette.buttonColor.main;

  return (
    <IconButton
      onClick={onClick}
      style={{ color: buttonColor, ...style }}
    >
      <AddCircleIcon 
      onClick={onClick}
      style={{ color: buttonColor, ...style }}
      fontSize={size}
      />
    </IconButton>
  );
};

export default AddButton;
