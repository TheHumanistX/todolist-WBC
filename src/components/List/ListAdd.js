// Import required dependencies and components
import React, { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { TodoContext } from '../../context/TodoContext';

// Define the component
const ListAdd = () => {
    // useContext hook to access global state from the TodoContext
    const { handleListAdd, open, setOpen } = useContext(TodoContext);
    
    // useState hook to manage the state of the new list's title
    const [newListTitle, setNewListTitle] = useState('');

    // Function to handle the text field value change
    const handleTitleChange = (e) => {
        setNewListTitle(e.target.value);
    };

    // Function to handle the closing of the dialog, it also clears the text field
    const handleClose = () => {
        setOpen(false);
        setNewListTitle('');
    };

    // Function to handle the addition of a new list
    const handleAddList = (e) => {
        e.preventDefault(); // prevent the form from refreshing the page
        // Alert the user if the title is empty
        if (newListTitle.trim() === '') {
            alert('List Title cannot be empty');
            return;
        }
        // Add the new list
        handleListAdd({listName: newListTitle});
        // Close the dialog box
        handleClose();
    };

    // The component's returned JSX
    return (
        // Dialog component from Material-UI
        <Dialog open={open} onClose={handleClose}>
            {/* Dialog title */}
            <DialogTitle>Add New Task List</DialogTitle>
            {/* Form for submitting the new list */}
            <form onSubmit={handleAddList}>
                {/* Dialog content */}
                <DialogContent>
                    {/* TextField component from Material-UI for the list's title */}
                    <TextField
                        autoFocus // focuses on the text field when the dialog opens
                        margin="dense"
                        label="List Title" // label of the text field
                        type="text" // input type of the text field
                        fullWidth // makes the text field take the full width of the dialog
                        required // the text field cannot be empty
                        value={newListTitle} // bind the text field's value to the newListTitle state
                        onChange={handleTitleChange} // call handleTitleChange function every time the text field's value changes
                    />
                </DialogContent>
                {/* Dialog actions (buttons) */}
                <DialogActions>
                    {/* Cancel button, closes the dialog when clicked */}
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* Add button, submits the form when clicked */}
                    <Button type="submit">Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

// Export the component to be used in other parts of the application
export default ListAdd
