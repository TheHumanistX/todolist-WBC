import React, { useContext, useState, useEffect } from "react";
   import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
   import { TodoContext } from "../context/TodoContext";
   
   const ListEdit = () => {
     const { currentListTitle, setCurrentListTitle, handleListTitleUpdate, selectedTaskList } = useContext(TodoContext
        );
    
        const [newListTitle, setNewListTitle] = useState(currentListTitle || '');
        const [editModalOpen, setEditModalOpen] = useState(false);
    
        const handleClickOpen = () => {
          setEditModalOpen(true);
        };
    
        const handleClose = () => {
          setEditModalOpen(false);
        };
    
        const handleSubmit = (event) => {
          event.preventDefault();
    
          if (!newListTitle || newListTitle.trim() === "") {
            alert("List Title cannot be empty");
            return;
          }
    
          handleListTitleUpdate(selectedTaskList.listId, newListTitle);
          setNewListTitle('');
          setCurrentListTitle(null);
          setEditModalOpen(false);
        };
    
        useEffect(() => {
          setNewListTitle(currentListTitle);
          handleClickOpen();
        }, [currentListTitle]);
    
        return (
          <Dialog open={editModalOpen} onClose={handleClose}>
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