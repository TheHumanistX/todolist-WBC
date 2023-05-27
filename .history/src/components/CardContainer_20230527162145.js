import React from 'react';
import { Box } from '@mui/material';

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
      style={{ overflowY:'auto', maxHeight: '50vh' }}
    >
      {children}
    </Box>
  );
};

export default CardContainer;