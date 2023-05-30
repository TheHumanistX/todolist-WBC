import React, { useContext, useRef, useLayoutEffect} from 'react';
import { Box } from '@mui/material';
import { TodoContext } from '../context/TodoContext';

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