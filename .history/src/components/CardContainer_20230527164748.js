import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const componentRef = useRef(null);


useEffect(() => {
  if (componentRef.current) {
    const height = componentRef.current.offsetHeight;
    console.log('Component height:', height);
    // You can perform any actions or store the height in state as needed
  }
}, []);

const CardContainer = ({ children }) => {
  return (
    <Box
      width="31vw"
      height="100%"
      bgcolor="cardBackgroundColor.main"
      p={2}
      display="flex"
      flexDirection="column"
      borderRadius="22px"
      justifyContent="center"
      alignItems="center"
      boxSizing="border-box"
    >
      {children}
    </Box>
  );
};

export default CardContainer;