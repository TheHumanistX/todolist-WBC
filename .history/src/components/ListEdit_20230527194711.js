import React, { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { TodoContext } from '../context/TodoContext';

const ListEdit = () => {
    const { selectedTaskList, handleListUpdate, open, setOpen } = useContext(TodoContext);
    
    const [updatedListTitle, setUpdatedListTitle] = useState('');

    const handleClose = () => {
        setOpen(false);
        setUpdatedListTitle(''); // clear the text field on close
    };

    const handleAddList = () => {
        if (newListTitle.trim() === '') {
            alert('List Title cannot be empty');
            return;
        }
        handleListUpdate({listName: updatedListTitle});
        handleClose(); // close the dialog box
    };


  return (
    <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Task List</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="List Title"
                    type="text"
                    fullWidth
                    value={newListTitle}
                    onChange={(e) => setUpdatedListTitle(e.target.value)} 
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleAddList}>Add</Button>
                    </DialogActions>
                </Dialog>
            
  )

}

export default ListEdit
