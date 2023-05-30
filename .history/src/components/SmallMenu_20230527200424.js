import React, { useState, useContext } from 'react'
import { Menu, MenuItem } from '@mui/material'
import { ListEdit } from '../'
import { TodoContext } from '../../context/TodoContext'

const SmallMenu = ({ anchorEl, handleClose }) => {
    
    const menu = Menu



    const handleEdit = () => {
        setListEdit(true);
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
