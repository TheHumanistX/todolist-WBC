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
      overflow="auto"
      style={{ maxHeight: '100%' }}
    >
      {children}
    </Box>
  );
};

export default CardContainer;