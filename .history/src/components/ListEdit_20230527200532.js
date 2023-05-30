import React, { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { TodoContext } from '../context/TodoContext';

const ListEdit = () => {
    const { selectedTaskList, handleListUpdate, listEdit, setListEdit } = useContext(TodoContext);
    
    const [updatedListTitle, setUpdatedListTitle] = useState('');

    const handleClose = () => {
        setListEdit(false);
        setUpdatedListTitle(''); // clear the text field on close
    };

    const handleUpdateList = () => {
        if (updatedListTitle.trim() === '') {
            alert('List Title cannot be empty');
            return;
        }
        handleListUpdate({listName: updatedListTitle});
        handleClose(); // close the dialog box
    };


  return (
    <Dialog open={listEdit} onClose={handleClose}>
                <DialogTitle>Add New Task List</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="List Title"
                    type="text"
                    fullWidth
                    value={updatedListTitle}
                    onChange={(e) => setUpdatedListTitle(e.target.value)} 
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleUpdateList}>Update</Button>
                    </DialogActions>
                </Dialog>
            
  )

}

export default ListEdit
