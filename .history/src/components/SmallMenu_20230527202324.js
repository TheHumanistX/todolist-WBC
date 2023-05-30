import React, { useState, useContext } from 'react'
import { Menu, MenuItem } from '@mui/material'

import { TodoContext } from '../context/TodoContext'

const SmallMenu = ({ taskList, anchorEl, handleClose }) => {
    
    const { setListEdit } = useContext(TodoContext);



    const handleEdit = () => {
        setListEdit(taskList);
    }
    
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
