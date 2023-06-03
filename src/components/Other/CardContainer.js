// Import necessary libraries and components from React and Material-UI.
import React from 'react';
import { Stack } from '@mui/material';

// Define the CardContainer functional component. It takes a 'children' prop, which represents any child elements that will be nested inside of this component.
const CardContainer = ({ children }) => {
  // The component renders a Stack element. A Stack is a Material-UI component that allows for easy vertical and horizontal layout.
  return (
    <Stack
      // Setting various style attributes for the Stack. These include width, height, background color, padding, border radius, and box sizing.
      width="31vw"
      height="100%"
      bgcolor="cardBackgroundColor.main"
      p={2}
      borderRadius="22px"
      justifyContent="center"
      alignItems="center"
      boxSizing="border-box"
    >
      {/* Render the child elements inside the Stack. This is where the 'children' prop is used. */}
      {children}
    </Stack>
  );
};

// Export the CardContainer component as the default export from this module.
export default CardContainer;
