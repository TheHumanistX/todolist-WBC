import React, { useState, useContext } from 'react'
import { Menu, MenuItem } from '@mui/material'

import { TodoContext } from '../context/TodoContext'

const SmallMenu = ({ anchorEl, handleClose, setCurrentListTitle, listName }) => {
    
    const { setListEdit } = useContext(TodoContext);



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
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default SmallMenu
