// Import necessary modules from React, Material UI and the TodoContext.
import React, { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Snackbar } from '@mui/material';
import { TodoContext } from '../../context/TodoContext';

// This is the main functional component of the file.
const ListEdit = () => {
    // These hooks are grabbing necessary values and functions from the TodoContext. 
    // openTaskListEdit: the task list that is currently being edited.
    // handleCloseTaskListEdit: function to close the task list editor.
    // handleListTitleUpdate: function to update the title of the task list.
    const { openTaskListEdit, handleCloseTaskListEdit, handleListTitleUpdate } = useContext(TodoContext);

    // Local state to manage the new title of the list being edited.
    const [newListTitle, setNewListTitle] = useState('');

    // Local state to manage when the error message Snackbar should be shown (when the list title is empty).
    const [errorOpen, setErrorOpen] = useState(false);

    // Function to handle the form submission event. 
    const handleSubmit = (event) => {
        // This prevents the default form submission event which causes a page reload.
        event.preventDefault();

        // If the newListTitle is empty, setErrorOpen to true and return to stop the function execution.
        if (!newListTitle || newListTitle.trim() === '') {
            setErrorOpen(true);
            return;
        }

        // Call the function from TodoContext to update the list title with the listId and the new title.
        handleListTitleUpdate(openTaskListEdit.listId, newListTitle);

        // Clear the input field for the list title and close the dialog.
        setNewListTitle('');
        handleCloseTaskListEdit();
    };

    // The JSX to be rendered by the component.
    return (
        // The Dialog component for editing the list title.
        <Dialog open={openTaskListEdit.open} onClose={handleCloseTaskListEdit}>
            <DialogTitle>Edit List Title</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                     {/* TextField for the new list title. */}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="List Title"
                        type="text"
                        fullWidth
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                    />
                     {/* Snackbar for the error message when the list title is empty. */}
                    <Snackbar
                        open={errorOpen}
                        autoHideDuration={6000}
                        onClose={() => setErrorOpen(false)}
                        message="List Title cannot be empty"
                    />
                </DialogContent>
                <DialogActions>
                     {/* Save button to submit the form. */}
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                     {/* Cancel button to close the dialog without saving. */}
                    <Button onClick={handleCloseTaskListEdit} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

// Exporting the ListEdit component as the default export.
export default ListEdit;
