import React, { useContext, useRef, useLayoutEffect} from 'react';
import { Box } from '@mui/material';
import { TodoContext } from '../context/TodoContext';

const CardContainer = ({ children }) => {
  const {setInitialCardHeight} = children;
  const componentRef = useRef(null);
  let height;
  useLayoutEffect(() => {
    if (componentRef.current) {
      height = componentRef.current.offsetHeight;
      setInitialCardHeight(height);
      console.log('Component height:', height);
      // You can perform any actions or store the height in state as needed
    }
  }, []);
 
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