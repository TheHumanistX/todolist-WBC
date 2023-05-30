import React, { useRef, useLayoutEffect} from 'react';
import { Box } from '@mui/material';

const CardContainer = ({ children, onHeightChange }) => {

  const componentRef = useRef(null);
  let height;
  useLayoutEffect(() => {
    if (componentRef.current) {
      height = componentRef.current.offsetHeight;
      
      console.log('Component height:', height);
      // You can perform any actions or store the height in state as needed
    }
  }, []);
  onHeightChange(height); 
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
      ref={componentRef}
    >
      {children}
    </Box>
  );
};

export default CardContainer;