// Import the necessary libraries and components from React and Material-UI
import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// This is the AddButton functional component. It takes a prop 'onClick' which is a function to be executed when the button is clicked.
const AddButton = ({ onClick }) => {
  // The component returns an IconButton. 
  return (
    <IconButton
      // The onClick event handler is set to the onClick prop passed to this component.
      onClick={onClick}
    >
       {/* 
       Inside the IconButton, we use the AddCircleIcon component from Material-UI. 
       The 'sx' prop is used to apply styling. In this case, it sets the color of the button.
       The fontSize prop sets the size of the icon to 'large'. 
       */}
      <AddCircleIcon 
      // Use `sx` here because we are referring to a theme property
        sx={{ color: 'button.main' }}
        // Use `fontSize` here because the icon size does not change with the font size in the theme
        fontSize='large'
      />
    </IconButton>
  );
};

// Export the AddButton component as the default export from this module.
export default AddButton;
