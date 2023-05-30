import React, { useState, useContext } from 'react'
import { Menu, MenuItem } from '@mui/material'

import { TodoContext } from '../context/TodoContext'

const SmallMenu = ({ menuAnchorElement , handleClose, handleEdit, handleDelete }) => {
    
    const { setListEdit } = useContext(TodoContext);
    const handleEditClick = () => {
        handleEdit();
        handleClose();
      };

      const handleDeleteClick = () => {
        handleDelete();
        handleClose();
      };

    return (
        <div>
            <Menu
                menuAnchorElement ={menuAnchorElement }
                open={Boolean(menuAnchorElement )}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default SmallMenu
