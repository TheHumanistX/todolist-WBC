import React, { useState, useContext } from 'react'
import { Menu, MenuItem } from '@mui/material'

import { TodoContext } from '../context/TodoContext'

const SmallMenu = ({ anchorEl, handleClose, handleEdit }) => {
    
    const { setListEdit } = useContext(TodoContext);
    const handleEditClick = () => {
        handleEdit();
        handleClose();
      };


    const handleEdit = () => {
        setCurrentListTitle(listName);
        handleClose();
      };
    
    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default SmallMenu
