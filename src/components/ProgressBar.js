import React from 'react';
import { LinearProgress } from '@mui/material';

const ProgressBar = ({ progress, width, margin, padding }) => {

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        height: '10px', // Adjust height
        width: width || '50%', // Adjust width
        margin: margin || '0px', // Adjust margin
        padding: padding || '0px', // Adjust padding
        borderRadius: '25px', // Round the ends 
        border: '1px solid', // Add a border
        borderColor: 'cardBackgroundColor.alternate', // Adjust the border color   
        bgcolor: 'cardBackgroundColor.main', // Adjust the background color
        '& .MuiLinearProgress-bar': {
          bgcolor: 'backgroundColor.default', // Adjust the filled bar color
        },
      }}
    />
  );
};

export default ProgressBar;