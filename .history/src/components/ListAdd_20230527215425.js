import React, { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { TodoContext } from '../context/TodoContext';

const ListAdd = () => {
    const { taskLists, handleTaskListClick, handleListAdd, open, setOpen } = useContext(TodoContext);
    
    const [newListTitle, setNewListTitle] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewListTitle(''); // clear the text field on close
    };

    const handleAddList = () => {
        if (newListTitle.trim() === '') {
            alert('List Title cannot be empty');
            return;
        }
        handleListAdd({listName: newListTitle});
        handleClose(); // close the dialog box
    };


  return (
    <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Task List</DialogTitle>
                <form onSubmit={handleSubmit}>

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
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleAddList}>Add</Button>
                    </DialogActions>
                    </form>
                </Dialog>
            
  )
}

export default ListAdd
