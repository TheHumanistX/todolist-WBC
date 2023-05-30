import React, { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { TodoContext } from '../context/TodoContext';

const ListEdit = () => {
    const { openTaskListEdit, handleCloseTaskListEdit, handleListTitleUpdate } = useContext(TodoContext);
    const [newListTitle, setNewListTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!newListTitle || newListTitle.trim() === '') {
            alert('List Title cannot be empty');
            return;
        }

        handleListTitleUpdate(openTaskListEdit.listId, newListTitle);
        setNewListTitle('');
        handleCloseTaskListEdit();
    };

    const handleClose = () => {
        handleCloseTaskListEdit();
    };

    return (
        <Dialog open={openTaskListEdit.open} onClose={handleClose}>
            <DialogTitle>Edit List Title</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="List Title"
                    type="text"
                    fullWidth
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ListEdit;