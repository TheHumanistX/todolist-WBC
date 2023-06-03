// Import necessary libraries and components from React and Material-UI.
import React from 'react';
import { LinearProgress } from '@mui/material';

// Define the ProgressBar functional component. It receives the following props: progress, width, margin, padding.
const ProgressBar = ({ progress, width, margin, padding, theme }) => {
  // The component renders a LinearProgress element, a Material-UI component used to display progress bars.
  return (
    <LinearProgress
      // The 'variant' prop is set to 'determinate', which means the progress bar will show an exact percentage of completion, provided by the 'value' prop.
      variant="determinate"
      value={progress}
      // The 'sx' prop is used here to apply styling directly to the component.
      sx={{
        height: '10px', // Set the height of the progress bar.
        width: width || '50%', // Set the width of the progress bar. Default value is '50%'.
        margin: margin || '0px', // Set the margin of the progress bar. Default value is '0px'.
        padding: padding || '0px', // Set the padding of the progress bar. Default value is '0px'.
        borderRadius: '25px', // Round the ends of the progress bar.
        border: '1px solid', // Add a border to the progress bar.
        borderColor: 'theme.palette.progressBar.stroke', // Set the color of the border.
        bgcolor: 'theme.palette.progressBar.empty', // Set the background color of the progress bar.
        // Target the filled portion of the progress bar (with class '.MuiLinearProgress-bar') to apply specific styles.
        '& .MuiLinearProgress-bar': {
          bgcolor: 'theme.palette.progressBar.fill', // Set the filled bar color.
        },
      }}
    />
  );
};

// Export the ProgressBar component as the default export from this module.
export default ProgressBar;
