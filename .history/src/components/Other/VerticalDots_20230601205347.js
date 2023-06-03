// Import necessary libraries and components from React and Material-UI.
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

// Define the VerticalDots functional component. It receives the following props: id, onClick.
const VerticalDots = ({ id, onClick }) => {
    // If 'id' is an even number, return 'cardBackgroundColor.alternate', else return 'cardBackgroundColor.main'.
    const vertDotsColor = id % 2 === 0 ? 'cardBackgroundColor.alternate2' : 'cardBackgroundColor.alternate1';

    // Return an IconButton component with the MoreVertIcon as a child.
    return (
        <div>
            <IconButton onClick={onClick}>
                <MoreVertIcon
                    // Apply the color and size styles to the icon.
                    sx={{ color: vertDotsColor, width: 35, height: 35 }}
                />
            </IconButton>
        </div>
    )
}

// Export the VerticalDots component as the default export from this module.
export default VerticalDots
