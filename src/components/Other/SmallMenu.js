// Import necessary libraries and components from React and Material-UI.
import React, { useContext } from 'react'
import { Menu, MenuItem } from '@mui/material'

// Import the context we need.
import { TodoContext } from '../../context/TodoContext'

// Define the SmallMenu functional component. It receives the following props: anchorEl, handleClose, handleEdit, handleDelete.
const SmallMenu = ({ anchorEl, handleClose, handleEdit, handleDelete }) => {
    // Use the useContext hook to access the setListEdit function from our context.
    const { setListEdit } = useContext(TodoContext);

    // This function will be called when the 'Edit' menu item is clicked. It calls the handleEdit function passed as a prop, and then it closes the menu.
    const handleEditClick = () => {
        handleEdit();
        handleClose();
    };

    // This function will be called when the 'Delete' menu item is clicked. It calls the handleDelete function passed as a prop, and then it closes the menu.
    const handleDeleteClick = () => {
        handleDelete();
        handleClose();
    };

    // Return a React Fragment
    return (
        <>
            <Menu
                // The 'anchorEl' prop defines the DOM element that the menu is positioned relative to.
                anchorEl={anchorEl}
                // If 'anchorEl' is defined (i.e., it's not null), then 'open' is true and the menu is visible. If 'anchorEl' is null, then 'open' is false and the menu is hidden.
                open={Boolean(anchorEl)}
                // The 'onClose' prop specifies a function to be called when the menu is closed.
                onClose={handleClose}
            >   
                {/* This menu item calls 'handleEditClick' when clicked. */}
                <MenuItem onClick={handleEditClick}>Edit</MenuItem> 
                {/* This menu item calls 'handleDeleteClick' when clicked. */}
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem> 
            </Menu>
        </>
    )
}

// Export the SmallMenu component as the default export from this module.
export default SmallMenu
